// // Review.jsx
// import axios from 'axios';
// import html2pdf from 'html2pdf.js';
// import { AlertCircle, CheckCircle, Download, X } from 'lucide-react';
// import { useState } from 'react';
// import API_URL from './api-config';
// import { personalStyles } from './PersonalStyles';

// const CLOUDINARY_UPLOAD_PRESET = 'jabu_chapel_preset';
// const CLOUDINARY_CLOUD_NAME = 'dui4el4tx';

// const SuccessDialog = ({ onClose, onDownload }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
//       <div className="flex items-center mb-4">
//         <CheckCircle className="text-green-500 mr-2" size={28} />
//         <h3 className="text-2xl font-extrabold text-gray-900">Success!</h3>
//       </div>
//       <p className="text-gray-700 text-lg mb-6 font-semibold">
//         Your form has been successfully submitted.
//       </p>
//       <div className="flex flex-col space-y-4">
//         <button
//           onClick={onDownload}
//           className="w-full bg-blue-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
//         >
//           <Download className="mr-2" size={20} />
//           Download Document
//         </button>
//         <button
//           onClick={onClose}
//           className="w-full bg-gray-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
//         >
//           Close
//         </button>
//       </div>
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
//   const [userId, setUserId] = useState(null);

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

//   const generateHTML = (passportUrl) => {
//     const currentDate = new Date().toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     });

//     //TO BE USED LATER -------------------------------------
//   //   return `
//   //     <!DOCTYPE html>
//   //     <html lang="en">
//   //       <head>
//   //         <meta charset="UTF-8">
//   //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   //         <style>
//   //           body, html {
//   //             margin: 0;
//   //             padding: 0;
//   //             font-family: 'Helvetica Neue', Arial, sans-serif;
//   //             line-height: 1.4;
//   //             color: #333;
//   //           }
//   //           .container {
//   //             width: 100%;
//   //             max-width: 800px;
//   //             margin: auto;
//   //             padding: 20px;
//   //           }
//   //           .header {
//   //             text-align: left;
//   //             padding-bottom: 20px;
//   //           }
//   //           h1 {
//   //             color: #333;
//   //             margin-bottom: 10px;
//   //             font-size: 24px;
//   //             font-weight: bold;
//   //             text-transform: uppercase;
//   //             letter-spacing: 1px;
//   //             line-height: 1.2;
//   //           }
//   //           .header-line {
//   //             border-bottom: 2px solid #333;
//   //             margin-bottom: 20px;
//   //           }
//   //           .timestamp {
//   //             color: #718096;
//   //             font-size: 14px;
//   //             margin-bottom: 20px;
//   //           }
//   //           .content {
//   //             margin-bottom: 20px;
//   //           }
//   //           .details span {
//   //             font-weight: bold;
//   //           }
//   //           .image-container {
//   //             float: right;
//   //             width: 120px;
//   //             height: 150px;
//   //             border: 1px solid #333;
//   //             margin-left: 20px;
//   //             margin-right: 30px;
//   //           }
//   //           .passport-img {
//   //             width: 100%;
//   //             height: 100%;
//   //             object-fit: cover;
//   //           }
//   //           .letter-body {
//   //             clear: both;
//   //             margin-top: 60px;
//   //           }
//   //           .signature-section {
//   //             margin-top: 100px;
//   //           }
//   //           .signature-line {
//   //             display: inline-block;
//   //             width: 180px;
//   //             border-bottom: 1px solid #333;
//   //           }
//   //           .signature {
//   //             display: inline-block;
//   //             width: 45%;
//   //           }
//   //         </style>
//   //       </head>
//   //       <body>
//   //         <div class="container">
//   //           <div class="header">
//   //             <h1>JABU CHAPLAINCY UNIT<br>REGISTRATION VERIFICATION<br>DOCUMENT</h1>
//   //             <div class="header-line"></div>
//   //           </div>
//   //           <div class="timestamp">${currentDate}</div>
//   //           <div class="content">
//   //             <div class="image-container">
//   //               <img class="passport-img" src="${passportUrl}" alt="Passport Photo">
//   //             </div>
//   //             <div class="details">
//   //               <p>Dear <span>${formData.firstName} ${formData.surname}</span>,</p>
//   //               <p><span>${formData.department}</span></p>
//   //               <p><span>${formData.level} Level</span></p>
//   //               <p><span>${formData.phoneNo}</span></p>
//   //               <p><span>${formData.sex}</span></p>
//   //             </div>
//   //           </div>
//   //           <div class="letter-body">
//   //             <p>
//   //               You've completed your Chaplaincy Clearance form successfully. You are now authorized to meet with the Chaplain to present this slip for his signature.
//   //             </p>
//   //             <p>Remain Blessed,</p>
//   //           </div>
//   //           <div class="signature-section">
//   //             <div class="signature">
//   //               <div class="signature-line"></div>
//   //               <p>Pastor Oluwasanmi J.O.</p>
//   //             </div>
//   //             <div class="signature">
//   //               <div class="signature-line"></div>
//   //               <p>${formData.firstName} ${formData.surname}</p>
//   //             </div>
//   //           </div>
//   //         </div>
//   //       </body>
//   //     </html>
//   //   `;
//   // };

//   return `
//   <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <style>
//       body, html {
//         margin: 0;
//         padding: 0;
//         font-family: 'Helvetica Neue', Arial, sans-serif;
//         line-height: 1.4;
//         color: #333;
//       }
//       .container {
//         width: 100%;
//         max-width: 800px;
//         margin: auto;
//         padding: 20px;
//       }
//       .header {
//         text-align: left;
//         padding-bottom: 20px;
//       }
//       h1 {
//         color: #333;
//         margin-bottom: 10px;
//         font-size: 24px;
//         font-weight: bold;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         line-height: 1.2;
//       }
//       .header-line {
//         border-bottom: 2px solid #333;
//         margin-bottom: 20px;
//       }
//       .timestamp {
//         color: #718096;
//         font-size: 14px;
//         margin-bottom: 20px;
//       }
//       .content {
//         margin-bottom: 20px;
//         position: relative;
//         min-height: 150px;
//       }
//       .details span {
//         font-weight: bold;
//       }
//       .image-container {
//         position: absolute;
//         top: 0;
//         right: 30px;
//         width: 150px;
//         height: 150px;
//         border: 1px solid #333;
//       }
//       .passport-img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }
//       .letter-body {
//         clear: both;
//         margin-top: 60px;
//       }
//       .letter-body p:last-child {
//         margin-top: 60px; /* Increased spacing before "Remain Blessed" */
//       }
//       .signature-section {
//         margin-top: 150px;
//         display: flex;
//         justify-content: space-between;
//         width: 100%;
//       }
//       .signature {
//         width: 180px;
//         text-align: center;
//       }
//       .signature-line {
//         width: 100%;
//         border-bottom: 1px solid #333;
//         margin-bottom: 10px;
//       }
//       .signature p {
//         margin: 0;
//         font-size: 14px;
//         text-align: center;
//         width: 100%; /* Ensure the text takes full width of signature div */
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <h1>JABU CHAPLAINCY UNIT<br>REGISTRATION VERIFICATION<br>DOCUMENT</h1>
//         <div class="header-line"></div>
//       </div>
//      <div class="timestamp">${currentDate}</div>
//         <div class="content">
//           <div class="image-container">
//             <img class="passport-img" src="${passportUrl}" alt="Passport Photo">
//           </div>
//         <div class="details">
//           <p>Dear <span>${formData.firstName} ${formData.surname}</span>,</p>
//             <p><span>${formData.department}</span></p>
//             <p><span>${formData.level} Level</span></p>
//             <p><span>${formData.phoneNo}</span></p>
//             <p><span>${formData.sex}</span></p>
//         </div>
//       </div>
//       <div class="letter-body">
//         <p>
//           You've completed your Chaplaincy Clearance form successfully. You are now authorized to meet with the Chaplain to present this slip for his signature.
//         </p>
//         <p>Remain Blessed,</p>
//       </div>
//       <div class="signature-section">
//         <div class="signature">
//           <div class="signature-line"></div>
//           <p>Pastor Oluwasanmi J.O.</p>
//         </div>
//         <div class="signature">
//           <div class="signature-line"></div>
//           <p>${formData.firstName} ${formData.surname}</p>
//         </div>
//       </div>
//     </div>
//   </body>
// </html>
// `;
// };

//   // const handleSubmit = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     let passportUrl = '';
      
//   //     if (formData.passport) {
//   //       const cloudinaryData = new FormData();
//   //       cloudinaryData.append('file', formData.passport);
//   //       cloudinaryData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
//   //       const cloudinaryResponse = await axios.post(
//   //         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//   //         cloudinaryData
//   //       );
  
//   //       passportUrl = cloudinaryResponse.data.secure_url;
//   //     }

//   //     const htmlContent = generateHTML(passportUrl);
      
//   //     const formDataToSend = {
//   //       ...formData,
//   //       passportUrl,
//   //       htmlContent
//   //     };
//   //     delete formDataToSend.passport;

//   //     const response = await axios.post(`${API_URL}/api/submit-form`, formDataToSend);
//   //     setUserId(response.data.user._id);
//   //     setShowSuccessDialog(true);
//   //   } catch (error) {
//   //     console.error('Error submitting form:', error);
//   //     setErrorMessage(error.response?.data?.message || 'An error occurred while submitting the form.');
//   //     setShowErrorDialog(true);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // const handleDownload = async () => {
//   //   try {
//   //     const response = await axios.get(`${API_URL}/api/download-html/${userId}`, {
//   //       responseType: 'blob'
//   //     });
      
//   //     const url = window.URL.createObjectURL(new Blob([response.data]));
//   //     const link = document.createElement('a');
//   //     link.href = url;
//   //     link.setAttribute('download', 'chaplaincy_registration.html');
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     link.remove();
//   //     window.URL.revokeObjectURL(url);
//   //   } catch (error) {
//   //     console.error('Error downloading document:', error);
//   //     setErrorMessage('Error downloading document. Please try again.');
//   //     setShowErrorDialog(true);
//   //   }
//   // };

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
//       }

//       const htmlContent = generateHTML(passportUrl);
      
//       const formDataToSend = {
//         ...formData,
//         passportUrl,
//         htmlContent
//       };
//       delete formDataToSend.passport;

//       const response = await axios.post(`${API_URL}/api/submit-form`, formDataToSend);
//       setUserId(response.data.user._id);
//       setShowSuccessDialog(true);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrorMessage(error.response?.data?.message || 'An error occurred while submitting the form.');
//       setShowErrorDialog(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/download-html/${userId}`);
//       const htmlContent = response.data;
      
//       // Create a temporary container for the HTML content
//       const container = document.createElement('div');
//       container.innerHTML = htmlContent;
//       document.body.appendChild(container);
      
//       // Configure pdf options
//       const options = {
//         margin: 10,
//         filename: 'chaplaincy_registration.pdf',
//         image: { type: 'jpeg', quality: 2 },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,  // Add this to allow loading of cross-origin images
//           logging: true    // This helps with debugging
//         },
//         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//       };
      
//       // Generate PDF
//       await html2pdf().set(options).from(container).save();
      
//       // Remove the temporary container
//       document.body.removeChild(container);
//     } catch (error) {
//       console.error('Error downloading document:', error);
//       setErrorMessage('Error downloading document. Please try again.');
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
//       {showSuccessDialog && 
//         <SuccessDialog 
//           onClose={() => { 
//             setShowSuccessDialog(false); 
//             onClose(); 
//           }} 
//           onDownload={handleDownload}
//         />
//       }
//       {showErrorDialog && 
//         <ErrorDialog 
//           onClose={() => setShowErrorDialog(false)} 
//           errorMessage={errorMessage} 
//         />
//       }
//     </div>
//   );
// };
   
// export default Review;

//Review.jsx
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AlertCircle, CheckCircle, Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import API_URL from './api-config';
import { personalStyles } from './PersonalStyles';

const CLOUDINARY_UPLOAD_PRESET = 'jabu_chapel_preset';
const CLOUDINARY_CLOUD_NAME = 'dui4el4tx';

const SuccessDialog = ({ onClose, onDownload }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-8 max-w-xs w-full sm:max-w-sm md:max-w-md">
      <div className="flex items-center mb-4">
        <CheckCircle className="text-green-500 mr-2" size={28} />
        <h3 className="text-2xl font-extrabold text-gray-900">Success!</h3>
      </div>
      <p className="text-gray-700 text-lg mb-6 font-semibold">
        Your form has been successfully submitted.
      </p>
      <div className="flex flex-col space-y-4">
        <button
          onClick={onDownload}
          className="w-full bg-blue-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          <Download className="mr-2" size={20} />
          Download Document
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-600 text-white text-lg font-medium py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Close
        </button>
      </div>
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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
  }, []);

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.4;
            color: #333;
            font-size: 10px;
          }
          .container {
            width: 100%;
            max-width: 800px;
            margin: auto;
            padding: 20px;
          }
          .header {
            text-align: left;
            padding-bottom: 10px;
          }
          h1 {
            color: #333;
            margin-bottom: 5px;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: 1.2;
          }
          .header-line {
            border-bottom: 1px solid #333;
            margin-bottom: 10px;
          }
          .timestamp {
            color: #718096;
            font-size: 10px;
            margin-bottom: 10px;
          }
          .content {
            margin-bottom: 10px;
            position: relative;
            min-height: 100px;
          }
          .details span {
            font-weight: bold;
          }
          .image-container {
            position: absolute;
            top: 0;
            right: 10px;
            width: 80px;
            height: 100px;
            border: 1px solid #333;
          }
          .passport-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .letter-body {
            clear: both;
            margin-top: 30px;
          }
          .letter-body p:last-child {
            margin-top: 30px;
          }
          .signature-section {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          .signature {
            width: 120px;
            text-align: center;
          }
          .signature-line {
            width: 100%;
            border-bottom: 1px solid #333;
            margin-bottom: 5px;
          }
          .signature p {
            margin: 0;
            font-size: 10px;
            text-align: center;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>JABU CHAPLAINCY UNIT<br>REGISTRATION VERIFICATION<br>DOCUMENT</h1>
            <div class="header-line"></div>
          </div>
         <div class="timestamp">${currentDate}</div>
            <div class="content">
              <div class="image-container">
                <img class="passport-img" src="${passportUrl}" alt="Passport Photo">
              </div>
            <div class="details">
              <p>Dear <span>${formData.firstName} ${formData.surname}</span>,</p>
                <p><span>${formData.department}</span></p>
                <p><span>${formData.level} Level</span></p>
                <p><span>${formData.phoneNo}</span></p>
                <p><span>${formData.sex}</span></p>
            </div>
          </div>
          <div class="letter-body">
            <p>
              You've completed your Chaplaincy Clearance form successfully. You are now authorized to meet with the Chaplain to present this slip for his signature.
            </p>
            <p>Remain Blessed,</p>
          </div>
          <div class="signature-section">
            <div class="signature">
              <div class="signature-line"></div>
              <p>Pastor Oluwasanmi J.O.</p>
            </div>
            <div class="signature">
              <div class="signature-line"></div>
              <p>${formData.firstName} ${formData.surname}</p>
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
      
      const formDataToSend = {
        ...formData,
        passportUrl,
        htmlContent
      };
      delete formDataToSend.passport;

      const response = await axios.post(`${API_URL}/api/submit-form`, formDataToSend);
      setUserId(response.data.user._id);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred while submitting the form.');
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/api/download-html/${userId}`);
      const htmlContent = response.data;
      
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      document.body.appendChild(container);
      
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: true
      });
      
      document.body.removeChild(container);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }
      
      pdf.save('chaplaincy_registration.pdf');
    } catch (error) {
      console.error('Error downloading document:', error);
      setErrorMessage('Error downloading document. Please try again.');
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
      {showSuccessDialog && 
        <SuccessDialog 
          onClose={() => { 
            setShowSuccessDialog(false); 
            onClose(); 
          }} 
          onDownload={handleDownload}
        />
      }
      {showErrorDialog && 
        <ErrorDialog 
          onClose={() => setShowErrorDialog(false)} 
          errorMessage={errorMessage} 
        />
      }
    </div>
  );
};

export default Review;