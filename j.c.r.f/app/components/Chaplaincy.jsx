import Image from 'next/image';
import GroupImage from '../assets/group.jpg';
import OluwasanmiImage from '../assets/oluwasanmi.jpg';
import { chaplaincyStyles } from './ChaplaincyStyles';

const Chaplaincy = () => {
  return (
    <section className={chaplaincyStyles.section}>
      <div className={chaplaincyStyles.container}>
        <h2 className={chaplaincyStyles.mainHeading}>JABU CHAPLAINCY UNIT</h2>
        <p className={chaplaincyStyles.mainParagraph}>
          The JABU Chaplaincy Unit is a Christian Unit in Joseph Ayo Babalola University (JABU) that offers spiritual guidance and support to students and staff. It is overseen by Pastor J. O. Oluwasanmi, the current University Chaplain. For contact, his phone number is 08032226745.
        </p>
        <div className={chaplaincyStyles.imagesContainer}>
          <div className={chaplaincyStyles.oluwasanmiImageWrapper}>
            <div className={chaplaincyStyles.oluwasanmiImageContainer}>
              <Image
                src={OluwasanmiImage}
                alt="Pastor Johnson Oluwasanmi"
                layout="fill"
                objectFit="cover"
                className={chaplaincyStyles.oluwasanmiImage}
              />
            </div>
            <p className={chaplaincyStyles.imageCaption}>
              Pastor Johnson Oluwasanmi (The University Chaplain, JABU)
            </p>
          </div>
          <div className={chaplaincyStyles.groupImageWrapper}>
            <Image
              src={GroupImage}
              alt="Chaplaincy Group"
              width={500}
              height={300}
              className={chaplaincyStyles.image}
            />
            <p className={chaplaincyStyles.imageCaption}>
              From the left; Pastor I. O. Olutimehin, Pastor (Dr) T. W. Olaosebikan, Pastor (Dr) P. O. Alokan, Pastor (Dr) S. F. Babalola, Pastor J. O. Oluwasanmi (University Chaplain), Pastor (Dr) S. M. O. Awoniyi, Pastor John Babalola, Pastor (Dr) J. A. O Magbagbeola
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chaplaincy;