import { useNavigate } from 'react-router-dom'

import styles from './LandingPage.module.css'
import FAQAccordion from '../components/FAQAccordion'
import MythVsFact from '../components/MythVsFact'
import WhyItMatters from '../components/WhyItMatters'
import { useTypewriter } from '../hooks/useTypewriter'
import HeroSection from '../components/LandingPage/HeroSection'
import AboutSection from '../components/LandingPage/AboutSection'
import QuestChainSection from '../components/LandingPage/QuestChainSection'

export default function LandingPage() {
  const navigate = useNavigate();
  useTypewriter('THE STORM IS RISING.', 70)
  return (
    <main className={styles.main}>
      <div className="bg-grid-fade" />



      <HeroSection />

      <WhyItMatters />

      {/* ══════════════════════════════════════════════
          SECTION 3: DRUG DETECTIVE MISSION
          ══════════════════════════════════════════════ */}
      <section
        className={styles.missionSection}
        aria-labelledby="mission-heading"
      >
        <div className={styles.missionInner}>
          <div className={styles.sectionLabelCenter}>TEST YOUR KNOWLEDGE</div>
          <h2 id="mission-heading" className={`${styles.sectionTitleCenter} ${styles.missionTitle}`}>MYTH VS FACT CHALLENGE</h2>
          <MythVsFact navigate={navigate} />
        </div>
      </section>

      <AboutSection />

      <QuestChainSection />


      {/* ══════════════════════════════════════════════
          SECTION 5: QUOTE — RPG DIALOGUE BOX
          ══════════════════════════════════════════════ */}
      <section
        className={styles.quoteSection}
        aria-label="Student quote"
      >
        <div className={styles.dialogueBox}>
          <div className={styles.dialogueContent}>
            <blockquote className={styles.dialogueQuote}>
              "The pledge isn't a promise to the world.<br />
              <br />
              It's a promise to yourself.<br />
              <span className={styles.dialogueCursor}>*</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6: THE CODEX (FAQ)
          ══════════════════════════════════════════════ */}
      <section
        className={styles.codexSection}
        aria-label="Frequently Asked Questions"
      >
        <FAQAccordion />
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7: ALLIANCE PROTOCOL (For Orgs)
          ══════════════════════════════════════════════ */}
      <section
        className={styles.allianceSection}
        aria-labelledby="alliance-heading"
      >
        <div className={styles.allianceInner}>
          <div className={styles.allianceCard}>
            <div className={styles.sectionLabel}>ALLIANCE PROTOCOL</div>
            <h2 id="alliance-heading" className={styles.allianceTitle}>Run a Group Pledge Campaign</h2>
            <p>Enroll a whole classroom, get co-branded scrolls, and download a completion report — all free.</p>
            <button
              className="btn-primary"
            >
              Contact Us →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <img src="/assets/toofan-logo white.png" alt="Operation Toofan" className={styles.footerLogo} />
        </div>
        <div className={styles.footerRight}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy') }}>Privacy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/about') }}>About</a>
        </div>
      </footer>
    </main>
  )
}
