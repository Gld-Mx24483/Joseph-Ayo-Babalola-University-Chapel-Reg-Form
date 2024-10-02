// // //Review.jsx
// // import emailjs from '@emailjs/browser';
// // import axios from 'axios';
// // import { AlertCircle, CheckCircle, X } from 'lucide-react';
// // import { useState } from 'react';
// // import API_URL from './api-config';
// // import { personalStyles } from './PersonalStyles';

// // const CLOUDINARY_UPLOAD_PRESET = 'jabu_chapel_preset';
// // const CLOUDINARY_CLOUD_NAME = 'dui4el4tx';

// // const EMAILJS_SERVICE_ID = 'service_5fbh9el';
// // const EMAILJS_TEMPLATE_ID = 'template_is111np';
// // const EMAILJS_PUBLIC_KEY = 'DefAZ0rhnYty_p2_5';

// // const SuccessDialog = ({ onClose }) => (
// //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //     <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
// //       <div className="flex items-center mb-4">
// //         <CheckCircle className="text-green-500 mr-2" size={28} />
// //         <h3 className="text-2xl font-extrabold text-gray-900">Success!</h3>
// //       </div>
// //       <p className="text-gray-700 text-lg mb-6 font-semibold">
// //         Your form has been successfully submitted. You will receive an email containing your registration Document.
// //       </p>
// //       <button
// //         onClick={onClose}
// //         className="w-full bg-green-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-green-700 transition duration-200"
// //       >
// //         Close
// //       </button>
// //     </div>
// //   </div>
// // );

// // const ErrorDialog = ({ onClose }) => (
// //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //     <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
// //       <div className="flex items-center mb-4">
// //         <AlertCircle className="text-red-500 mr-2" size={28} />
// //         <h3 className="text-2xl font-extrabold text-gray-900">Error</h3>
// //       </div>
// //       <p className="text-gray-700 text-lg mb-6 font-semibold">
// //         An error occurred while submitting your form. Please try again.
// //       </p>
// //       <button
// //         onClick={onClose}
// //         className="w-full bg-red-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-red-700 transition duration-200"
// //       >
// //         Close
// //       </button>
// //     </div>
// //   </div>
// // );

// // const LoadingSpinner = () => (
// //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //     <div className="relative">
// //       <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
// //       <div className="w-20 h-20 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
// //     </div>
// //   </div>
// // );

// // const Review = ({ isOpen, onClose, formData, onEdit }) => {
// //   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
// //   const [showErrorDialog, setShowErrorDialog] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   if (!isOpen) return null;

// //   const sections = [
// //     { title: 'Personal Information', fields: ['firstName', 'surname', 'middleName', 'sex', 'dob', 'homeTown', 'stateOfOrigin', 'nationality', 'phoneNo', 'whatsappNo', 'email', 'address', 'hobbies', 'level', 'hostel', 'matricNo', 'college', 'department'] },
// //     { title: 'Spirituality', fields: ['attendChurch', 'churchName', 'churchStartDate', 'newBirth', 'newBirthDate', 'salvationExperience', 'waterBaptism', 'waterBaptismDate', 'communicant', 'notCommunicantReason', 'holySpirit', 'notHolySpiritReason', 'spiritualGifts', 'churchDiscipline', 'disciplineReason', 'leadershipTraining', 'leadershipTrainingDetails', 'pastorName', 'pastorPhone', 'lifeVision', 'obeyInstructions', 'contributeToChapel'] },
// //     { title: 'Family', fields: ['sponsorName', 'familyType', 'sponsorOccupation', 'sponsorPhone', 'parentsLivingTogether', 'parentsNotLivingTogetherReason', 'bothParentsAlive', 'whichParentAlive'] },
// //     { title: 'Health', fields: ['hasPhysicalDefect', 'physicalDefectType', 'oftenIll', 'specialDietOrTreatment'] },
// //   ];

// //   const formatLabel = (field) => {
// //     return field
// //       .replace(/([A-Z])/g, ' $1')
// //       .replace(/^./, (str) => str.toUpperCase());
// //   };

// //   const sendEmail = async (email, firstName, userId) => {
// //     try {
// //       const emailData = {
// //         firstname: firstName,
// //         from_name: 'Chaplaincy',
// //         email: email,
// //         message: `Your registration was successful.`,
// //         pdfUrl: `${API_URL}/api/download-pdf/${userId}`,
// //         reply_to: 'noreply@example.com',
// //       };
  
// //       await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData, EMAILJS_PUBLIC_KEY);
// //     } catch (error) {
// //       console.error('Error sending email:', error);
// //       throw error;
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     setIsLoading(true);
// //     try {
// //       let passportUrl = '';
      
// //       if (formData.passport) {
// //         const cloudinaryData = new FormData();
// //         cloudinaryData.append('file', formData.passport);
// //         cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
// //         const cloudinaryResponse = await axios.post(
// //           `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
// //           cloudinaryData
// //         );
  
// //         passportUrl = cloudinaryResponse.data.secure_url;
// //       }
  
// //       const formDataToSend = { ...formData, passportUrl };
// //       delete formDataToSend.passport;
  
// //       const response = await axios.post(`${API_URL}/api/submit-form`, formDataToSend);
  
// //       const userEmail = formData.email;
// //       const userFirstName = formData.firstName;
// //       const userId = response.data.user._id;
  
// //       await sendEmail(userEmail, userFirstName, userId);
  
// //       setIsLoading(false);
// //       setShowSuccessDialog(true);
// //     } catch (error) {
// //       console.error('Error submitting form:', error);
// //       setIsLoading(false);
// //       setShowErrorDialog(true);
// //     }
// //   };

// //   return (
// //     <div className={personalStyles.modalOverlay}>
// //       <div className={`${personalStyles.modalContent} max-w-4xl`}>
// //         <button onClick={onClose} className={personalStyles.closeButton}>
// //           <X size={20} className="sm:w-6 sm:h-6" />
// //         </button>
// //         <div className="flex justify-between items-start mb-6">
// //           <h2 className={personalStyles.mainHeading}>Review Your Response</h2>
// //           <div className="mt-4 mr-4">
// //             {formData.passport && (
// //               <img 
// //                 src={URL.createObjectURL(formData.passport)} 
// //                 alt="Passport" 
// //                 className="w-32 h-40 object-cover rounded-md shadow-md"
// //               />
// //             )}
// //           </div>
// //         </div>
        
// //         <div className="mt-6 space-y-8">
// //           {sections.map((section, index) => (
// //             <div key={index} className="bg-white rounded-lg shadow-md p-6">
// //               <h3 className="text-2xl font-bold mb-4 text-blue-600 border-b-2 border-blue-200 pb-2">{section.title}</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {section.fields.map((field) => (
// //                   <div key={field} className="flex flex-col">
// //                     <span className="text-sm font-medium text-gray-500">{formatLabel(field)}</span>
// //                     <span className="mt-1 text-lg font-semibold text-gray-800 break-words">
// //                       {formData[field] || 'N/A'}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
        
// //         <div className="mt-8 flex justify-between">
// //           <button onClick={onEdit} className={`${personalStyles.navButton} bg-gray-500 hover:bg-gray-600`}>
// //             Edit
// //           </button>
// //           <button 
// //             onClick={handleSubmit} 
// //             className={`${personalStyles.navButton} bg-green-500 hover:bg-green-600 relative`}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? (
// //               <span className="flex items-center">
// //                 <span className="mr-2">Processing</span>
// //                 <span className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></span>
// //               </span>
// //             ) : (
// //               'Submit'
// //             )}
// //           </button>
// //         </div>
// //       </div>

// //       {isLoading && <LoadingSpinner />}
// //       {showSuccessDialog && <SuccessDialog onClose={() => { setShowSuccessDialog(false); onClose(); }} />}
// //       {showErrorDialog && <ErrorDialog onClose={() => setShowErrorDialog(false)} />}
// //     </div>
// //   );
// // };

// // export default Review;

// //Review.jsx
// import emailjs from '@emailjs/browser';
// import axios from 'axios';
// import { AlertCircle, CheckCircle, X } from 'lucide-react';
// import { useState } from 'react';
// import API_URL from './api-config';
// import { personalStyles } from './PersonalStyles';

// const EMAILJS_SERVICE_ID = 'service_5fbh9el';
// const EMAILJS_TEMPLATE_ID = 'template_is111np';
// const EMAILJS_PUBLIC_KEY = 'DefAZ0rhnYty_p2_5';

// const CLOUDINARY_UPLOAD_PRESET = 'jabu_chapel_preset';
// const CLOUDINARY_CLOUD_NAME = 'dui4el4tx';

// // Dialog Components
// const SuccessDialog = ({ onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
//       <div className="flex items-center mb-4">
//         <CheckCircle className="text-green-500 mr-2" size={28} />
//         <h3 className="text-2xl font-extrabold text-gray-900">Success!</h3>
//       </div>
//       <p className="text-gray-700 text-lg mb-6 font-semibold">
//         Your form has been successfully submitted. You will receive an email containing your registration Document.
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

// const ErrorDialog = ({ onClose, errorMessage }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
//       <div className="flex items-center mb-4">
//         <AlertCircle className="text-red-500 mr-2" size={28} />
//         <h3 className="text-2xl font-extrabold text-gray-900">Error</h3>
//       </div>
//       <p className="text-gray-700 text-lg mb-6 font-semibold">
//         {errorMessage || 'An error occurred while submitting your form. Please try again.'}
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

// const Review = ({ isOpen, onClose, formData, onEdit }) => {
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [showErrorDialog, setShowErrorDialog] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   if (!isOpen) return null;

//   const sections = [
//     {
//       title: 'Personal Information',
//       fields: ['firstName', 'surname', 'middleName', 'sex', 'dob', 'homeTown', 'stateOfOrigin', 'nationality', 'phoneNo', 'whatsappNo', 'email', 'address', 'hobbies', 'level', 'hostel', 'matricNo', 'college', 'department']
//     },
//     {
//       title: 'Spirituality',
//       fields: ['attendChurch', 'churchName', 'churchStartDate', 'newBirth', 'newBirthDate', 'salvationExperience', 'waterBaptism', 'waterBaptismDate', 'communicant', 'notCommunicantReason', 'holySpirit', 'notHolySpiritReason', 'spiritualGifts', 'churchDiscipline', 'disciplineReason', 'leadershipTraining', 'leadershipTrainingDetails', 'pastorName', 'pastorPhone', 'lifeVision', 'obeyInstructions', 'contributeToChapel']
//     },
//     {
//       title: 'Family',
//       fields: ['sponsorName', 'familyType', 'sponsorOccupation', 'sponsorPhone', 'parentsLivingTogether', 'parentsNotLivingTogetherReason', 'bothParentsAlive', 'whichParentAlive']
//     },
//     {
//       title: 'Health',
//       fields: ['hasPhysicalDefect', 'physicalDefectType', 'oftenIll', 'specialDietOrTreatment']
//     },
//   ];

//   const formatLabel = (field) => {
//     return field
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, (str) => str.toUpperCase());
//   };

//   const generateHTML = () => {
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     });

//     return `
//       <!DOCTYPE html>
//       <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <title>JABU Chaplaincy Registration</title>
//           <style>
//             body { 
//               font-family: Arial, sans-serif; 
//               line-height: 1.6; 
//               color: #333;
//               margin: 0;
//               padding: 20px;
//             }
//             .container { 
//               max-width: 800px; 
//               margin: 0 auto; 
//               padding: 20px;
//               background-color: #fff;
//               box-shadow: 0 0 10px rgba(0,0,0,0.1);
//             }
//             .header { 
//               text-align: center; 
//               margin-bottom: 30px;
//               border-bottom: 2px solid #333;
//               padding-bottom: 20px;
//             }
//             .header h1 {
//               margin: 0;
//               color: #1a365d;
//               font-size: 24px;
//               text-transform: uppercase;
//             }
//             .passport-container {
//               text-align: right;
//               margin-bottom: 20px;
//             }
//             .passport-photo { 
//               width: 150px; 
//               height: 200px; 
//               object-fit: cover;
//               border: 1px solid #333;
//             }
//             .content { 
//               clear: both; 
//             }
//             .section { 
//               margin-bottom: 30px;
//               border-bottom: 1px solid #eaeaea;
//               padding-bottom: 20px;
//             }
//             .section-title { 
//               font-size: 20px; 
//               font-weight: bold; 
//               margin-bottom: 15px;
//               color: #2c5282;
//               border-bottom: 2px solid #2c5282;
//               padding-bottom: 5px;
//             }
//             .field { 
//               margin-bottom: 10px;
//               display: flex;
//               flex-wrap: wrap;
//             }
//             .label { 
//               font-weight: bold;
//               width: 200px;
//               margin-right: 10px;
//             }
//             .value {
//               flex: 1;
//             }
//             .timestamp {
//               color: #718096;
//               font-style: italic;
//               margin-bottom: 20px;
//             }
//             .signature-section { 
//               margin-top: 50px; 
//               display: flex; 
//               justify-content: space-between;
//             }
//             .signature { 
//               text-align: center;
//             }
//             .signature-line { 
//               border-top: 1px solid black; 
//               width: 200px; 
//               margin-bottom: 5px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>JABU CHAPLAINCY UNIT</h1>
//               <h2>Registration Verification Document</h2>
//               <div class="timestamp">${currentDate}</div>
//             </div>
            
//             <div class="passport-container">
//               ${formData.passportUrl ? 
//                 `<img src="${formData.passportUrl}" alt="Passport Photo" class="passport-photo">` : 
//                 '<div class="passport-photo" style="background-color: #eaeaea; display: flex; justify-content: center; align-items: center;">No Photo</div>'
//               }
//             </div>

//             <div class="content">
//               ${sections.map(section => `
//                 <div class="section">
//                   <div class="section-title">${section.title}</div>
//                   ${section.fields.map(field => `
//                     <div class="field">
//                       <div class="label">${formatLabel(field)}:</div>
//                       <div class="value">${formData[field] || 'N/A'}</div>
//                     </div>
//                   `).join('')}
//                 </div>
//               `).join('')}
//             </div>

//             <div class="signature-section">
//               <div class="signature">
//                 <div class="signature-line"></div>
//                 <div>Pastor Oluwasanmi J.O.</div>
//               </div>
//               <div class="signature">
//                 <div class="signature-line"></div>
//                 <div>${formData.firstName} ${formData.surname}</div>
//               </div>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       let passportUrl = '';
      
//       // Upload passport to Cloudinary if it exists
//       if (formData.passport) {
//         const cloudinaryData = new FormData();
//         cloudinaryData.append('file', formData.passport);
//         cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
//         const cloudinaryResponse = await axios.post(
//           `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//           cloudinaryData
//         );
  
//         passportUrl = cloudinaryResponse.data.secure_url;
//       }

//       const htmlContent = generateHTML();
      
//       // Submit form data to the server
//       const formDataToSend = {
//         ...formData,
//         passportUrl,
//         htmlContent
//       };
//       delete formDataToSend.passport; // Remove the actual file from the data being sent

//       const response = await axios.post(`${API_URL}/api/submit-form`, formDataToSend);
//       const userId = response.data.user._id;

//       // Send email notification
//       await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         {
//           firstname: formData.firstName,
//           from_name: 'Chaplaincy',
//           email: formData.email,
//           message: 'Your registration was successful.',
//         pdfUrl: `${API_URL}/api/download-html/${userId}`,
//           reply_to: 'noreply@example.com',
//         },
//         EMAILJS_PUBLIC_KEY
//       );

//       setShowSuccessDialog(true);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrorMessage(error.response?.data?.message || 'An error occurred while submitting the form.');
//       setShowErrorDialog(true);
//     } finally {
//       setIsLoading(false);
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
//                 <span className="mr-2">Processing</span>
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
//       {showErrorDialog && <ErrorDialog onClose={() => setShowErrorDialog(false)} errorMessage={errorMessage} />}
//     </div>
//   );
// };
   
// export default Review;


import emailjs from '@emailjs/browser';
import axios from 'axios';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';
import API_URL from './api-config';
import { personalStyles } from './PersonalStyles';

const EMAILJS_SERVICE_ID = 'service_5fbh9el';
const EMAILJS_TEMPLATE_ID = 'template_is111np';
const EMAILJS_PUBLIC_KEY = 'DefAZ0rhnYty_p2_5';

const CLOUDINARY_UPLOAD_PRESET = 'jabu_chapel_preset';
const CLOUDINARY_CLOUD_NAME = 'dui4el4tx';

// Dialog Components
const SuccessDialog = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
      <div className="flex items-center mb-4">
        <CheckCircle className="text-green-500 mr-2" size={28} />
        <h3 className="text-2xl font-extrabold text-gray-900">Success!</h3>
      </div>
      <p className="text-gray-700 text-lg mb-6 font-semibold">
        Your form has been successfully submitted. You will receive an email containing your registration Document.
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

const ErrorDialog = ({ onClose, errorMessage }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
      <div className="flex items-center mb-4">
        <AlertCircle className="text-red-500 mr-2" size={28} />
        <h3 className="text-2xl font-extrabold text-gray-900">Error</h3>
      </div>
      <p className="text-gray-700 text-lg mb-6 font-semibold">
        {errorMessage || 'An error occurred while submitting your form. Please try again.'}
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

const Review = ({ isOpen, onClose, formData, onEdit }) => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const sections = [
    {
      title: 'Personal Information',
      fields: ['firstName', 'surname', 'middleName', 'sex', 'dob', 'homeTown', 'stateOfOrigin', 'nationality', 'phoneNo', 'whatsappNo', 'email', 'address', 'hobbies', 'level', 'hostel', 'matricNo', 'college', 'department']
    },
    {
      title: 'Spirituality',
      fields: ['attendChurch', 'churchName', 'churchStartDate', 'newBirth', 'newBirthDate', 'salvationExperience', 'waterBaptism', 'waterBaptismDate', 'communicant', 'notCommunicantReason', 'holySpirit', 'notHolySpiritReason', 'spiritualGifts', 'churchDiscipline', 'disciplineReason', 'leadershipTraining', 'leadershipTrainingDetails', 'pastorName', 'pastorPhone', 'lifeVision', 'obeyInstructions', 'contributeToChapel']
    },
    {
      title: 'Family',
      fields: ['sponsorName', 'familyType', 'sponsorOccupation', 'sponsorPhone', 'parentsLivingTogether', 'parentsNotLivingTogetherReason', 'bothParentsAlive', 'whichParentAlive']
    },
    {
      title: 'Health',
      fields: ['hasPhysicalDefect', 'physicalDefectType', 'oftenIll', 'specialDietOrTreatment']
    },
  ];

  const formatLabel = (field) => {
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const generateHTML = (passportUrl) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>JABU Chaplaincy Registration</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333;
              margin: 0;
              padding: 20px;
            }
            .container { 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              color: #1a365d;
              font-size: 24px;
              text-transform: uppercase;
            }
            .message {
              text-align: center;
              margin: 20px 0;
              font-size: 18px;
              color: #2c5282;
            }
            .passport-container {
              text-align: right;
              margin-bottom: 20px;
            }
            .passport-photo { 
              width: 150px; 
              height: 200px; 
              object-fit: cover;
              border: 1px solid #333;
            }
            .content { 
              clear: both; 
            }
            .section { 
              margin-bottom: 30px;
              border-bottom: 1px solid #eaeaea;
              padding-bottom: 20px;
            }
            .section-title { 
              font-size: 20px; 
              font-weight: bold; 
              margin-bottom: 15px;
              color: #2c5282;
              border-bottom: 2px solid #2c5282;
              padding-bottom: 5px;
            }
            .field { 
              margin-bottom: 10px;
              display: flex;
              flex-wrap: wrap;
            }
            .label { 
              font-weight: bold;
              width: 200px;
              margin-right: 10px;
            }
            .value {
              flex: 1;
            }
            .timestamp {
              color: #718096;
              font-style: italic;
              margin-bottom: 20px;
            }
            .closing {
              text-align: center;
              margin: 30px 0;
              font-size: 18px;
              font-style: italic;
            }
            .signature-section { 
              margin-top: 50px; 
              display: flex; 
              justify-content: space-between;
            }
            .signature { 
              text-align: center;
            }
            .signature-line { 
              border-top: 1px solid black; 
              width: 200px; 
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>JABU CHAPLAINCY UNIT</h1>
              <h2>Registration Verification Document</h2>
              <div class="timestamp">${currentDate}</div>
            </div>
            
            <div class="message">
              <p>
                You've completed your Chaplaincy Clearance form successfully. You are now authorized to meet with the Chaplain to present this slip for his signature.
              </p>
            </div>

            <div class="passport-container">
              ${passportUrl ? 
                `<img src="${passportUrl}" alt="Passport Photo" class="passport-photo">` : 
                '<div class="passport-photo" style="background-color: #eaeaea; display: flex; justify-content: center; align-items: center;">No Photo</div>'
              }
            </div>

            <div class="content">
              ${sections.map(section => `
                <div class="section">
                  <div class="section-title">${section.title}</div>
                  ${section.fields.map(field => `
                    <div class="field">
                      <div class="label">${formatLabel(field)}:</div>
                      <div class="value">${formData[field] || 'N/A'}</div>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
            </div>

            <div class="closing">
              <p>Remain Blessed,</p>
            </div>

            <div class="signature-section">
              <div class="signature">
                <div class="signature-line"></div>
                <div>Pastor Oluwasanmi J.O.</div>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <div>${formData.firstName} ${formData.surname}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let passportUrl = '';
      
      // Upload passport to Cloudinary if it exists
      if (formData.passport) {
        const cloudinaryData = new FormData();
        cloudinaryData.append('file', formData.passport);
        cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          cloudinaryData
        );
  
        passportUrl = cloudinaryResponse.data.secure_url;
      }

      const htmlContent = generateHTML(passportUrl);
      
      // Submit form data to the server
      const formDataToSend = {
        ...formData,
        passportUrl,
        htmlContent
      };
      delete formDataToSend.passport; // Remove the actual file from the data being sent

      const response = await axios.post(`${API_URL}/api/submit-form`, formDataToSend);
      const userId = response.data.user._id;

      // Send email notification
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          firstname: formData.firstName,
          from_name: 'Chaplaincy',
          email: formData.email,
          message: 'Your registration was successful.',
          pdfUrl: `${API_URL}/api/download-html/${userId}`,
          reply_to: 'noreply@example.com',
        },
        EMAILJS_PUBLIC_KEY
      );

      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred while submitting the form.');
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
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
                <span className="mr-2">Processing</span>
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
      {showErrorDialog && <ErrorDialog onClose={() => setShowErrorDialog(false)} errorMessage={errorMessage} />}
    </div>
  );
};
   
export default Review;