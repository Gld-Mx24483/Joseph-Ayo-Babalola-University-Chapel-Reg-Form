// //Personal.jsx
// import { Listbox, Transition } from '@headlessui/react';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
// import { X } from 'lucide-react';
// import React, { useEffect, useMemo, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { personalStyles } from './PersonalStyles';

// const collegesAndDepartments = {
//   'Agriculture and Natural Sciences': [
//     'Agricultural Economics',
//     'Animal Science',
//     'Biochemistry',
//     'Computer Science',
//     'Crop Science',
//     'Food Science and Technology',
//     'Hotel Management and Tourism',
//     'Industrial Chemistry',
//     'Microbiology',
//     'Physics Electronics'
//   ],
//   'Environmental Sciences': [
//     'Architecture',
//     'Building',
//     'Estate Management',
//     'Quantity Survey'
//   ],
//   'Health Sciences': [
//     'Medical Laboratory Science',
//     'Nursing'
//   ],
//   'Humanities and Social Sciences': [
//     'Economics',
//     'English',
//     'History and International Studies',
//     'International Relations',
//     'Mass Communication',
//     'Political Science',
//     'Public Administration',
//     'Philosophy & Religious Studies'
//   ],
//   'Law': ['Law'],
//   'Management Sciences': [
//     'Accounting',
//     'Business Administration',
//     'Entrepreneurship',
//     'Human Resource Management and Industrial Relations',
//     'Insurance'
//   ]
// };

// const Personal = ({ isOpen, onClose, onNext, onPrevious, initialData }) => {
//   const { control, handleSubmit, watch, setValue } = useForm({
//     defaultValues: initialData
//   });
//   const [passportPreview, setPassportPreview] = useState(null);
//   const selectedCollege = watch('college');
  
//   const departments = useMemo(() => {
//     return selectedCollege ? collegesAndDepartments[selectedCollege] || [] : [];
//   }, [selectedCollege]);

//   if (!isOpen) return null;

//   const onSubmit = (data) => {
//     onNext(data);
//   };

//   const InputField = ({ name, label, type = 'text', required = false, number }) => (
//     <Controller
//       name={name}
//       control={control}
//       rules={{ required }}
//       render={({ field }) => (
//         <div className={personalStyles.inputGroup}>
//           <input
//             {...field}
//             type={type}
//             id={name}
//             className={personalStyles.input}
//             placeholder=" "
//           />
//           <label
//             htmlFor={name}
//             className={`${personalStyles.label} ${field.value ? personalStyles.labelFocused : ''}`}
//           >
//             {number}. {label} {required && <span className="text-red-500">*</span>}
//           </label>
//         </div>
//       )}
//     />
//   );

//   const DateInputField = ({ name, label, required = false, number }) => (
//     <Controller
//       name={name}
//       control={control}
//       rules={{ required }}
//       render={({ field }) => (
//         <div className={personalStyles.dateInputGroup}>
//           <input
//             {...field}
//             type="date"
//             id={name}
//             className={personalStyles.dateInput}
//           />
//           <label
//             htmlFor={name}
//             className={personalStyles.dateLabel}
//           >
//             {number}. {label} {required && <span className="text-red-500">*</span>}
//           </label>
//         </div>
//       )}
//     />
//   );

//   const RadioGroup = ({ name, label, options, required = false, number }) => (
//     <Controller
//       name={name}
//       control={control}
//       rules={{ required }}
//       render={({ field }) => (
//         <div className={personalStyles.radioGroupContainer}>
//           <label className={personalStyles.radioGroupLabel}>
//             {number}. {label} {required && <span className="text-red-500">*</span>}
//           </label>
//           <div className={personalStyles.radioGroup}>
//             {options.map((option, index) => (
//               <label key={index} className={personalStyles.radioLabel}>
//                 <input
//                   type="radio"
//                   {...field}
//                   value={option}
//                   checked={field.value === option}
//                   className={personalStyles.radioInput}
//                 />
//                 <span className={personalStyles.radioText}>{option}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     />
//   );

//   const Dropdown = ({ name, label, options, required = false, number, onChange }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//       const handleScroll = (e) => {
//         if (isOpen) {
//           e.preventDefault();
//         }
//       };

//       if (isOpen) {
//         document.body.style.overflow = 'hidden';
//         window.addEventListener('scroll', handleScroll, { passive: false });
//       } else {
//         document.body.style.overflow = 'unset';
//         window.removeEventListener('scroll', handleScroll);
//       }

//       return () => {
//         document.body.style.overflow = 'unset';
//         window.removeEventListener('scroll', handleScroll);
//       };
//     }, [isOpen]);

//     return (
//       <Controller
//         name={name}
//         control={control}
//         rules={{ required }}
//         render={({ field }) => (
//           <div className="mb-6 sm:mb-8">
//             <Listbox
//               value={field.value}
//               onChange={(value) => {
//                 field.onChange(value);
//                 if (onChange) onChange(value);
//                 setIsOpen(false);
//               }}
//             >
//               {({ open }) => {
//                 useEffect(() => {
//                   setIsOpen(open);
//                 }, [open]);

//                 return (
//                   <>
//                     <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
//                       {number}. {label} {required && <span className="text-red-500">*</span>}
//                     </Listbox.Label>
//                     <div className="relative mt-1">
//                       <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
//                         <span className={`block truncate font-medium ${field.value ? 'text-black' : ''}`}>
//                           {field.value || `Select ${label.toLowerCase()}`}
//                         </span>
//                         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                           <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                         </span>
//                       </Listbox.Button>

//                       <Transition
//                         show={open}
//                         as={React.Fragment}
//                         leave="transition ease-in duration-100"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                       >
//                         <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                           {options.map((option, optionIdx) => (
//                             <Listbox.Option
//                               key={optionIdx}
//                               className={({ active }) =>
//                                 `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
//                                   cursor-default select-none relative py-2 pl-3 pr-9`
//                               }
//                               value={option}
//                             >
//                               {({ selected, active }) => (
//                                 <>
//                                   <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
//                                     {option}
//                                   </span>
//                                   {selected && (
//                                     <span
//                                       className={`${active ? 'text-white' : 'text-indigo-600'}
//                                         absolute inset-y-0 right-0 flex items-center pr-4`}
//                                     >
//                                       <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                     </span>
//                                   )}
//                                 </>
//                               )}
//                             </Listbox.Option>
//                           ))}
//                         </Listbox.Options>
//                       </Transition>
//                     </div>
//                   </>
//                 );
//               }}
//             </Listbox>
//           </div>
//         )}
//       />
//     );
//   };

//   return (
//     <div className={personalStyles.modalOverlay}>
//       <div className={personalStyles.modalContent}>
//         <button onClick={onClose} className={personalStyles.closeButton}>
//           <X size={20} className="sm:w-6 sm:h-6" />
//         </button>
//         <h2 className={personalStyles.mainHeading}>STUDENT&#39;S REGISTRATION FORM 2024/25 SESSION</h2>
//         <h3 className={personalStyles.subHeading}>Personal Section</h3>
        
//         <form onSubmit={handleSubmit(onSubmit)} className={personalStyles.form}>
//           <InputField name="firstName" label="First Name" required number="1" />
//           <InputField name="surname" label="Surname" required number="2" />
//           <InputField name="middleName" label="Middle Name" required number="3" />

//           <Controller
//             name="passport"
//             control={control}
//             render={({ field }) => (
//               <div className={personalStyles.inputGroup}>
//                 <label className={personalStyles.fileInputLabel}>
//                   4. Upload your passport <span className="text-red-500">*</span>
//                 </label>
//                 <div 
//                   className={personalStyles.passportContainer}
//                   onClick={() => document.getElementById('passportUpload').click()}
//                 >
//                   {passportPreview ? (
//                     <img 
//                       src={passportPreview} 
//                       alt="Passport preview" 
//                       className={personalStyles.passportPreview}
//                     />
//                   ) : (
//                     <div className={personalStyles.dropzone}>
//                       <p className="text-sm sm:text-base">Drag & Drop or Click to Upload</p>
//                     </div>
//                   )}
//                   <input
//                     id="passportUpload"
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       if (file) {
//                         field.onChange(file);
//                         const reader = new FileReader();
//                         reader.onloadend = () => {
//                           setPassportPreview(reader.result);
//                         };
//                         reader.readAsDataURL(file);
//                       }
//                     }}
//                     className={personalStyles.fileInput}
//                   />
//                 </div>
//               </div>
//             )}
//           />

//           <RadioGroup
//             name="sex"
//             label="Sex"
//             options={['Male', 'Female']}
//             required
//             number="5"
//           />

//           <DateInputField name="dob" label="Date of Birth" required number="6" />
//           <InputField name="homeTown" label="Home Town" required number="7" />
//           <InputField name="stateOfOrigin" label="State of Origin" required number="8" />
//           <InputField name="nationality" label="Nationality" required number="9" />
//           <InputField name="phoneNo" label="Phone No" type="tel" required number="10" />
//           <InputField name="whatsappNo" label="WhatsApp Phone No" type="tel" required number="11" />
//           <InputField name="email" label="Email Address" type="email" required number="12" />

//           <Controller
//             name="address"
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <div className={personalStyles.inputGroup}>
//                 <textarea
//                   {...field}
//                   id="address"
//                   className={personalStyles.textarea}
//                   placeholder=" "
//                 ></textarea>
//                 <label
//                   htmlFor="address"
//                   className={`${personalStyles.label} ${field.value ? personalStyles.labelFocused : ''}`}
//                 >
//                   13. Present Home Address <span className="text-red-500">*</span>
//                 </label>
//               </div>
//             )}
//           />

//           <InputField name="hobbies" label="Hobbies" number="14" />

//           <RadioGroup
//             name="level"
//             label="Level"
//             options={['100', '200', '300', '400', '500']}
//             required
//             number="15"
//           />

//           <InputField name="hostel" label="Hostel, Block & Room No" number="16" />
//           <InputField name="matricNo" label="Matric No or Registration Number" number="17" />

//           <Dropdown
//             name="college"
//             label="College"
//             options={Object.keys(collegesAndDepartments)}
//             required
//             number="18"
//             onChange={(value) => {
//               setValue('department', '');
//             }}
//           />

//           <Dropdown
//             name="department"
//             label="Department"
//             options={departments}
//             required
//             number="19"
//           />

//           <div className={personalStyles.navigation}>
//             <button type="button" onClick={onPrevious} className={personalStyles.navButton}>Previous</button>
//             <button type="submit" className={personalStyles.navButton}>Next</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Personal;

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { personalStyles } from './PersonalStyles';

const collegesAndDepartments = {
  'Agriculture and Natural Sciences': [
    'Agricultural Economics',
    'Animal Science',
    'Biochemistry',
    'Computer Science',
    'Crop Science',
    'Food Science and Technology',
    'Hotel Management and Tourism',
    'Industrial Chemistry',
    'Microbiology',
    'Physics Electronics'
  ],
  'Environmental Sciences': [
    'Architecture',
    'Building',
    'Estate Management',
    'Quantity Survey'
  ],
  'Health Sciences': [
    'Medical Laboratory Science',
    'Nursing'
  ],
  'Humanities and Social Sciences': [
    'Economics',
    'English',
    'History and International Studies',
    'International Relations',
    'Mass Communication',
    'Political Science',
    'Public Administration',
    'Philosophy & Religious Studies'
  ],
  'Law': ['Law'],
  'Management Sciences': [
    'Accounting',
    'Business Administration',
    'Entrepreneurship',
    'Human Resource Management and Industrial Relations',
    'Insurance'
  ]
};

const DropdownListbox = ({ isOpen, options, value, onChange, onClose }) => {
  useEffect(() => {
    const handleScroll = (e) => {
      if (isOpen) {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      document.body.style.overflow = 'unset';
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <Transition
      show={isOpen}
      as={React.Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {options.map((option, optionIdx) => (
          <Listbox.Option
            key={optionIdx}
            className={({ active }) =>
              `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                cursor-default select-none relative py-2 pl-3 pr-9`
            }
            value={option}
          >
            {({ selected, active }) => (
              <>
                <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                  {option}
                </span>
                {selected && (
                  <span
                    className={`${active ? 'text-white' : 'text-indigo-600'}
                      absolute inset-y-0 right-0 flex items-center pr-4`}
                  >
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Transition>
  );
};

const Personal = ({ isOpen, onClose, onNext, onPrevious, initialData }) => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: initialData
  });
  const [passportPreview, setPassportPreview] = useState(null);
  const selectedCollege = watch('college');
  
  const departments = useMemo(() => {
    return selectedCollege ? collegesAndDepartments[selectedCollege] || [] : [];
  }, [selectedCollege]);

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

  const Dropdown = ({ name, label, options, required = false, number, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <div className="mb-6 sm:mb-8">
            <Listbox
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                if (onChange) onChange(value);
                setIsOpen(false);
              }}
            >
              <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
                {number}. {label} {required && <span className="text-red-500">*</span>}
              </Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button
                  className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className={`block truncate font-medium ${field.value ? 'text-black' : ''}`}>
                    {field.value || `Select ${label.toLowerCase()}`}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <DropdownListbox
                  isOpen={isOpen}
                  options={options}
                  value={field.value}
                  onChange={field.onChange}
                  onClose={() => setIsOpen(false)}
                />
              </div>
            </Listbox>
          </div>
        )}
      />
    );
  };

  return (
    <div className={personalStyles.modalOverlay}>
      <div className={personalStyles.modalContent}>
        <button onClick={onClose} className={personalStyles.closeButton}>
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        <h2 className={personalStyles.mainHeading}>STUDENT'S REGISTRATION FORM 2024/25 SESSION</h2>
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

          <Dropdown
            name="college"
            label="College"
            options={Object.keys(collegesAndDepartments)}
            required
            number="18"
            onChange={(value) => {
              setValue('department', '');
            }}
          />

          <Dropdown
            name="department"
            label="Department"
            options={departments}
            required
            number="19"
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

export default Personal;