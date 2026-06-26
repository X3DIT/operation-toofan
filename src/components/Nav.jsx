import styles from './Nav.module.css'
import { motion } from 'framer-motion'

export default function Nav({ page, navigate }) {
  return (
    <nav className={styles.nav}>
      {/* Scanline overlay */}
      <div className={styles.scanline} aria-hidden="true" />

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={styles.logo}
        onClick={() => navigate('landing')}
      >
        {/* Glowing shield icon */}
        <svg className={styles.shieldIcon} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span className={styles.logoText}>OPERATION TOOFAN</span>
      </motion.button>

      <div className={styles.links}>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`${styles.link} ${page === 'community' ? styles.active : ''}`}
          onClick={() => navigate('community')}
        >
          [COMMUNITY WALL]
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.cta}
          onClick={() => navigate('game')}
        >
          [TAKE THE OATH]
        </motion.button>
      </div>
    </nav>
  )
}
