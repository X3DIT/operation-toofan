import styles from './Nav.module.css'

export default function Nav({ page, navigate }) {
  return (
    <nav className={styles.nav}>
      <button className={styles.logo} onClick={() => navigate('landing')}>
        <span className={styles.logoMark}>✦</span>
        <span className={styles.logoText}>Operation Toofan</span>
      </button>
      <div className={styles.links}>
        <button
          className={`${styles.link} ${page === 'community' ? styles.active : ''}`}
          onClick={() => navigate('community')}
        >
          Community
        </button>
        <button
          className={styles.cta}
          onClick={() => navigate('game')}
        >
          Take the pledge
        </button>
      </div>
    </nav>
  )
}
