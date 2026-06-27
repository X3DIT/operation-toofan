import { useState, useEffect } from 'react';

export function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text : ''
  })
  const [done, setDone] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return;
    }

    let i = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed('');
    setDone(false);
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}
