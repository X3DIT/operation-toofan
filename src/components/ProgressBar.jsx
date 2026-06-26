import { motion } from 'framer-motion'
import styles from './ProgressBar.module.css'

export default function ProgressBar({ stage, total = 5, xp, maxXp = 5 }) {
  const pct = Math.round((xp / maxXp) * 100)
  return (
    <div className={styles.wrap}>
      <div className={styles.stages}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i < stage ? styles.done : ''} ${i === stage - 1 ? styles.current : ''}`}
          />
        ))}
      </div>
      <div className={styles.xpRow}>
        <span className={styles.label}>XP</span>
        <div className={styles.track}>
          <motion.div 
            className={styles.fill} 
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          >
            <motion.div 
              key={xp}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.flash}
            />
          </motion.div>
        </div>
        <span className={styles.count}>{xp} / {maxXp}</span>
      </div>
    </div>
  )
}
