// //Nav.jsx
// import Image from 'next/image';
// import JabuLogo from '../assets/jabu-logo.png';
// import logoImage from '../assets/logo.png';
// import { NavLink, navStyles } from './NavStyles';

// const Nav = () => {
//   return (
//     <nav className={navStyles.nav}>
//       <div className={navStyles.container}>
//         <div className={navStyles.content}>
//           <div className={navStyles.logoContainer}>
//             <Image
//               src={JabuLogo}
//               alt="LABU Logo"
//               width={120} 
//               height={50} 
//               className={navStyles.logo}
//             />
//             <div className={navStyles.separator}></div>
//             <Image
//               src={logoImage}
//               alt="Logo"
//               width={100} 
//               height={50} 
//               className={navStyles.logo}
//             />
//           </div>
//           <div className={navStyles.linkContainer}>
//             <NavLink href="#" text="Home" />
//             <NavLink href="#" text="About" />
//             <NavLink href="#" text="Contact" />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav;

// Nav.jsx
import Image from 'next/image';
import JabuLogo from '../assets/jabu-logo.png';
import logoImage from '../assets/logo.png';
import ClientNav from './ClientNav';
import { navStyles } from './NavStyles';

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <div className={navStyles.container}>
        <div className={navStyles.content}>
          <div className={navStyles.logoContainer}>
            <Image
              src={JabuLogo}
              alt="LABU Logo"
              width={120} 
              height={50} 
              className={navStyles.logo}
            />
            <div className={navStyles.separator}></div>
            <Image
              src={logoImage}
              alt="Logo"
              width={100} 
              height={50} 
              className={navStyles.logo}
            />
          </div>
          <ClientNav />
        </div>
      </div>
    </nav>
  );
};

export default Nav;