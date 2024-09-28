//Personal.jsx
import { X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { personalStyles } from './PersonalStyles';

const Personal = ({ isOpen, onClose, onNext, onPrevious, initialData }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: initialData
  });
  const [passportPreview, setPassportPreview] = useState(null);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onNext(data);
  };

  const InputField = ({ name, label, type = 'text', required = false, number }) => (
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
            {number}. {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
      )}
    />
  );

  const DateInputField = ({ name, label, required = false, number }) => (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <div className={personalStyles.dateInputGroup}>
          <input
            {...field}
            type="date"
            id={name}
            className={personalStyles.dateInput}
          />
          <label
            htmlFor={name}
            className={personalStyles.dateLabel}
          >
            {number}. {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
      )}
    />
  );

  const RadioGroup = ({ name, label, options, required = false, number }) => (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <div className={personalStyles.radioGroupContainer}>
          <label className={personalStyles.radioGroupLabel}>
            {number}. {label} {required && <span className="text-red-500">*</span>}
          </label>
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
        <h2 className={personalStyles.mainHeading}>STUDENT&#39;S REGISTRATION FORM 2024/25 SESSION</h2>
        <h3 className={personalStyles.subHeading}>Personal Section</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className={personalStyles.form}>
          <InputField name="firstName" label="First Name" required number="1" />
          <InputField name="surname" label="Surname" required number="2" />
          <InputField name="middleName" label="Middle Name" required number="3" />

          <Controller
            name="passport"
            control={control}
            render={({ field }) => (
              <div className={personalStyles.inputGroup}>
                <label className={personalStyles.fileInputLabel}>
                  4. Upload your passport <span className="text-red-500">*</span>
                </label>
                <div 
                  className={personalStyles.passportContainer}
                  onClick={() => document.getElementById('passportUpload').click()}
                >
                  {passportPreview ? (
                    <img 
                      src={passportPreview} 
                      alt="Passport preview" 
                      className={personalStyles.passportPreview}
                    />
                  ) : (
                    <div className={personalStyles.dropzone}>
                      <p className="text-sm sm:text-base">Drag & Drop or Click to Upload</p>
                    </div>
                  )}
                  <input
                    id="passportUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        field.onChange(file);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPassportPreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={personalStyles.fileInput}
                  />
                </div>
              </div>
            )}
          />

          <RadioGroup
            name="sex"
            label="Sex"
            options={['Male', 'Female']}
            required
            number="5"
          />

          <DateInputField name="dob" label="Date of Birth" required number="6" />
          <InputField name="homeTown" label="Home Town" required number="7" />
          <InputField name="stateOfOrigin" label="State of Origin" required number="8" />
          <InputField name="nationality" label="Nationality" required number="9" />
          <InputField name="phoneNo" label="Phone No" type="tel" required number="10" />
          <InputField name="whatsappNo" label="WhatsApp Phone No" type="tel" required number="11" />
          <InputField name="email" label="Email Address" type="email" required number="12" />

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
                  13. Present Home Address <span className="text-red-500">*</span>
                </label>
              </div>
            )}
          />

          <InputField name="hobbies" label="Hobbies" number="14" />

          <RadioGroup
            name="level"
            label="Level"
            options={['100', '200', '300', '400', '500']}
            required
            number="15"
          />

          <InputField name="hostel" label="Hostel, Block & Room No" number="16" />
          <InputField name="matricNo" label="Matric No or Registration Number" number="17" />

          <RadioGroup
            name="college"
            label="College"
            options={[
              'Agriculture and Natural Science',
              'Health Science',
              'Law',
              'Management Science',
              'Humanities and Social Science',
              'Environmental Science'
            ]}
            required
            number="18"
          />

          <InputField name="department" label="Department" required number="19" />

          <div className={personalStyles.navigation}>
          <button type="button" onClick={onPrevious} className={personalStyles.navButton}>Previous</button>
          <button type="submit" className={personalStyles.navButton}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Personal;