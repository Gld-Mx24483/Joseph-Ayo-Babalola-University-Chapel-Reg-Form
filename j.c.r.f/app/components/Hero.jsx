// // Hero.jsx
// import Image from 'next/image';
// import backgroundImage from '../assets/jabu-auditorium.jpg';
// import { heroStyles } from './HeroStyles';

// const Hero = () => {
//   return (
//     <div className={heroStyles.container}>
//       <div className={heroStyles.backgroundImageContainer}>
//         <Image
//           src={backgroundImage}
//           alt="JABU Auditorium"
//           placeholder="blur"
//           quality={100}
//           fill
//           style={{
//             objectFit: 'cover',
//           }}
//         />
//         <div className={heroStyles.overlay}></div>
//       </div>
//       <div className={heroStyles.content}>
//         <h1 className={heroStyles.title}>JABU CHAPLAINCY UNIT</h1>
//         <div className={heroStyles.separator}></div>
//         <p className={heroStyles.subtitle}>STUDENT&#39;S REGISTRATION FORM 2024/25 SESSION</p>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import Image from 'next/image';
import backgroundImage from '../assets/jabu-auditorium.jpg';
import { heroStyles } from './HeroStyles';

const Hero = () => {
  return (
    <div className={heroStyles.container}>
      <div className={heroStyles.backgroundImageContainer}>
        <Image
          src={backgroundImage}
          alt="JABU Auditorium"
          placeholder="blur"
          quality={100}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
        <div className={heroStyles.overlay}></div>
      </div>
      <div className={heroStyles.content}>
        <h1 className={`${heroStyles.title} ${heroStyles.fadeInUp}`}>
          JABU CHAPLAINCY UNIT
        </h1>
        <div className={`${heroStyles.separator} ${heroStyles.growWidth}`}></div>
        <p className={`${heroStyles.subtitle} ${heroStyles.fadeInUp}`}>
          STUDENT&#39;S REGISTRATION FORM 2024/25 SESSION
        </p>
      </div>
    </div>
  );
};

export default Hero;