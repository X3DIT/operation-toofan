import { useState, useEffect } from 'react'
import styles from './HUD.module.css'

function useAnimatedCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setCount(target)
      return
    }

    const startTime = performance.now()
    let rafId

    function update(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(update)
      }
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration])

  return count
}

export default function HUD() {
  const pledgeCount = useAnimatedCounter(1247, 2000)

  return (
    <div className={styles.hud} aria-label="Live status panel">
      <div className={styles.hudLabel}>// LIVE STATUS</div>
      <div className={styles.hudStat}>
        PLEDGES TAKEN: <span className={styles.hudValue}>{pledgeCount.toLocaleString()}</span>
      </div>
      <div className={styles.hudStat}>
        COMMUNITY: <span className={styles.online}>● ONLINE</span>
      </div>
      <div className={styles.hudStat}>
        YOUR STATUS: <span className={styles.hudValue}>RECRUIT</span>
      </div>
    </div>
  )
}
