import { useEffect, useRef, useState } from 'react'
import styles from './LandingPage.module.css'

const STATS = [
  { value: '2.8M+', label: 'pledges taken worldwide' },
  { value: '94%', label: 'felt more accountable' },
  { value: '180+', label: 'schools enrolled' },
]

const STEPS = [
  { icon: '◎', title: 'Answer 3 questions', body: 'Short knowledge checks on peer pressure and drug risks. No wrong answers — just honest thinking.' },
  { icon: '◈', title: 'Shape your pledge', body: 'Pick the values that matter to you — family, health, dreams. Your pledge builds itself from your choices.' },
  { icon: '◉', title: 'Earn your certificate', body: 'A personalized PDF with your name, pledge text, and a unique ID you can verify, share, or print.' },
]

export default function LandingPage({ navigate }) {
  const heroRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} ${visible ? styles.heroVisible : ''}`}>
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            Your commitment, made real
          </div>
          <h1 className={styles.headline}>
            One pledge.<br />
            <em>Your whole future.</em>
          </h1>
          <p className={styles.sub}>
            A 5-minute interactive journey that turns a decision into a certificate. Not a checkbox — a quest.
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.primaryBtn} onClick={() => navigate('game')}>
              Start your pledge quest →
            </button>
            <button className={styles.ghostBtn} onClick={() => navigate('community')}>
              See the community wall
            </button>
          </div>
        </div>

        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.certPreview}>
            <div className={styles.certMark}>✦</div>
            <div className={styles.certTitle}>Certificate of pledge</div>
            <div className={styles.certName}>Priya Sharma</div>
            <div className={styles.certDate}>June 23, 2026</div>
            <div className={styles.certText}>
              I pledge to stay drug-free. I choose this for my health, my family, and my dreams — because my life is worth protecting.
            </div>
            <div className={styles.certBadges}>
              <span className={styles.certBadge}>✦ My health</span>
              <span className={styles.certBadge}>✦ My family</span>
              <span className={styles.certBadge}>✦ My dreams</span>
            </div>
            <div className={styles.certId}>PLG-X7K2M4-2026</div>
          </div>
        </div>
      </section>

      <section className={styles.statsRow}>
        {STATS.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.sectionLabel}>How it works</div>
        <h2 className={styles.sectionTitle}>Three stages to your certificate</h2>
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepIcon}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className={styles.stepsCta}>
          <button className={styles.primaryBtn} onClick={() => navigate('game')}>
            Begin quest →
          </button>
        </div>
      </section>

      <section className={styles.pledge}>
        <blockquote className={styles.pullQuote}>
          "The pledge isn't a promise to the world.<br />
          <em>It's a promise to yourself.</em>"
        </blockquote>
      </section>

      <section className={styles.forOrgs}>
        <div className={styles.orgCard}>
          <div className={styles.sectionLabel}>For schools &amp; organisations</div>
          <h2 style={{fontSize:'1.6rem'}}>Run a group pledge campaign</h2>
          <p>Enroll a whole classroom, get co-branded certificates, and download a completion report — all free.</p>
          <button className={styles.outlineBtn}>Contact us →</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.logoText}>✦ StayFree</span>
        <span style={{color:'var(--text-hint)', fontSize:'13px'}}>A drug-free pledge platform · Free forever</span>
        <div style={{display:'flex', gap:'16px'}}>
          <a href="#">Privacy</a>
          <a href="#">About</a>
          <a href="#">Resources</a>
        </div>
      </footer>
    </main>
  )
}
