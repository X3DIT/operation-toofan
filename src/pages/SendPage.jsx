import { useState } from 'react'
import styles from './SendPage.module.css'

export default function SendPage() {
  const [inputData, setInputData] = useState('+91 ')
  const [numberList, setNumberList] = useState([])

  const handleParse = (e) => {
    e.preventDefault()
    if (!inputData.trim()) return

    const rawNumbers = inputData.split(/[\n,]+/)
    const parsed = rawNumbers
      .map(num => num.replace(/[^\d+]/g, ''))
      .filter(num => num.length > 5)
      .map(num => ({ value: num, sent: false }))

    setNumberList(parsed)
  }

  const handleSendSingle = (index) => {
    const target = numberList[index]
    const message = encodeURIComponent('JOIN operation toofan by clicking here test.com')
    const waUrl = `https://wa.me/${target.value}?text=${message}`
    
    window.open(waUrl, '_blank')
    
    // Mark as sent
    const updated = [...numberList]
    updated[index].sent = true
    setNumberList(updated)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.icon} aria-hidden="true">✉️</div>
          <h1 className={styles.title}>COMM CENTER</h1>
          <p className={styles.subtitle}>NOT FOR PUBLIC ACCESS</p>
          
          <form onSubmit={handleParse} className={styles.form}>
            <label htmlFor="wa-numbers" className={styles.label}>WHATSAPP NUMBERS (comma or newline separated)</label>
            <textarea
              id="wa-numbers"
              value={inputData}
              onChange={e => setInputData(e.target.value)}
              placeholder="e.g. +91 9876543210&#10;+91 1234567890"
              className={styles.textarea}
              rows={4}
              autoFocus
            />
            
            <button type="submit" className={styles.primaryBtn} disabled={!inputData.trim()}>
              LOAD NUMBERS ▸
            </button>
          </form>

          {numberList.length > 0 && (
            <div className={styles.listContainer}>
              <h3 className={styles.listTitle}>Queue ({numberList.length})</h3>
              <ul className={styles.numberList}>
                {numberList.map((num, idx) => (
                  <li key={idx} className={styles.listItem}>
                    <span className={num.sent ? styles.numSent : styles.numPending}>
                      {num.value}
                    </span>
                    <button 
                      onClick={() => handleSendSingle(idx)}
                      className={num.sent ? styles.secondaryBtn : styles.actionBtn}
                    >
                      {num.sent ? 'RESEND' : 'SEND ▸'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
