// ClientNav.jsx
'use client';

import { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import { NavLink, navStyles } from './NavStyles';

const ClientNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={navStyles.desktopMenu}>
        <NavLink href="#" text="Home" />
        <NavLink href="#" text="About" />
        <NavLink href="#" text="Contact" />
      </div>
      <HamburgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className={navStyles.mobileMenuContainer}>
          <div className={navStyles.mobileMenu}>
            <NavLink href="#" text="Home" />
            <NavLink href="#" text="About" />
            <NavLink href="#" text="Contact" />
          </div>
        </div>
      )}
    </>
  );
};

export default ClientNav;
