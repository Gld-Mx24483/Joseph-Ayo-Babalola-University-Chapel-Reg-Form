// Nav.jsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import JabuLogo from '../assets/jabu-logo.png';
import logoImage from '../assets/logo.png';
import ClientNav from './ClientNav';
import { navStyles } from './NavStyles';

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <div className={navStyles.container}>
        <div className={navStyles.content}>
          <Link href="/" className={navStyles.logoContainer}>
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
          </Link>
          <ClientNav />
        </div>
      </div>
    </nav>
  );
};

export default Nav;

// 'use client';

// import Image from 'next/image';
// import JabuLogo from '../assets/jabu-logo.png';
// import logoImage from '../assets/logo.png';
// import ClientNav from './ClientNav';
// import { navStyles } from './NavStyles';
// import { scrollToTop } from './utils';

// const Nav = () => {
//   return (
//     <nav className={navStyles.nav}>
//       <div className={navStyles.container}>
//         <div className={navStyles.content}>
//           <div className={navStyles.logoContainer}  onClick={scrollToTop}>
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
//           <ClientNav />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav;