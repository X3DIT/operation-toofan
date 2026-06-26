import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 40, className, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayed(text)
      setDone(true)
      if (onComplete) onComplete()
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
        if (onComplete) onComplete()
      }
    }, speed)
    
    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <span className={className}>
      {displayed}
      {!done && <span style={{ opacity: 0.5, animation: 'blink 1s step-end infinite' }}>_</span>}
    </span>
  )
}
