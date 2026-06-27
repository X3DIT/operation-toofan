import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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

      <AboutSection />

      <QuestChainSection />

      {/* ══════════════════════════════════════════════
          SECTION 4: DRUG DETECTIVE MISSION
          ══════════════════════════════════════════════ */}
      <motion.section
        className={styles.missionSection}
        aria-labelledby="mission-heading"
      >
        <div className={styles.missionInner}>
          <div className={styles.sectionLabelCenter}>TEST YOUR KNOWLEDGE</div>
          <h2 id="mission-heading" className={`${styles.sectionTitleCenter} ${styles.missionTitle}`}>MYTH VS FACT CHALLENGE</h2>
          <MythVsFact navigate={navigate} />
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════
          SECTION 5: QUOTE — RPG DIALOGUE BOX
          ══════════════════════════════════════════════ */}
      <motion.section
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
      </motion.section>

      {/* ══════════════════════════════════════════════
          SECTION 6: THE CODEX (FAQ)
          ══════════════════════════════════════════════ */}
      <motion.section
        className={styles.codexSection}
        aria-label="Frequently Asked Questions"
      >
        <FAQAccordion />
      </motion.section>

      {/* ══════════════════════════════════════════════
          SECTION 7: ALLIANCE PROTOCOL (For Orgs)
          ══════════════════════════════════════════════ */}
      <motion.section
        className={styles.allianceSection}
        aria-labelledby="alliance-heading"
      >
        <div className={styles.allianceInner}>
          <div className={styles.allianceCard}>
            <div className={styles.sectionLabel}>ALLIANCE PROTOCOL</div>
            <h2 id="alliance-heading" className={styles.allianceTitle}>Run a Group Pledge Campaign</h2>
            <p>Enroll a whole classroom, get co-branded scrolls, and download a completion report — all free.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Contact Us →
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <svg className={styles.footerShield} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span className={styles.footerBrand}>OPERATION TOOFAN</span>
        </div>
        <div className={styles.footerRight}>
          <span className={styles.serverStatus}>
            <span className={styles.statusDot} />
            SERVER ONLINE
          </span>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/privacy') }}>Privacy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/about') }}>About</a>
        </div>
      </footer>
    </main>
  )
}
