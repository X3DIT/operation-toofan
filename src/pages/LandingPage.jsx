import { useEffect, useRef, useState } from 'react'
import styles from './LandingPage.module.css'


const STEPS = [
  { icon: '◎', title: 'Answer 3 questions', body: 'Short knowledge checks on peer pressure and drug risks. No wrong answers - just honest thinking.' },
  { icon: '◈', title: 'Shape your pledge', body: 'Pick the values that matter to you - family, health, dreams. Your pledge builds itself from your choices.' },
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
            One pledge.<br/>
            <em>Your whole future.</em>
          </h1>
          <p className={styles.sub}>
            A 5-minute interactive journey that turns a decision into a certificate. Not a checkbox - a quest.
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
          <img src="/assests/cert.jpg" alt="Certificate preview" className={styles.certImage} />
        </div>
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
          <p>Enroll a whole classroom, get co-branded certificates, and download a completion report - all free.</p>
          <button className={styles.outlineBtn}>Contact us →</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.logoText}>
          <img src="/assests/logo.png" alt="Operation Toofan" style={{height: '20px', width: 'auto', marginRight: '8px', verticalAlign: 'middle'}} />
          Operation Toofan
        </span>
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
