// ClientNav.jsx
'use client';
import { useEffect, useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import { NavLink, navStyles } from './NavStyles';

const ClientNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = ['home', 'about', 'contact'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={navStyles.desktopMenu}>
        <NavLink
          href="#home"
          text="Home"
          onClick={() => scrollToSection('home')}
          isActive={activeSection === 'home'}
        />
        <NavLink
          href="#about"
          text="About Us"
          onClick={() => scrollToSection('about')}
          isActive={activeSection === 'about'}
        />
        <NavLink
          href="#contact"
          text="Form"
          onClick={() => scrollToSection('contact')}
          isActive={activeSection === 'contact'}
        />
      </div>
      <HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className={navStyles.mobileMenuContainer}>
          <div className={navStyles.mobileMenu}>
            <NavLink
              href="#home"
              text="Home"
              onClick={() => scrollToSection('home')}
              isActive={activeSection === 'home'}
            />
            <NavLink
              href="#about"
              text="About Us"
              onClick={() => scrollToSection('about')}
              isActive={activeSection === 'about'}
            />
            <NavLink
              href="#contact"
              text="Form"
              onClick={() => scrollToSection('contact')}
              isActive={activeSection === 'contact'}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ClientNav;

// import { useState } from 'react';
// import HamburgerMenu from './HamburgerMenu';
// import { NavLink, navStyles } from './NavStyles';

// const ClientNav = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <>
//       <div className={navStyles.desktopMenu}>
//         <NavLink href="#" text="Home" />
//         <NavLink href="#" text="About Us" />
//         <NavLink href="#" text="Contact" />
//       </div>
//       <HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
//       {isMenuOpen && (
//         <div className={navStyles.mobileMenuContainer}>
//           <div className={navStyles.mobileMenu}>
//             <NavLink href="#" text="Home" />
//             <NavLink href="#" text="About Us" />
//             <NavLink href="#" text="Contact" />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ClientNav;
