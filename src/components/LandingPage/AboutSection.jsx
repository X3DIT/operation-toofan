import styles from '../../pages/LandingPage.module.css'

export default function AboutSection() {
  return (
    <section
      className={styles.aboutSection}
      aria-labelledby="about-heading"
    >
      <div className={styles.aboutInner}>
        <div className={styles.aboutContent}>
          <div className={styles.sectionLabel}>ABOUT THE INITIATIVE</div>
          <h2 id="about-heading" className={styles.sectionTitle}>OPERATION TOOFAN IS CONDUCTED BY PROVIDENCE COLLEGE OF ENGINEERING</h2>
          
          <p className={styles.aboutText}>
            Operation Toofan is a student-led anti-drug awareness initiative conducted by the students of Providence College of Engineering. The platform aims to encourage young people to make informed, healthy choices through awareness, reflection, and personal commitment.
          </p>
          <p className={styles.aboutText}>
            By transforming a simple pledge into an interactive experience, Operation Toofan seeks to build a stronger, drug-free community where every participant becomes an advocate for positive change.
          </p>
          <div className={styles.aboutTags}>
            <span className={styles.pixelTag}>DRUG-FREE KERALA</span>
            <span className={styles.pixelTag}>YOUTH AWARENESS</span>
            <span className={styles.pixelTag}>ACTION</span>
            <a href="https://providence.edu.in/" target="_blank" rel="noopener noreferrer" className={styles.pixelActionBtn}>VIEW COLLEGE →</a>
          </div>
        </div>
        <div
          className={styles.aboutCrest}
        >
          <img src="/assets/logo2.jpg" alt="Providence College of Engineering — The Order" />
        </div>
      </div>
    </section>
  )
}
