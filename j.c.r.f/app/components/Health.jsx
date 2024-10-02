//Health.jsx
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { personalStyles } from './PersonalStyles';

const Health = ({ isOpen, onClose, onPrevious, initialData, onReview }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: initialData
  });

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log(data);
    onReview(data);
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

  const hasPhysicalDefect = watch('hasPhysicalDefect');

  return (
    <div className={personalStyles.modalOverlay}>
      <div className={personalStyles.modalContent}>
        <button onClick={onClose} className={personalStyles.closeButton}>
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        <h2 className={personalStyles.mainHeading}>STUDENT&#39;S REGISTRATION FORM 2024/25 SESSION</h2>
        <h3 className={personalStyles.subHeading}>Health Section</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className={personalStyles.form}>
          <RadioGroup
            name="hasPhysicalDefect"
            label="Have you had any physical defect?"
            options={['Yes', 'No']}
            required
            number="49"
          />
          
          {hasPhysicalDefect === 'Yes' && (
            <InputField name="physicalDefectType" label="If yes, which kind?" number="50" />
          )}
          
          <RadioGroup
            name="oftenIll"
            label="Are you often ill?"
            options={['Yes', 'No']}
            required
            number="51"
          />
          
          <RadioGroup
            name="specialDietOrTreatment"
            label="Are you on special diet or treatment?"
            options={['Yes', 'No']}
            required
            number="52"
          />

          <div className={personalStyles.navigation}>
          <button type="button" onClick={onPrevious} className={personalStyles.navButton}>Previous</button>
          <button type="submit" className={personalStyles.navButton}>Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Health;