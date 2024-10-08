// Spirituality.jsx
import { X } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { personalStyles } from './PersonalStyles';

const Spirituality = ({ isOpen, onClose, onNext, onPrevious, initialData }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: initialData
  });
  const watchAttendChurch = useWatch({ control, name: 'attendChurch' });
  const watchNewBirth = useWatch({ control, name: 'newBirth' });
  const watchWaterBaptism = useWatch({ control, name: 'waterBaptism' });
  const watchHolySpirit = useWatch({ control, name: 'holySpirit' });
  const watchChurchDiscipline = useWatch({ control, name: 'churchDiscipline' });
  const watchLeadershipTraining = useWatch({ control, name: 'leadershipTraining' });
  const watchCommunicant = useWatch({ control, name: 'communicant' });

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

  const TextArea = ({ name, label, required = false, number }) => (
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
            {number}. {label} {required && <span className="text-red-500">*</span>}
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
        <h2 className={personalStyles.mainHeading}>STUDENT&#39;S REGISTRATION FORM 2024/25 SESSION</h2>
        <h3 className={personalStyles.subHeading}>Spirituality Section</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className={personalStyles.form}>
          <RadioGroup
            name="attendChurch"
            label="Do you currently attend any church?"
            options={['Yes', 'No']}
            required
            number="20"
          />
          <InputField
            name="churchName"
            label="If yes, Name of church"
            required={watchAttendChurch === 'Yes'}
            number="21"
          />
          <DateInputField
            name="churchStartDate"
            label="When did you start attending the church?"
            required={watchAttendChurch === 'Yes'}
            number="22"
          />
          
          <RadioGroup
            name="newBirth"
            label="Have you had the New Birth?"
            options={['Yes', 'No']}
            required
            number="23"
          />
          <InputField
            name="newBirthDate"
            label="If yes, when"
            required={watchNewBirth === 'Yes'}
            number="24"
          />
          <TextArea
            name="salvationExperience"
            label="Describe your salvation experience"
            required={watchNewBirth === 'Yes'}
            number="25"
          />
          
          <RadioGroup
            name="waterBaptism"
            label="Have you been baptized in water?"
            options={['Yes', 'No']}
            required
            number="26"
          />
          <InputField
            name="waterBaptismDate"
            label="If yes, when?"
            required={watchWaterBaptism === 'Yes'}
            number="27"
          />
          
          <RadioGroup
            name="communicant"
            label="Are you a communicant?"
            options={['Yes', 'No']}
            required
            number="28"
          />
          <InputField 
            name="notCommunicantReason" 
            label="If No, why?" 
            required={watchCommunicant === 'No'}
            number="29"   
          />
          
          <RadioGroup
            name="holySpirit"
            label="Have you received the baptism of the Holy spirit?"
            options={['Yes', 'No']}
            required
            number="30"
          />
          <InputField
            name="notHolySpiritReason"
            label="If No, why?"
            required={watchHolySpirit === 'No'}
            number="31"
          />
          
          <InputField name="spiritualGifts" label="What are your spiritual gift(s)?" number="32" />
          
          <RadioGroup
            name="churchDiscipline"
            label="Have you been disciplined by the Church before?"
            options={['Yes', 'No']}
            required
            number="33"
          />
          <InputField
            name="disciplineReason"
            label="If yes, state the reason"
            required={watchChurchDiscipline === 'Yes'}
            number="34"
          />
          
          <RadioGroup
            name="leadershipTraining"
            label="Have you attended any church leadership training before?"
            options={['Yes', 'No']}
            required
            number="35"
          />
          <InputField
            name="leadershipTrainingDetails"
            label="If yes, where and when?"
            required={watchLeadershipTraining === 'Yes'}
            number="36"
          />
          
          <InputField name="pastorName" label="Name of your Pastor or spiritual leader" required number="37" />
          <InputField name="pastorPhone" label="Phone No. of your Pastor or spiritual leader" type="tel" required number="38" />
          
          <TextArea name="lifeVision" label="Describe your vision or purpose in life" required number="39" />
          
          <RadioGroup
            name="obeyInstructions"
            label="Are you going to willingly obey instruction, follow the standard and dress codes of the chapel while in this university?"
            options={['Yes', 'No']}
            required
            number="40"
          />
          
          <RadioGroup
            name="contributeToChapel"
            label="Will you be willing to contribute your time, talents and treasure for the progress of the Chapel as a student?"
            options={['Yes', 'No']}
            required
            number="41"
          />

          <div className={personalStyles.navigation}>
            <button type="button" onClick={onPrevious} className={personalStyles.navButton}>Previous</button>
            <button type="submit" className={personalStyles.navButton}>Next</button>
          </div>
          </form>
      </div>
    </div>
  );
};

export default Spirituality;
