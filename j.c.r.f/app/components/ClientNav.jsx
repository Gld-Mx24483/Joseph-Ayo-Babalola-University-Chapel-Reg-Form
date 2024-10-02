//ClientNav.jsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import { NavLink, navStyles } from './NavStyles';

const ClientNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToSection = (sectionId) => {
    if (pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        const navHeight = 72;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (pathname === '/') {
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
    }
  }, [pathname]);

  useEffect(() => {
    // Handle initial navigation with hash
    if (pathname === '/' && window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      navigateToSection(sectionId);
    }
  }, [pathname]);

  return (
    <>
      <div className={navStyles.desktopMenu}>
        <NavLink
          href="/#home"
          text="Home"
          onClick={(e) => {
            e.preventDefault();
            navigateToSection('home');
          }}
          isActive={activeSection === 'home'}
        />
        <NavLink
          href="/#about"
          text="About Us"
          onClick={(e) => {
            e.preventDefault();
            navigateToSection('about');
          }}
          isActive={activeSection === 'about'}
        />
        <NavLink
          href="/#contact"
          text="Form"
          onClick={(e) => {
            e.preventDefault();
            navigateToSection('contact');
          }}
          isActive={activeSection === 'contact'}
        />
      </div>
      <HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className={navStyles.mobileMenuContainer}>
          <div className={navStyles.mobileMenu}>
            <NavLink
              href="/#home"
              text="Home"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('home');
              }}
              isActive={activeSection === 'home'}
            />
            <NavLink
              href="/#about"
              text="About Us"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('about');
              }}
              isActive={activeSection === 'about'}
            />
            <NavLink
              href="/#contact"
              text="Form"
              onClick={(e) => {
                e.preventDefault();
                navigateToSection('contact');
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