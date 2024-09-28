// //Intro.jsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import ChapelImage from '../assets/chapel.jpg';
import Family from './Family';
import Health from './Health';
import { introStyles } from './IntroStyles';
import Personal from './Personal';
import Spirituality from './Spirituality';

const Intro = () => {
  const [currentSection, setCurrentSection] = useState('closed');

  const handleOpenForm = () => {
    setCurrentSection('personal');
  };

  const handleCloseForm = () => {
    setCurrentSection('closed');
  };

  const handleNextSection = () => {
    if (currentSection === 'personal') {
      setCurrentSection('spirituality');
    } else if (currentSection === 'spirituality') {
      setCurrentSection('family');
    } else if (currentSection === 'family') {
      setCurrentSection('health');
    }
    // Add more sections here as needed
  };

  const handlePreviousSection = () => {
    if (currentSection === 'health') {
      setCurrentSection('family');
    } else if (currentSection === 'family') {
      setCurrentSection('spirituality');
    } else if (currentSection === 'spirituality') {
      setCurrentSection('personal');
    } else if (currentSection === 'personal') {
      setCurrentSection('closed');
    }
  };

  return (
    <section className={introStyles.section}>
      <div className={introStyles.imageContainer}>
        <Image
          src={ChapelImage}
          alt="Chapel"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className={introStyles.overlay}></div>
      </div>
      <div className={introStyles.content}>
        <h2 className={introStyles.heading}>JABU CHAPLAINCY UNIT</h2>
        <p className={introStyles.text}>
          Please fill out the following information. All fields are required unless otherwise specified.
        </p>
        <button className={introStyles.button} onClick={handleOpenForm}>
          Open Form
        </button>
      </div>
      <Personal 
        isOpen={currentSection === 'personal'} 
        onClose={handleCloseForm}
        onNext={handleNextSection}
        onPrevious={handlePreviousSection}
      />
      <Spirituality 
        isOpen={currentSection === 'spirituality'} 
        onClose={handleCloseForm}
        onNext={handleNextSection}
        onPrevious={handlePreviousSection}
      />
      <Family 
        isOpen={currentSection === 'family'} 
        onClose={handleCloseForm}
        onNext={handleNextSection}
        onPrevious={handlePreviousSection}
      />
      <Health 
        isOpen={currentSection === 'health'} 
        onClose={handleCloseForm}
        onNext={handleNextSection}
        onPrevious={handlePreviousSection}
      />
    </section>
  );
};

export default Intro;

//edit