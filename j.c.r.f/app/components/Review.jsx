// //Review.jsx
// import emailjs from '@emailjs/browser';
// import axios from 'axios';
// import { AlertCircle, CheckCircle, X } from 'lucide-react';
// import { useState } from 'react';
// import API_URL from './api-config';
// import { personalStyles } from './PersonalStyles';

// const CLOUDINARY_UPLOAD_PRESET = 'jabu_chapel_preset';
// const CLOUDINARY_CLOUD_NAME = 'dui4el4tx';

// const EMAILJS_SERVICE_ID = 'service_5fbh9el';
// const EMAILJS_TEMPLATE_ID = 'template_is111np';
// const EMAILJS_PUBLIC_KEY = 'DefAZ0rhnYty_p2_5';

// const SuccessDialog = ({ onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
//       <div className="flex items-center mb-4">
//         <CheckCircle className="text-green-500 mr-2" size={28} />
//         <h3 className="text-2xl font-extrabold text-gray-900">Success!</h3>
//       </div>
//       <p className="text-gray-700 text-lg mb-6 font-semibold">
//         Your form has been successfully submitted.
//       </p>
//       <button
//         onClick={onClose}
//         className="w-full bg-green-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-green-700 transition duration-200"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// );

// const ErrorDialog = ({ onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
//       <div className="flex items-center mb-4">
//         <AlertCircle className="text-red-500 mr-2" size={28} />
//         <h3 className="text-2xl font-extrabold text-gray-900">Error</h3>
//       </div>
//       <p className="text-gray-700 text-lg mb-6 font-semibold">
//         An error occurred while submitting your form. Please try again.
//       </p>
//       <button
//         onClick={onClose}
//         className="w-full bg-red-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-red-700 transition duration-200"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// );

// const LoadingSpinner = () => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="relative">
//       <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
//       <div className="w-20 h-20 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
//     </div>
//   </div>
// );

// const Review = ({ isOpen, onClose, formData, onEdit, onSubmit }) => {
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [showErrorDialog, setShowErrorDialog] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   if (!isOpen) return null;

//   const sections = [
//     { title: 'Personal Information', fields: ['firstName', 'surname', 'middleName', 'sex', 'dob', 'homeTown', 'stateOfOrigin', 'nationality', 'phoneNo', 'whatsappNo', 'email', 'address', 'hobbies', 'level', 'hostel', 'matricNo', 'college', 'department'] },
//     { title: 'Spirituality', fields: ['attendChurch', 'churchName', 'churchStartDate', 'newBirth', 'newBirthDate', 'salvationExperience', 'waterBaptism', 'waterBaptismDate', 'communicant', 'notCommunicantReason', 'holySpirit', 'notHolySpiritReason', 'spiritualGifts', 'churchDiscipline', 'disciplineReason', 'leadershipTraining', 'leadershipTrainingDetails', 'pastorName', 'pastorPhone', 'lifeVision', 'obeyInstructions', 'contributeToChapel'] },
//     { title: 'Family', fields: ['sponsorName', 'familyType', 'sponsorOccupation', 'sponsorPhone', 'parentsLivingTogether', 'parentsNotLivingTogetherReason', 'bothParentsAlive', 'whichParentAlive'] },
//     { title: 'Health', fields: ['hasPhysicalDefect', 'physicalDefectType', 'oftenIll', 'specialDietOrTreatment'] },
//   ];

//   const formatLabel = (field) => {
//     return field
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (str) => str.toUpperCase());
//   };

//   const sendEmail = async (email) => {
//     try {
//       await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
//         to_email: email,
//         // Add any other template variables here
//       }, EMAILJS_PUBLIC_KEY);
//       console.log('Email sent successfully');
//     } catch (error) {
//       console.error('Error sending email:', error);
//       // Note: We're not showing an error dialog for email failure
//       // as the form submission was still successful
//     }
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       let passportUrl = '';
      
//       if (formData.passport) {
//         const cloudinaryData = new FormData();
//         cloudinaryData.append('file', formData.passport);
//         cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
//         const cloudinaryResponse = await axios.post(
//           `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//           cloudinaryData
//         );
      
//         passportUrl = cloudinaryResponse.data.secure_url;
//         console.log('Cloudinary upload successful:', passportUrl);
//       }

//       const formDataToSend = { ...formData, passportUrl };
//       delete formDataToSend.passport;

//       console.log('Data being sent to server:', formDataToSend);

//       const response = await axios.post(`${API_URL}/api/submit-form`, formDataToSend);

//       console.log('Form submitted successfully:', response.data);
//       await sendEmail(formData.email);
//       setIsLoading(false);
//       setShowSuccessDialog(true);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setIsLoading(false);
//       setShowErrorDialog(true);
//     }
//   };

//   return (
//     <div className={personalStyles.modalOverlay}>
//       <div className={`${personalStyles.modalContent} max-w-4xl`}>
//         <button onClick={onClose} className={personalStyles.closeButton}>
//           <X size={20} className="sm:w-6 sm:h-6" />
//         </button>
//         <div className="flex justify-between items-start mb-6">
//           <h2 className={personalStyles.mainHeading}>Review Your Response</h2>
//           <div className="mt-4 mr-4">
//             {formData.passport && (
//               <img 
//                 src={URL.createObjectURL(formData.passport)} 
//                 alt="Passport" 
//                 className="w-32 h-40 object-cover rounded-md shadow-md"
//               />
//             )}
//           </div>
//         </div>
        
//         <div className="mt-6 space-y-8">
//           {sections.map((section, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">{section.title}</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {section.fields.map((field) => (
//                   <div key={field} className="flex flex-col">
//                     <span className="text-sm font-medium text-gray-500">{formatLabel(field)}</span>
//                     <span className="mt-1 text-lg font-semibold text-gray-800 break-words">
//                       {formData[field] || 'N/A'}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="mt-8 flex justify-between">
//           <button onClick={onEdit} className={`${personalStyles.navButton} bg-gray-500 hover:bg-gray-600`}>
//             Edit
//           </button>
//           <button 
//             onClick={handleSubmit} 
//             className={`${personalStyles.navButton} bg-green-500 hover:bg-green-600 relative`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className="flex items-center">
//                 <span className="mr-2">Submitting</span>
//                 <span className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></span>
//               </span>
//             ) : (
//               'Submit'
//             )}
//           </button>
//         </div>
//       </div>

//       {isLoading && <LoadingSpinner />}
//       {showSuccessDialog && <SuccessDialog onClose={() => { setShowSuccessDialog(false); onClose(); }} />}
//       {showErrorDialog && <ErrorDialog onClose={() => setShowErrorDialog(false)} />}
//     </div>
//   );
// };

// export default Review;

// Review.jsx
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';
import API_URL from './api-config';
import { personalStyles } from './PersonalStyles';

const CLOUDINARY_UPLOAD_PRESET = 'jabu_chapel_preset';
const CLOUDINARY_CLOUD_NAME = 'dui4el4tx';

const EMAILJS_SERVICE_ID = 'service_5fbh9el';
const EMAILJS_TEMPLATE_ID = 'template_is111np';
const EMAILJS_PUBLIC_KEY = 'DefAZ0rhnYty_p2_5';

const SuccessDialog = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
      <div className="flex items-center mb-4">
        <CheckCircle className="text-green-500 mr-2" size={28} />
        <h3 className="text-2xl font-extrabold text-gray-900">Success!</h3>
      </div>
      <p className="text-gray-700 text-lg mb-6 font-semibold">
        Your form has been successfully submitted.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-green-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-green-700 transition duration-200"
      >
        Close
      </button>
    </div>
  </div>
);

const ErrorDialog = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
      <div className="flex items-center mb-4">
        <AlertCircle className="text-red-500 mr-2" size={28} />
        <h3 className="text-2xl font-extrabold text-gray-900">Error</h3>
      </div>
      <p className="text-gray-700 text-lg mb-6 font-semibold">
        An error occurred while submitting your form. Please try again.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-red-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-red-700 transition duration-200"
      >
        Close
      </button>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
      <div className="w-20 h-20 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
    </div>
  </div>
);

const Review = ({ isOpen, onClose, formData, onEdit, onSubmit }) => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const sendEmail = async (email, firstName) => {
    console.log('Sending email to:', email);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_name: firstName,
        from_name: 'Chaplaincy',
        email: email,
        message: 'Your registration was successful. Thank you for submitting your form.',
        reply_to: 'noreply@example.com',
      }, EMAILJS_PUBLIC_KEY);
      console.log('Email sent successfully to:', email);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
  

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let passportUrl = '';
      
      if (formData.passport) {
        const cloudinaryData = new FormData();
        cloudinaryData.append('file', formData.passport);
        cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          cloudinaryData
        );
      
        passportUrl = cloudinaryResponse.data.secure_url;
        console.log('Cloudinary upload successful:', passportUrl);
      }
  
      const formDataToSend = { ...formData, passportUrl };
      delete formDataToSend.passport;
  
      console.log('Data being sent to server:', formDataToSend);
  
      const response = await axios.post(`${API_URL}/api/submit-form`, formDataToSend);
  
      console.log('Form submitted successfully:', response.data);
      
      const userEmail = formData.email;
      if (!userEmail) {
        throw new Error('User email is missing');
      }
      console.log('Preparing to send email to:', userEmail);
      await sendEmail(userEmail);
  
      setIsLoading(false);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error submitting form or sending email:', error);
      setIsLoading(false);
      setShowErrorDialog(true);
    }
  };

  return (
    <div className={personalStyles.modalOverlay}>
      <div className={`${personalStyles.modalContent} max-w-4xl`}>
        <button onClick={onClose} className={personalStyles.closeButton}>
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        <div className="flex justify-between items-start mb-6">
          <h2 className={personalStyles.mainHeading}>Review Your Response</h2>
          <div className="mt-4 mr-4">
            {formData.passport && (
              <img 
                src={URL.createObjectURL(formData.passport)} 
                alt="Passport" 
                className="w-32 h-40 object-cover rounded-md shadow-md"
              />
            )}
          </div>
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
          <button 
            onClick={handleSubmit} 
            className={`${personalStyles.navButton} bg-green-500 hover:bg-green-600 relative`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="mr-2">Submitting</span>
                <span className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></span>
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {showSuccessDialog && <SuccessDialog onClose={() => { setShowSuccessDialog(false); onClose(); }} />}
      {showErrorDialog && <ErrorDialog onClose={() => setShowErrorDialog(false)} />}
    </div>
  );
};

export default Review;