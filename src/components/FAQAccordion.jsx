import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FAQAccordion.module.css'

const FAQS = [
  {
    question: "Is it free?",
    answer: "Yes, taking the Operation Toofan pledge is completely free for everyone."
  },
  {
    question: "Do I need an account?",
    answer: "No account is required. You just answer a few questions, pick your values, and receive your certificate instantly."
  },
  {
    question: "Can my school use this?",
    answer: "Absolutely! Schools and organizations can run group pledge campaigns. Contact us for co-branded certificates and completion reports."
  },
  {
    question: "What happens after I pledge?",
    answer: "After pledging, you'll receive a personalized certificate to verify your commitment. You can also share it to inspire others to join the movement."
  },
  {
    question: "Who is organizing this?",
    answer: "Operation Toofan is a student-led anti-drug awareness initiative conducted by Providence College of Engineering."
  }
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className={styles.faqContainer}>
      <div className={styles.sectionLabel}>FAQ</div>
      <h2 className={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</h2>
      <div className={styles.accordion}>
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <motion.span
                  className={styles.icon}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, type: "tween", ease: (v) => Math.floor(v * 4) / 4 }}
                >
                  ▶
                </motion.span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, type: "tween", ease: (v) => Math.floor(v * 5) / 5 }}
                    className={styles.answerWrapper}
                  >
                    <div className={styles.answer}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
