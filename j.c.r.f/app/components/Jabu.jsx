// Jabu.jsx
import Image from 'next/image';
import JabuHeader from '../assets/JABU-header.png';
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
          <h2 className={jabuStyles.heading}>JOSEPH AYO BABALOLA UNIVERSITY</h2>
          <p className={jabuStyles.content}>
            Joseph Ayo Babalola University (JABU) is a private Christian university located in Ikeji-Arakeji, Osun State, Nigeria. It was established in 2004 by the Christ Apostolic Church Worldwide as a center for knowledge and godly service.
          </p>
          <p className={jabuStyles.content}>
            JABU aims to provide a conducive environment for learning and character development, with a focus on the integration of faith and academic excellence. The university offers a range of undergraduate and postgraduate programs across various disciplines, including Natural Sciences, Social Sciences, Management Sciences, and Humanities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Jabu;