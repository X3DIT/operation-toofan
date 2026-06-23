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
          <div className={styles.fill} style={{ width: pct + '%' }} />
        </div>
        <span className={styles.count}>{xp} / {maxXp}</span>
      </div>
    </div>
  )
}
