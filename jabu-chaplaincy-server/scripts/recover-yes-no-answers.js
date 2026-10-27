// scripts/recover-yes-no-answers.js
//
// Until Oct 2026 the server saved every Yes/No answer as false (the form sent "Yes",
// the server only accepted "true"). Older registrations kept a full copy of the answers
// in their slip (htmlContent), so the real answers can be read back from there.
//
// Usage (from jabu-chaplaincy-server/):
//   node scripts/recover-yes-no-answers.js           # dry run: report only, writes nothing
//   node scripts/recover-yes-no-answers.js --apply   # back up current values, then fix them
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const BOOLEAN_FIELDS = ['attendChurch', 'newBirth', 'waterBaptism', 'communicant', 'holySpirit', 'churchDiscipline', 'leadershipTraining', 'obeyInstructions', 'contributeToChapel', 'parentsLivingTogether', 'bothParentsAlive', 'hasPhysicalDefect', 'oftenIll'];

// Records changed after the admin edit feature shipped may hold an admin's correction; leave them alone
const ADMIN_EDITS_SINCE = new Date('2026-10-27T00:00:00Z');

// Same label format the old slip template used: "attendChurch" -> "Attend Church"
const toLabel = (field) => field.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Returns { field: true/false } for every Yes/No answer found in an old-format slip
function parseAnswers(html) {
  const answers = {};
  if (!html || !html.includes('class="label"')) return answers;
  BOOLEAN_FIELDS.forEach((field) => {
    const pattern = new RegExp(
      `<div class="label">${escapeRegExp(toLabel(field))}:</div>\\s*<div class="value">\\s*(Yes|No)\\s*</div>`,
      'i'
    );
    const match = html.match(pattern);
    if (match) answers[field] = match[1].toLowerCase() === 'yes';
  });
  return answers;
}

async function main() {
  const apply = process.argv.includes('--apply');
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set in jabu-chaplaincy-server/.env');

  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'JABU_CHAPEL' });
  const collection = mongoose.connection.db.collection('registration');

  const projection = { htmlContent: 1, updatedAt: 1, session: 1, firstName: 1, surname: 1 };
  BOOLEAN_FIELDS.forEach((field) => { projection[field] = 1; });

  const stats = { scanned: 0, oldFormat: 0, toFix: 0, skippedAdminEdited: 0 };
  const fieldCounts = Object.fromEntries(BOOLEAN_FIELDS.map((field) => [field, 0]));
  const sessionCounts = {};
  const updates = [];
  const backup = [];

  for await (const doc of collection.find({}, { projection })) {
    stats.scanned++;
    const answers = parseAnswers(doc.htmlContent);
    if (Object.keys(answers).length === 0) continue;
    stats.oldFormat++;

    const changes = {};
    Object.entries(answers).forEach(([field, value]) => {
      if (doc[field] !== value) changes[field] = value;
    });
    if (Object.keys(changes).length === 0) continue;

    if (doc.updatedAt && doc.updatedAt >= ADMIN_EDITS_SINCE) {
      stats.skippedAdminEdited++;
      continue;
    }

    stats.toFix++;
    sessionCounts[doc.session] = (sessionCounts[doc.session] || 0) + 1;
    Object.keys(changes).forEach((field) => { fieldCounts[field]++; });
    updates.push({ updateOne: { filter: { _id: doc._id }, update: { $set: changes } } });
    backup.push({
      _id: String(doc._id),
      name: `${doc.firstName} ${doc.surname}`,
      before: Object.fromEntries(Object.keys(changes).map((field) => [field, doc[field]])),
      after: changes,
    });
  }

  console.log(`Records scanned:                 ${stats.scanned}`);
  console.log(`Records with a full-answer slip: ${stats.oldFormat}`);
  console.log(`Records to fix:                  ${stats.toFix}`);
  console.log(`Skipped (edited by admin since ${ADMIN_EDITS_SINCE.toISOString().slice(0, 10)}): ${stats.skippedAdminEdited}`);
  console.log('\nRecords to fix by session:', sessionCounts);
  console.log('\nAnswers to change per field:');
  BOOLEAN_FIELDS.forEach((field) => console.log(`  ${field.padEnd(22)} ${fieldCounts[field]}`));
  if (backup.length) {
    console.log('\nExample:', JSON.stringify(backup[0], null, 2));
  }

  if (!apply) {
    console.log('\nDry run only, nothing was written. Run again with --apply to fix these records.');
  } else if (updates.length) {
    const backupDir = path.join(__dirname, 'backups');
    fs.mkdirSync(backupDir, { recursive: true });
    const backupFile = path.join(backupDir, `yes-no-before-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
    console.log(`\nBacked up previous values to ${backupFile}`);

    const result = await collection.bulkWrite(updates, { ordered: false });
    console.log(`Updated ${result.modifiedCount} records.`);
  } else {
    console.log('\nNothing to fix.');
  }

  await mongoose.disconnect();
}

if (require.main === module) {
  main().catch(async (error) => {
    console.error(error);
    await mongoose.disconnect();
    process.exit(1);
  });
}

module.exports = { parseAnswers, toLabel };
