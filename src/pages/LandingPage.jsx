import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
      <div className="bg-grid-fade" />
      <div className={styles.heroWrapper}>
        <div className={`${styles.blobBg} shape-blob`} aria-hidden="true" />
        <div className={`${styles.blobBg2} shape-blob`} aria-hidden="true" style={{ animationDelay: '-4s', background: 'linear-gradient(135deg, var(--purple-200), var(--coral-200))' }} />
        <section className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`${styles.heroInner} ${visible ? styles.heroVisible : ''}`}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={styles.eyebrow}
          >
            <span className={styles.dot} />
            Your commitment, made real
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={styles.headline}
          >
            One pledge.<br/>
            <motion.em
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >Your whole future.</motion.em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className={styles.sub}
          >
            A 5-minute interactive journey that turns a decision into a certificate. Not a checkbox - a quest.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className={styles.heroCtas}
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.primaryBtn} 
              onClick={() => navigate('game')}
            >
              Start your pledge quest →
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ghostBtn} 
              onClick={() => navigate('community')}
            >
              See the community wall
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          className={styles.heroArt} 
          aria-hidden="true"
        >
          <motion.img 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            src="/assests/cert.jpg" 
            alt="Certificate preview" 
            className={styles.certImage} 
          />
        </motion.div>
      </section>
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={styles.aboutInitiative}
      >
        <div className={styles.aboutInner}>
          <div className={styles.aboutContent}>
            <div className={styles.sectionLabel}>About the Initiative</div>
            <h2 className={styles.sectionTitle}>
              Operation Toofan is conducted by<br/>Providence College of Engineering
            </h2>
            <p className={styles.aboutText}>
              Operation Toofan is a student-led anti-drug awareness initiative conducted by Providence College of Engineering. The platform aims to encourage young people to make informed, healthy choices through awareness, reflection, and personal commitment.
            </p>
            <p className={styles.aboutText}>
              By transforming a simple pledge into an interactive experience, Operation Toofan seeks to build a stronger, drug-free community where every participant becomes an advocate for positive change.
            </p>
            <div className={styles.aboutTags}>
              <motion.span whileHover={{ scale: 1.1 }}>Drug-Free Kerala</motion.span>
              <span className={styles.tagDot}>•</span>
              <motion.span whileHover={{ scale: 1.1 }}>Youth Awareness</motion.span>
              <span className={styles.tagDot}>•</span>
              <motion.span whileHover={{ scale: 1.1 }}>Action</motion.span>
            </div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://providence.edu.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.glassBtn}
            >
              Visit College →
            </motion.a>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.aboutLogo}
          >
            <img src="/assests/logo2.jpg" alt="Providence College of Engineering" />
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={styles.howItWorks}
      >
        <div className={styles.sectionLabel}>How it works</div>
        <h2 className={styles.sectionTitle}>Three stages to your certificate</h2>
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className={styles.step}
            >
              <div className={styles.stepIcon}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </motion.div>
          ))}
        </div>
        <div className={styles.stepsCta}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.primaryBtn} 
            onClick={() => navigate('game')}
          >
            Begin quest →
          </motion.button>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={styles.pledge}
      >
        <blockquote className={styles.pullQuote}>
          "The pledge isn't a promise to the world.<br />
          <em>It's a promise to yourself.</em>"
        </blockquote>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`${styles.forOrgs} bg-dot`}
      >
        <div className={styles.forOrgsInner}>
          <div className={styles.orgCard}>
        
          <div className={styles.sectionLabel}>For schools &amp; organisations</div>
          <h2 style={{fontSize:'1.6rem'}}>Run a group pledge campaign</h2>
          <p>Enroll a whole classroom, get co-branded certificates, and download a completion report - all free.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.outlineBtn}
          >
            Contact us →
          </motion.button>
        </div>
        </div>
      </motion.section>

      <footer className={styles.footer}>
        <span className={styles.logoText}>
          <img src="/assests/logo.png" alt="Operation Toofan" style={{height: '20px', width: 'auto', marginRight: '8px', verticalAlign: 'middle'}} />
          Operation Toofan
        </span>
        <span style={{color:'var(--text-hint)', fontSize:'13px'}}>A drug-free pledge platform · Free forever</span>
        <div style={{display:'flex', gap:'16px'}}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('privacy') }}>Privacy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('about') }}>About</a>
        </div>
      </footer>
    </main>
  )
}
