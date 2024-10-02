// Jabu.jsx
import Image from 'next/image';
import JabuHeader from '../assets/Jabu-auditorium.jpg';
import { jabuStyles } from './JabuStyles';

const Jabu = () => {
  return (
    <section className={jabuStyles.section}>
      <div className={jabuStyles.container}>
      <div className={jabuStyles.imageContainer}>
          <Image
            src={JabuHeader}
            alt="JABU Header"
            layout="responsive"
            width={500}
            height={300}
            className={jabuStyles.image}
          />
        </div>
        <div className={jabuStyles.contentContainer}>
          <h3 className={jabuStyles.heading}>JABU CHAPLE</h3>
          <p className={jabuStyles.content}>
          
          </p>
        </div>
      </div>
    </section>
  );
};

export default Jabu;