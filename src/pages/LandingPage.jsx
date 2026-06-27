import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './LandingPage.module.css'
import FAQAccordion from '../components/FAQAccordion'
import MythVsFact from '../components/MythVsFact'
import WhyItMatters from '../components/WhyItMatters'

/* ── Quest Chain Data ── */
const QUESTS = [
  {
    num: '01',
    name: 'PREPARE & UNDERSTAND',
    body: 'A 5 minute guided session to test your knowledge regarding choices and their consequences in the real world.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
  },
  {
    num: '02',
    name: 'SHAPE YOUR PLEDGE',
    body: 'Reflect on what matters to you - family, health, dreams. Your pledge will build itself from your choices.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    num: '03',
    name: 'EARN YOUR CERTIFICATE',
    body: 'Receive a personalized, verifiable certificate of your pledge. Download, share, and inspire others.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
      </svg>
    ),
    isLegendary: true,
  },
]

/* ── Typewriter Hook ── */
function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      return
    }

    let i = 0
    setDisplayed('')
    setDone(false)
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, done }
}

export default function LandingPage({ navigate }) {
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

      {/* ══════════════════════════════════════════════
          SECTION 1: HERO
          ══════════════════════════════════════════════ */}
      <div className={styles.heroWrapper}>
        <div className={styles.parallaxBg}>
          <video 
            src="/assests/Elements/0pixelated%20video%20bg.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className={`${styles.bgVideo} ${styles.desktopVideo}`} 
          />
          <video 
            src="/assests/Elements/0pixelated%20video%20bg%20mob.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className={`${styles.bgVideo} ${styles.mobileVideo}`} 
          />
        </div>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.eyebrowWrapper}>
                <div className={styles.eyebrow}>
                  YOUR COMMITMENT, MADE REAL
                </div>
              </div>

              <h1 className={styles.headline}>
                PLEDGE FOR A<br />
                DRUG-FREE<br />
                <span>FUTURE.</span>
              </h1>

              <motion.p
                className={styles.sub}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Take a 5-minute interactive quest to build your pledge and earn a verifiable certificate.
              </motion.p>

              <motion.div
                className={styles.heroCtas}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  onClick={() => navigate('game')}
                >
                  START YOUR PLEDGE QUEST <span className="btnSymbol">▶</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost"
                  onClick={() => navigate('community')}
                >
                  SEE THE COMMUNITY WALL
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Certificate Preview Card */}
          <motion.div
            className={styles.heroArt}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.certificatePreview}>
              <img src="/assests/cert.png" alt="Certificate Preview" className={styles.certImg} />
            </div>
          </motion.div>
        </section>
      </div>

      <WhyItMatters />

      {/* ══════════════════════════════════════════════
          SECTION 2: ABOUT THE ORDER
          ══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={styles.aboutSection}
        aria-labelledby="about-heading"
      >
        <div className={styles.aboutInner}>
          <div className={styles.aboutContent}>
            <div className={styles.sectionLabel}>ABOUT THE INITIATIVE</div>
            <h2 id="about-heading" className={styles.sectionTitle}>OPERATION TOOFAN IS CONDUCTED BY PROVIDENCE COLLEGE OF ENGINEERING</h2>
            
            <p className={styles.aboutText}>
              Operation Toofan is a student-led anti-drug awareness initiative conducted by the students of Providence College of Engineering. The platform aims to encourage young people to make informed, healthy choices through awareness, reflection, and personal commitment.
            </p>
            <p className={styles.aboutText}>
              By transforming a simple pledge into an interactive experience, Operation Toofan seeks to build a stronger, drug-free community where every participant becomes an advocate for positive change.
            </p>
            <div className={styles.aboutTags}>
              <span className={styles.pixelTag}>DRUG-FREE KERALA</span>
              <span className={styles.pixelTag}>YOUTH AWARENESS</span>
              <span className={styles.pixelTag}>ACTION</span>
              <span className={styles.pixelTag}>STATE COLLEGE -</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.aboutCrest}
          >
            <img src="/assests/logo2.jpg" alt="Providence College of Engineering — The Order" />
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════
          SECTION 3: QUEST CHAIN
          ══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={styles.questSection}
        aria-labelledby="quest-heading"
      >
        <div className={styles.sectionLabelCenter}>HOW IT WORKS</div>
        <h2 id="quest-heading" className={styles.sectionTitleCenter}>THREE STAGES TO YOUR CERTIFICATE</h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`${styles.certificatePreview} ${styles.mobileOnlyCert}`}
        >
          <img src="/assests/cert.png" alt="Certificate Preview" className={styles.certImg} />
        </motion.div>

        <div className={styles.questChain}>
          {QUESTS.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`${styles.questNode} ${q.isLegendary ? styles.questLegendary : ''}`}
            >
              <div className={styles.questIcon}>{q.icon}</div>
              <div className={styles.questNum}>{q.num}</div>
              <h3 className={styles.questName}>{q.name}</h3>
              <p className={styles.questBody}>{q.body}</p>
              {/* Connector line (not on last) */}
              {i < QUESTS.length - 1 && <div className={styles.questConnector} />}
            </motion.div>
          ))}
        </div>

        <div className={styles.questCta}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            onClick={() => navigate('game')}
          >
            <span className="btnSymbol">▶</span> BEGIN QUEST
          </motion.button>
        </div>
      </motion.section>

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
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('privacy') }}>Privacy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('about') }}>About</a>
        </div>
      </footer>
    </main>
  )
}
