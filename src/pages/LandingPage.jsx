import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  const { displayed: heroText, done: heroDone } = useTypewriter('THE STORM IS RISING.', 70)
  const [challenger, setChallenger] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setChallenger(ref);
    }
  }, []);

  const handleAcceptChallenge = () => {
    setChallenger(null);
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <main className={styles.main}>
      <div className="bg-grid-fade" />

      {/* ══════════════════════════════════════════════
          CHALLENGE POPUP
          ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {challenger && (
          <motion.div 
            className={styles.popupOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.popupContent}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
            >
              <button 
                className={styles.closeBtn} 
                onClick={handleAcceptChallenge}
                aria-label="Close"
              >
                X
              </button>
              
              <div className={styles.popupTitle}>
                {challenger} challenged you to<br />
                <span>take the pledge</span> 🌿
              </div>
              
              <p className={styles.popupSubtitle}>
                They just completed the Operation Toofan drug-free quest and think you should too.
              </p>

              <button 
                className="btn-primary" 
                onClick={handleAcceptChallenge}
              >
                TAKE THE PLEDGE <span className="btnSymbol">▶</span>
              </button>
              
              <div className={styles.popupFooterText}>
                It only takes 5 minutes
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <HeroSection />

      <WhyItMatters />

      <AboutSection />

      <QuestChainSection />

      {/* ══════════════════════════════════════════════
          SECTION 4: DRUG DETECTIVE MISSION
          ══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
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
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={styles.codexSection}
        aria-label="Frequently Asked Questions"
      >
        <FAQAccordion />
      </motion.section>

      {/* ══════════════════════════════════════════════
          SECTION 7: ALLIANCE PROTOCOL (For Orgs)
          ══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
