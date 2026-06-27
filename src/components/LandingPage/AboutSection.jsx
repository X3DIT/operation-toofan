import { motion } from 'framer-motion'
import styles from '../../pages/LandingPage.module.css'

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
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
            <span className={styles.pixelTag}>STATE COLLEGE -</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.aboutCrest}
        >
          <img src="/assets/logo2.jpg" alt="Providence College of Engineering — The Order" />
        </motion.div>
      </div>
    </motion.section>
  )
}
