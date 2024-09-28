//Spirituality.jsx
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { personalStyles } from './PersonalStyles';

const Spirituality = ({  isOpen, onClose, onNext, onPrevious }) => {
  const { control, handleSubmit } = useForm();

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
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

  const RadioGroup = ({ name, label, options, required = false }) => (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
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

  const TextArea = ({ name, label, required = false }) => (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <div className={personalStyles.inputGroup}>
          <textarea
            {...field}
            id={name}
            className={personalStyles.textarea}
            placeholder=" "
          ></textarea>
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

  return (
    <div className={personalStyles.modalOverlay}>
      <div className={personalStyles.modalContent}>
        <button onClick={onClose} className={personalStyles.closeButton}>
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        <h2 className={personalStyles.mainHeading}>STUDENT'S REGISTRATION FORM 2024/25 SESSION</h2>
        <h3 className={personalStyles.subHeading}>Spirituality Section</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className={personalStyles.form}>
          <RadioGroup
            name="attendChurch"
            label="Do you currently attend any church?"
            options={['Yes', 'No']}
            required
          />
          <InputField name="churchName" label="If yes, Name of church" />
          <InputField name="churchStartDate" label="When did you start attending the church?" type="date" />
          
          <RadioGroup
            name="newBirth"
            label="Have you had the New Birth?"
            options={['Yes', 'No']}
            required
          />
          <InputField name="newBirthDate" label="If yes, when" />
          <TextArea name="salvationExperience" label="Describe your salvation experience." />
          
          <RadioGroup
            name="waterBaptism"
            label="Have you been baptized in water?"
            options={['Yes', 'No']}
            required
          />
          <InputField name="waterBaptismDate" label="If yes, when?" />
          
          <RadioGroup
            name="communicant"
            label="Are you a communicant?"
            options={['Yes', 'No']}
            required
          />
          <InputField name="notCommunicantReason" label="If Not, why?" />
          
          <RadioGroup
            name="holySpirit"
            label="Have you received the baptism of the Holy spirit?"
            options={['Yes', 'No']}
            required
          />
          <InputField name="notHolySpiritReason" label="If Not, why?" />
          
          <InputField name="spiritualGifts" label="What are your spiritual gift(s)?" />
          
          <RadioGroup
            name="churchDiscipline"
            label="Have you been disciplined by the Church before?"
            options={['Yes', 'No']}
            required
          />
          <InputField name="disciplineReason" label="If yes, state the reason." />
          
          <RadioGroup
            name="leadershipTraining"
            label="Have you attended any church leadership training before?"
            options={['Yes', 'No']}
            required
          />
          <InputField name="leadershipTrainingDetails" label="If yes, where and when?" />
          
          <InputField name="pastorName" label="Name of your Pastor or spiritual leader" required />
          <InputField name="pastorPhone" label="Phone No. of your Pastor or spiritual leader" type="tel" required />
          
          <TextArea name="lifeVision" label="Describe your vision or purpose in life" required />
          
          <RadioGroup
            name="obeyInstructions"
            label="Are you going to willingly obey instruction, follow the standard and dress codes of the chapel while in this university?"
            options={['Yes', 'No']}
            required
          />
          
          <RadioGroup
            name="contributeToChapel"
            label="Will you be willing to contribute your time, talents and treasure for the progress of the Chapel as a student?"
            options={['Yes', 'No']}
            required
          />

          <div className={personalStyles.navigation}>
          <button type="button" onClick={onPrevious} className={personalStyles.navButton}>Previous</button>
          <button type="button" onClick={onNext} className={personalStyles.navButton}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Spirituality;