import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 40, className, onComplete }) {
  const [displayed, setDisplayed] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text : ''
  })
  const [done, setDone] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      if (onComplete) onComplete()
      return
    }

    let i = 0
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
