// scripts/remove-duplicate-registrations.js
//
// Students could submit the form several times (lost slip, retry on a slow network, double tap),
// creating duplicate registrations. The server now updates the existing registration instead;
// this removes the duplicates already saved.
//
// Same student = same session + first name + surname + date of birth (case and outer spaces ignored).
// For each student it keeps one registration, in this order of preference:
//   1. one an admin has edited (since the edit feature shipped)
//   2. the newest one with a passport photo
//   3. the newest one
//
// Usage (from jabu-chaplaincy-server/):
//   node scripts/remove-duplicate-registrations.js           # dry run: report only, deletes nothing
//   node scripts/remove-duplicate-registrations.js --apply   # back up the duplicates, then delete them
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const ADMIN_EDITS_SINCE = new Date('2026-10-27T00:00:00Z');

// Must match getIdentityKey in server.js
const getIdentityKey = ({ firstName, surname, dob }) =>
  [firstName, surname, dob].map((value) => String(value ?? '').trim().toLowerCase()).join('|');

const hasPassport = (doc) => /^https?:\/\//.test(doc.passportUrl || '');

// Best registration to keep comes first
function rankForKeeping(a, b) {
  const editedA = a.updatedAt >= ADMIN_EDITS_SINCE && a.updatedAt - a.createdAt > 60 * 1000;
  const editedB = b.updatedAt >= ADMIN_EDITS_SINCE && b.updatedAt - b.createdAt > 60 * 1000;
  if (editedA !== editedB) return editedA ? -1 : 1;
  if (hasPassport(a) !== hasPassport(b)) return hasPassport(a) ? -1 : 1;
  return b.createdAt - a.createdAt;
}

function findDuplicates(docs) {
  const groups = new Map();
  docs.forEach((doc) => {
    const key = `${doc.session}|${getIdentityKey(doc)}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(doc);
  });
  return [...groups.values()]
    .filter((group) => group.length > 1)
    .map((group) => {
      const [keep, ...remove] = [...group].sort(rankForKeeping);
      return { keep, remove };
    });
}

async function main() {
  const apply = process.argv.includes('--apply');
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set in jabu-chaplaincy-server/.env');

  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'JABU_CHAPEL' });
  const collection = mongoose.connection.db.collection('registration');

  const docs = await collection
    .find({}, { projection: { session: 1, firstName: 1, surname: 1, dob: 1, passportUrl: 1, createdAt: 1, updatedAt: 1 } })
    .toArray();
  const duplicates = findDuplicates(docs);
  const toRemove = duplicates.flatMap((group) => group.remove);

  const bySession = {};
  duplicates.forEach(({ keep, remove }) => {
    bySession[keep.session] = bySession[keep.session] || { students: 0, duplicatesToDelete: 0 };
    bySession[keep.session].students++;
    bySession[keep.session].duplicatesToDelete += remove.length;
  });

  console.log(`Registrations scanned:              ${docs.length}`);
  console.log(`Students with more than one record: ${duplicates.length}`);
  console.log(`Duplicate records to delete:        ${toRemove.length}`);
  console.log(`Registrations left afterwards:      ${docs.length - toRemove.length}`);
  console.log('\nBy session:', bySession);

  const describe = (doc) =>
    `${doc._id}  created ${doc.createdAt.toISOString().slice(0, 16)}  photo: ${hasPassport(doc) ? 'yes' : 'NO'}`;
  console.log('\nExamples (largest groups first):');
  [...duplicates]
    .sort((a, b) => b.remove.length - a.remove.length)
    .slice(0, 5)
    .forEach(({ keep, remove }) => {
      console.log(`\n  ${keep.firstName} ${keep.surname} (${keep.dob}), ${keep.session}`);
      console.log(`    KEEP    ${describe(keep)}`);
      remove.forEach((doc) => console.log(`    DELETE  ${describe(doc)}`));
    });

  if (!apply) {
    console.log('\nDry run only, nothing was deleted. Run again with --apply to delete the duplicates.');
  } else if (toRemove.length) {
    const ids = toRemove.map((doc) => doc._id);
    const fullDocs = await collection.find({ _id: { $in: ids } }).toArray();

    const backupDir = path.join(__dirname, 'backups');
    fs.mkdirSync(backupDir, { recursive: true });
    const backupFile = path.join(backupDir, `duplicates-deleted-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(fullDocs, null, 2));
    console.log(`\nBacked up ${fullDocs.length} duplicate records to ${backupFile}`);

    const result = await collection.deleteMany({ _id: { $in: ids } });
    console.log(`Deleted ${result.deletedCount} duplicate records.`);
  } else {
    console.log('\nNo duplicates found.');
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

module.exports = { findDuplicates, getIdentityKey };
