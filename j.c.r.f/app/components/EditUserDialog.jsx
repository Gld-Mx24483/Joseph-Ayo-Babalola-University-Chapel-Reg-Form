// EditUserDialog.jsx
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import API_URL from './api-config';
import {
  collegesAndDepartments,
  FAMILY_TYPE_OPTIONS,
  LEVEL_OPTIONS,
  PARENT_OPTIONS,
  SEX_OPTIONS,
  YES_NO_OPTIONS,
} from './form-options';
import { SESSIONS } from './session-config';
import { generateSlipHTML } from './slip-template';

// Field types: text (default), textarea, date, email, tel, select (with options), yesno
export const EDIT_SECTIONS = [
  {
    title: 'Personal Information',
    fields: [
      { name: 'firstName', label: 'First Name' },
      { name: 'surname', label: 'Surname' },
      { name: 'middleName', label: 'Middle Name' },
      { name: 'sex', label: 'Sex', type: 'select', options: SEX_OPTIONS },
      { name: 'dob', label: 'Date of Birth', type: 'date' },
      { name: 'homeTown', label: 'Home Town' },
      { name: 'stateOfOrigin', label: 'State of Origin' },
      { name: 'nationality', label: 'Nationality' },
      { name: 'phoneNo', label: 'Phone Number', type: 'tel' },
      { name: 'whatsappNo', label: 'WhatsApp Number', type: 'tel' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'hobbies', label: 'Hobbies' },
      { name: 'level', label: 'Level', type: 'select', options: LEVEL_OPTIONS },
      { name: 'hostel', label: 'Hostel' },
      { name: 'matricNo', label: 'Matric No' },
      { name: 'college', label: 'College', type: 'select', options: Object.keys(collegesAndDepartments) },
      { name: 'department', label: 'Department', type: 'select' },
      { name: 'session', label: 'Session', type: 'select', options: SESSIONS },
    ],
  },
  {
    title: 'Spirituality',
    fields: [
      { name: 'attendChurch', label: 'Attends Church', type: 'yesno' },
      { name: 'churchName', label: 'Church Name' },
      { name: 'churchStartDate', label: 'Church Start Date', type: 'date' },
      { name: 'newBirth', label: 'New Birth', type: 'yesno' },
      { name: 'newBirthDate', label: 'New Birth Date', type: 'date' },
      { name: 'salvationExperience', label: 'Salvation Experience', type: 'textarea' },
      { name: 'waterBaptism', label: 'Water Baptism', type: 'yesno' },
      { name: 'waterBaptismDate', label: 'Water Baptism Date', type: 'date' },
      { name: 'communicant', label: 'Communicant', type: 'yesno' },
      { name: 'notCommunicantReason', label: 'Not Communicant Reason' },
      { name: 'holySpirit', label: 'Holy Spirit', type: 'yesno' },
      { name: 'notHolySpiritReason', label: 'Not Holy Spirit Reason' },
      { name: 'spiritualGifts', label: 'Spiritual Gifts' },
      { name: 'churchDiscipline', label: 'Church Discipline', type: 'yesno' },
      { name: 'disciplineReason', label: 'Discipline Reason' },
      { name: 'leadershipTraining', label: 'Leadership Training', type: 'yesno' },
      { name: 'leadershipTrainingDetails', label: 'Leadership Training Details' },
      { name: 'pastorName', label: 'Pastor Name' },
      { name: 'pastorPhone', label: 'Pastor Phone', type: 'tel' },
      { name: 'lifeVision', label: 'Life Vision', type: 'textarea' },
      { name: 'obeyInstructions', label: 'Obey Instructions', type: 'yesno' },
      { name: 'contributeToChapel', label: 'Contribute to Chapel', type: 'yesno' },
    ],
  },
  {
    title: 'Family',
    fields: [
      { name: 'sponsorName', label: 'Sponsor Name' },
      { name: 'familyType', label: 'Family Type', type: 'select', options: FAMILY_TYPE_OPTIONS },
      { name: 'sponsorOccupation', label: 'Sponsor Occupation' },
      { name: 'sponsorPhone', label: 'Sponsor Phone', type: 'tel' },
      { name: 'parentsLivingTogether', label: 'Parents Living Together', type: 'yesno' },
      { name: 'parentsNotLivingTogetherReason', label: 'Parents Not Living Together Reason' },
      { name: 'bothParentsAlive', label: 'Both Parents Alive', type: 'yesno' },
      { name: 'whichParentAlive', label: 'Which Parent Alive', type: 'select', options: PARENT_OPTIONS },
    ],
  },
  {
    title: 'Health',
    fields: [
      { name: 'hasPhysicalDefect', label: 'Has Physical Defect', type: 'yesno' },
      { name: 'physicalDefectType', label: 'Physical Defect Type' },
      { name: 'oftenIll', label: 'Often Ill', type: 'yesno' },
      { name: 'specialDietOrTreatment', label: 'Special Diet or Treatment', type: 'select', options: YES_NO_OPTIONS },
    ],
  },
];

const ALL_FIELDS = EDIT_SECTIONS.flatMap((section) => section.fields);
const SLIP_FIELDS = ['firstName', 'surname', 'department', 'level', 'phoneNo', 'sex', 'passportUrl'];

// Keeps a value that isn't in the option list (e.g. a typo from an old record) selectable
const withCurrentValue = (options, value) =>
  value && !options.includes(value) ? [value, ...options] : options;

const toFormValues = (user) =>
  ALL_FIELDS.reduce((values, field) => {
    const value = user[field.name];
    values[field.name] = value === null || value === undefined ? '' : String(value);
    return values;
  }, {});

const EditUserDialog = ({ user, onClose, onSaved }) => {
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const initialValues = useMemo(() => (user ? toFormValues(user) : {}), [user]);

  useEffect(() => {
    setValues(initialValues);
    setError('');
  }, [initialValues]);

  if (!user) return null;

  const handleChange = (name, value) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'college' && !(collegesAndDepartments[value] || []).includes(prev.department)) {
        next.department = '';
      }
      return next;
    });
  };

  const changedFields = ALL_FIELDS
    .map((field) => field.name)
    .filter((name) => values[name] !== initialValues[name]);

  const handleSave = async () => {
    const updates = changedFields.reduce((body, name) => ({ ...body, [name]: values[name] }), {});

    // Keep the student's downloadable slip in line with the corrected details
    if (changedFields.some((name) => SLIP_FIELDS.includes(name))) {
      updates.htmlContent = generateSlipHTML({ ...user, ...values }, user.passportUrl, user.createdAt);
    }

    setSaving(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to save changes');
      }
      onSaved(result.user);
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field) => {
    const value = values[field.name] ?? '';
    const common = {
      label: field.label,
      value,
      onChange: (e) => handleChange(field.name, e.target.value),
      size: 'small',
      fullWidth: true,
    };

    if (field.type === 'yesno' || field.type === 'select') {
      const options =
        field.type === 'yesno'
          ? [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]
          : withCurrentValue(
              field.name === 'department' ? collegesAndDepartments[values.college] || [] : field.options,
              value
            ).map((option) => ({ value: option, label: option }));
      return (
        <TextField key={field.name} {...common} select>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
      );
    }

    if (field.type === 'date') {
      // Old records may hold free text here; only use a date picker for real dates
      const isDate = value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value);
      return <TextField key={field.name} {...common} type={isDate ? 'date' : 'text'} InputLabelProps={{ shrink: true }} />;
    }

    if (field.type === 'textarea') {
      return <TextField key={field.name} {...common} multiline minRows={2} />;
    }

    return <TextField key={field.name} {...common} type={field.type || 'text'} />;
  };

  return (
    <Dialog open onClose={saving ? undefined : onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit Registration: {user.firstName} {user.surname}
      </DialogTitle>
      <DialogContent dividers>
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        {EDIT_SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map(renderField)}
            </div>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <span className="mr-auto ml-4 text-sm text-gray-500">
          {changedFields.length === 0 ? 'No changes' : `${changedFields.length} field(s) changed`}
        </span>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving || changedFields.length === 0}
          startIcon={saving ? <CircularProgress size={16} /> : null}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
