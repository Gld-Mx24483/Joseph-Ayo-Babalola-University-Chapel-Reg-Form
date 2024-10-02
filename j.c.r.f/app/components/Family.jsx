//Family.jsx
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { personalStyles } from './PersonalStyles';

const Family = ({ isOpen, onClose, onNext, onPrevious, initialData }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: initialData
  });

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

  const parentsLivingTogether = watch('parentsLivingTogether');
  const bothParentsAlive = watch('bothParentsAlive');

  return (
    <div className={personalStyles.modalOverlay}>
      <div className={personalStyles.modalContent}>
        <button onClick={onClose} className={personalStyles.closeButton}>
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        <h2 className={personalStyles.mainHeading}>STUDENT&#39;S REGISTRATION FORM 2024/25 SESSION</h2>
        <h3 className={personalStyles.subHeading}>Family Section</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className={personalStyles.form}>
          <InputField name="sponsorName" label="Sponsor's Name" required number="42" />
          
          <RadioGroup
            name="familyType"
            label="Type of Family"
            options={['Nuclear', 'Polygamy']}
            required
            number="43"
          />
          
          <InputField name="sponsorOccupation" label="Sponsor's occupation" required number="44" />
          <InputField name="sponsorPhone" label="Sponsor's phone no." type="tel" required number="45" />
          
          <RadioGroup
            name="parentsLivingTogether"
            label="Are both parents living together?"
            options={['Yes', 'No']}
            required
            number="46"
          />
          
          {parentsLivingTogether === 'No' && (
            <InputField name="parentsNotLivingTogetherReason" label="If no, why?" number="47" />
          )}
          
          <RadioGroup
            name="bothParentsAlive"
            label="Both parents alive?"
            options={['Yes', 'No']}
            required
            number="48"
          />
          
          {bothParentsAlive === 'No' && (
            <RadioGroup
              name="whichParentAlive"
              label="If no, which of them is?"
              options={['Father', 'Mother']}
              required
              number="49"
            />
          )}

          <div className={personalStyles.navigation}>
            <button type="button" onClick={onPrevious} className={personalStyles.navButton}>Previous</button>
            <button type="submit" className={personalStyles.navButton}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Family;