//ClientNav.jsx
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
      const navHeight = 72; // Adjust this value based on your nav height
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
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
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          isActive={activeSection === 'home'}
        />
        <NavLink
          href="#about"
          text="About Us"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('about');
          }}
          isActive={activeSection === 'about'}
        />
        <NavLink
          href="#contact"
          text="Form"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}
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
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              isActive={activeSection === 'home'}
            />
            <NavLink
              href="#about"
              text="About Us"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              isActive={activeSection === 'about'}
            />
            <NavLink
              href="#contact"
              text="Form"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              isActive={activeSection === 'contact'}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ClientNav;