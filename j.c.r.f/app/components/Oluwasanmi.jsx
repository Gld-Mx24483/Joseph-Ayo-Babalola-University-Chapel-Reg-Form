// Oluwasanmi.jsx
import Image from 'next/image';
import OluwasanmiImage from '../assets/oluwasanmi.jpg';
import { oluwasanmiStyles } from './OluwasanmiStyles';

const Oluwasanmi = () => {
  return (
    <section className={oluwasanmiStyles.section}>
      <div className={oluwasanmiStyles.container}>
        <div className={oluwasanmiStyles.imageContainer}>
          <Image
            src={OluwasanmiImage}
            alt="Pastor Johnson Oluwasanmi"
            layout="responsive"
            width={400}
            height={400}
            className={oluwasanmiStyles.image}
          />
        </div>
        <div className={oluwasanmiStyles.contentContainer}>
          <h2 className={oluwasanmiStyles.heading}>Pastor Johnson Oluwasanmi</h2>
          <p className={oluwasanmiStyles.subheading}>The University Chaplain, JABU</p>
        </div>
      </div>
    </section>
  );
};

export default Oluwasanmi;
