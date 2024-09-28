//Personal.jsx
//Personal.jsx

import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { personalStyles } from './PersonalStyles';

const Personal = ({ isOpen, onClose, onNext, onPrevious  }) => {
  const { control, handleSubmit } = useForm();

  if (!isOpen) return null;

const onSubmit = (data) => {
    console.log(data);
  };

  const InputField = ({ name, label, type = 'text', required = false }) => (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <div className={personalStyles.inputGroup}>
          <input
            {...field}
            type={type}
            id={name}
            className={personalStyles.input}
            placeholder=" "
          />
          <label
            htmlFor={name}
            className={`${personalStyles.label} ${field.value ? personalStyles.labelFocused : ''}`}
          >
            {label}
          </label>
        </div>
      )}
    />
  );

  const RadioGroup = ({ name, label, options }) => (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <div className={personalStyles.radioGroupContainer}>
          <label className={personalStyles.radioGroupLabel}>{label}</label>
          <div className={personalStyles.radioGroup}>
            {options.map((option, index) => (
              <label key={index} className={personalStyles.radioLabel}>
                <input
                  type="radio"
                  {...field}
                  value={option}
                  checked={field.value === option}
                  className={personalStyles.radioInput}
                />
                <span className={personalStyles.radioText}>{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    />
  );

  return (
    <div className={personalStyles.modalOverlay}>
      <div className={personalStyles.modalContent}>
        <button onClick={onClose} className={personalStyles.closeButton}>
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        <h2 className={personalStyles.mainHeading}>STUDENT'S REGISTRATION FORM 2024/25 SESSION</h2>
        <h3 className={personalStyles.subHeading}>Personal Section</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className={personalStyles.form}>
          <InputField name="firstName" label="1. First Name" required />
          <InputField name="surname" label="2. Surname" required />
          <InputField name="middleName" label="3. Middle Name" required />

          <Controller
            name="passport"
            control={control}
            render={({ field }) => (
              <div className={personalStyles.inputGroup}>
                <label className={personalStyles.fileInputLabel}>4. Upload your passport</label>
                <div className={personalStyles.dropzone} onClick={() => document.getElementById('passportUpload').click()}>
                  <p className="text-sm sm:text-base">{field.value || 'Drag & Drop or Click to Upload'}</p>
                  <input
                    id="passportUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0]?.name)}
                    className={personalStyles.fileInput}
                  />
                </div>
              </div>
            )}
          />

          <RadioGroup
            name="sex"
            label="5. Sex"
            options={['Male', 'Female']}
          />

          <InputField name="dob" label="6. Date of Birth" type="date" required />
          <InputField name="homeTown" label="7. Home Town" required />
          <InputField name="stateOfOrigin" label="8. State of Origin" required />
          <InputField name="nationality" label="9. Nationality" required />
          <InputField name="phoneNo" label="10. Phone No" type="tel" required />
          <InputField name="whatsappNo" label="11. WhatsApp Phone No" type="tel" required />
          <InputField name="email" label="12. Email Address" type="email" required />

          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className={personalStyles.inputGroup}>
                <textarea
                  {...field}
                  id="address"
                  className={personalStyles.textarea}
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="address"
                  className={`${personalStyles.label} ${field.value ? personalStyles.labelFocused : ''}`}
                >
                  13. Present Home Address
                </label>
              </div>
            )}
          />

          <InputField name="hobbies" label="14. Hobbies" />

          <RadioGroup
            name="level"
            label="15. Level"
            options={['100', '200', '300', '400', '500']}
          />

          <InputField name="hostel" label="16. Hostel, Block & Room No" />
          <InputField name="matricNo" label="17. Matric No or Registration Number" />

          <RadioGroup
            name="college"
            label="18. College"
            options={[
              'Agriculture and Natural Science',
              'Health Science',
              'Law',
              'Management Science',
              'Humanities and Social Science',
              'Environmental Science'
            ]}
          />

          <InputField name="department" label="19. Department" required />

          <div className={personalStyles.navigation}>
              <button type="button" onClick={onPrevious} className={personalStyles.navButton}>Previous</button>
              <button type="button" onClick={onNext} className={personalStyles.navButton}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Personal;