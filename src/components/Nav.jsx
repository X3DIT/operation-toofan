import styles from './Nav.module.css'
import { motion } from 'framer-motion'

export default function Nav({ page, navigate }) {
  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      transformTemplate={(_, generated) => `${generated} translateZ(0)`}
      className={styles.nav}
    >
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={styles.logo} 
        onClick={() => navigate('landing')}
      >
        <img src="/assests/logo.png" alt="Operation Toofan" className={styles.logoImage} />
        <span className={styles.logoText}>Operation Toofan</span>
      </motion.button>
      <div className={styles.links}>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`${styles.link} ${page === 'community' ? styles.active : ''}`}
          onClick={() => navigate('community')}
        >
          Community
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.cta}
          onClick={() => navigate('game')}
        >
          Take the pledge
        </motion.button>
      </div>
    </motion.nav>
  )
}
