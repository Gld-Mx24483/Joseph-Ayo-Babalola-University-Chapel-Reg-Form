//Review.jsx
import { X } from 'lucide-react';
import { personalStyles } from './PersonalStyles';

const Review = ({ isOpen, onClose, formData, onEdit, onSubmit }) => {
  if (!isOpen) return null;

  const sections = [
    { title: 'Personal Information', fields: ['firstName', 'surname', 'middleName', 'sex', 'dob', 'homeTown', 'stateOfOrigin', 'nationality', 'phoneNo', 'whatsappNo', 'email', 'address', 'hobbies', 'level', 'hostel', 'matricNo', 'college', 'department'] },
    { title: 'Spirituality', fields: ['attendChurch', 'churchName', 'churchStartDate', 'newBirth', 'newBirthDate', 'salvationExperience', 'waterBaptism', 'waterBaptismDate', 'communicant', 'notCommunicantReason', 'holySpirit', 'notHolySpiritReason', 'spiritualGifts', 'churchDiscipline', 'disciplineReason', 'leadershipTraining', 'leadershipTrainingDetails', 'pastorName', 'pastorPhone', 'lifeVision', 'obeyInstructions', 'contributeToChapel'] },
    { title: 'Family', fields: ['sponsorName', 'familyType', 'sponsorOccupation', 'sponsorPhone', 'parentsLivingTogether', 'parentsNotLivingTogetherReason', 'bothParentsAlive', 'whichParentAlive'] },
    { title: 'Health', fields: ['hasPhysicalDefect', 'physicalDefectType', 'oftenIll', 'specialDietOrTreatment'] },
  ];

  const formatLabel = (field) => {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className={personalStyles.modalOverlay}>
      <div className={`${personalStyles.modalContent} max-w-4xl`}>
        <button onClick={onClose} className={personalStyles.closeButton}>
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        <div className="flex justify-between items-start mb-6">
          <h2 className={personalStyles.mainHeading}>Review Your Answers</h2>
          {formData.passport && (
            <img 
              src={URL.createObjectURL(formData.passport)} 
              alt="Passport" 
              className="w-32 h-40 object-cover rounded-md shadow-md"
            />
          )}
        </div>
        
        <div className="mt-6 space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">{section.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field) => (
                  <div key={field} className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">{formatLabel(field)}</span>
                    <span className="mt-1 text-lg font-semibold text-gray-800 break-words">
                      {formData[field] || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-between">
          <button onClick={onEdit} className={`${personalStyles.navButton} bg-gray-500 hover:bg-gray-600`}>
            Edit
          </button>
          <button onClick={onSubmit} className={`${personalStyles.navButton} bg-green-500 hover:bg-green-600`}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;