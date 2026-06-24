import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CertificateDrawAnimation
 *
 * Renders an ANIMATED PREVIEW of the certificate where a cursor "draws" each
 * element into existence one-by-one. Completely decoupled from certRef – the
 * real CertificateTemplate used for PDF/PNG export is untouched.
 */

// Load Google Fonts (same as CertificateTemplate)
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Poppins:wght@400;500;600&family=Pinyon+Script&display=swap';
let fontsLoaded = false;
function ensureFonts() {
  if (fontsLoaded) return;
  if (!document.querySelector(`link[href="${FONT_URL}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_URL;
    document.head.appendChild(link);
  }
  fontsLoaded = true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Step definitions ─────────────────────────────────────────────────────────
function buildSteps(data) {
  return [
    { id: 'circle',       cursor: { x: 285, y: 455 }, delay: 300,  duration: 400, type: 'fade' },
    { id: 'bg',           cursor: { x: 800, y: 430 }, delay: 200,  duration: 700, type: 'draw' },
    { id: 'heading',      cursor: { x: 96,  y: 100 }, delay: 150,  duration: 600, type: 'typewriter', text: 'CERTIFICATE' },
    { id: 'sub',          cursor: { x: 96,  y: 248 }, delay: 100,  duration: 400, type: 'typewriter', text: 'OF PLEDGE' },
    { id: 'date',         cursor: { x: 1100, y: 100 }, delay: 100, duration: 300, type: 'fade' },
    { id: 'given',        cursor: { x: 96,  y: 373 }, delay: 100,  duration: 350, type: 'typewriter', text: 'This is to certify that:' },
    { id: 'name',         cursor: { x: 96,  y: 440 }, delay: 120,  duration: 700, type: 'typewriter', text: (data?.name || 'JHOSUA STEVEN').toUpperCase() },
    { id: 'award',        cursor: { x: 96,  y: 513 }, delay: 100,  duration: 450, type: 'typewriter', text: 'Operation Toofan Drug-Free Pledge' },
    { id: 'quote',        cursor: { x: 96,  y: 570 }, delay: 100,  duration: 600, type: 'fade' },
    { id: 'auth',         cursor: { x: 96,  y: 673 }, delay: 80,   duration: 250, type: 'typewriter', text: 'Authorized by:' },
    { id: 'sig1',         cursor: { x: 200, y: 770 }, delay: 150,  duration: 400, type: 'slide-up' },
    { id: 'sig2',         cursor: { x: 490, y: 770 }, delay: 150,  duration: 400, type: 'slide-up' },
    { id: 'burst',        cursor: { x: 1050, y: 400 }, delay: 200, duration: 500, type: 'pop' },
    { id: 'mainLogo',     cursor: { x: 1150, y: 760 }, delay: 150, duration: 350, type: 'fade' },
    { id: 'providenceLogo', cursor: { x: 1150, y: 840 }, delay: 100, duration: 350, type: 'fade' },
  ];
}

// ─── Reveal variants ──────────────────────────────────────────────────────────
function getRevealVariant(type) {
  switch (type) {
    case 'slide-up':
      return {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
      };
    case 'pop':
      return {
        hidden: { opacity: 0, scale: 0.55 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 22 } },
      };
    case 'fade':
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
      };
  }
}

// ─── SVG paths (mesh lines) ───────────────────────────────────────────────────
const PATHS = [
  'M290 330 C520 200 680 610 1290 430',
  'M290 340 C520 210 680 620 1290 440',
  'M290 350 C520 220 680 630 1290 450',
  'M290 360 C520 230 680 640 1290 460',
  'M290 370 C520 240 680 650 1290 470',
  'M290 380 C520 250 680 660 1290 480',
  'M290 390 C520 260 680 670 1290 490',
  'M290 400 C520 270 680 680 1290 500',
  'M290 410 C520 280 680 690 1290 510',
  'M290 420 C520 290 680 700 1290 520',
  'M290 430 C520 300 680 710 1290 530',
  'M290 440 C520 310 680 720 1290 540',
  'M290 450 C520 320 680 730 1290 550',
];

function AnimatedSVGBg({ visible, duration }) {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 1290 950">
      <g stroke="#d7d7d7" fill="none" opacity=".85">
        {PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={visible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{
              pathLength: {
                duration: duration / 1000,
                delay: (i * duration) / (PATHS.length * 1000 * 1.2),
                ease: 'easeInOut',
              },
              opacity: { duration: 0.1 },
            }}
          />
        ))}
      </g>
    </svg>
  );
}

// ─── Typewriter component ─────────────────────────────────────────────────────
function TypewriterText({ text, duration, style }) {
  const [displayed, setDisplayed] = useState('');
  const idxRef = useRef(0);

  useEffect(() => {
    idxRef.current = 0;
    setDisplayed('');
    const interval = duration / Math.max(text.length, 1);
    const timer = setInterval(() => {
      idxRef.current += 1;
      setDisplayed(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [text, duration]);

  const done = displayed.length >= text.length;

  return (
    <span style={style}>
      {displayed}
      <motion.span
        animate={{ opacity: done ? 0 : [1, 0, 1] }}
        transition={done ? { duration: 0.3 } : { repeat: Infinity, duration: 0.7 }}
        style={{
          display: 'inline-block',
          width: 2,
          height: '0.9em',
          background: '#3B6D11',
          marginLeft: 2,
          verticalAlign: 'text-bottom',
        }}
      />
    </span>
  );
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function Cursor({ x, y, clicking }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 20,
      }}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, mass: 0.7 }}
    >
      <motion.svg
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="none"
        animate={clicking ? { scale: 0.8 } : { scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {/* Drop shadow path */}
        <path
          d="M3 3L3 22L8 16L13 25L16 23L11 14L19 13L3 3Z"
          fill="rgba(0,0,0,0.15)"
          transform="translate(2,2)"
        />
        {/* White cursor */}
        <path
          d="M3 3L3 22L8 16L13 25L16 23L11 14L19 13L3 3Z"
          fill="white"
          stroke="#111"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Click ripple */}
      <AnimatePresence>
        {clicking && (
          <motion.div
            key="ripple"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(59,109,17,0.3)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function CertificateDrawAnimation({ data, onComplete }) {
  useEffect(() => { ensureFonts(); }, []);

  const steps = buildSteps(data);
  const [revealed, setRevealed] = useState(new Set());
  const [clicking, setClicking] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -80, y: -80 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      await sleep(700); // initial pause

      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return;
        const step = steps[i];

        // Move cursor to element position
        setCursorPos({ x: step.cursor.x, y: step.cursor.y });

        // Wait for spring animation to settle
        await sleep(380);

        // Click
        setClicking(true);
        await sleep(180);
        setClicking(false);

        // Reveal element
        setRevealed(prev => new Set([...prev, step.id]));

        // Wait for reveal + content duration
        await sleep(step.delay + step.duration);
      }

      if (!cancelled) {
        setCursorPos({ x: 1450, y: -150 });
        await sleep(700);
        if (!cancelled) {
          setDone(true);
          onComplete?.();
        }
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  const vis = (id) => revealed.has(id);

  const variantOf = (id) => {
    const step = steps.find(s => s.id === id);
    return getRevealVariant(step?.type || 'fade');
  };

  const step = (id) => steps.find(s => s.id === id);

  // ── Inline styles mirroring CertificateTemplate.module.css ──────────────────
  const S = {
    cert: {
      position: 'relative', width: 1290, height: 950,
      background: '#f5f5f3', overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
    },
    circle: {
      position: 'absolute', width: 360, height: 360, borderRadius: '50%',
      left: 105, top: 275, background: 'rgba(255,255,255,0.55)',
    },
    heading: {
      position: 'absolute', left: 95, top: 55,
      fontFamily: "'Oswald', sans-serif", fontWeight: 700,
      fontSize: 155, lineHeight: 1, letterSpacing: -2, color: '#2d2d32',
      pointerEvents: 'none', userSelect: 'none',
    },
    sub: {
      position: 'absolute', left: 96, top: 235,
      display: 'flex', alignItems: 'center',
      fontFamily: "'Oswald', sans-serif", fontSize: 42,
      letterSpacing: 4, color: '#5a5a61',
      pointerEvents: 'none', userSelect: 'none',
    },
    dot: {
      width: 10, height: 10, borderRadius: '50%',
      background: '#3B6D11', marginLeft: 12, flexShrink: 0,
    },
    date: {
      position: 'absolute', top: 92, right: 90,
      fontSize: 18, fontWeight: 500, color: '#505057',
    },
    given: {
      position: 'absolute', left: 96, top: 365,
      fontSize: 18, color: '#76767d',
      pointerEvents: 'none', userSelect: 'none',
    },
    name: {
      position: 'absolute', left: 96, top: 405,
      fontFamily: "'Oswald', sans-serif", fontSize: 68,
      fontWeight: 700, color: '#2d2d32',
      pointerEvents: 'none', userSelect: 'none',
    },
    award: {
      position: 'absolute', left: 96, top: 505,
      fontSize: 22, fontWeight: 600, color: '#38383d',
      pointerEvents: 'none', userSelect: 'none',
    },
    quote: {
      position: 'absolute', left: 96, top: 548,
      maxWidth: 550, fontSize: 15, lineHeight: 1.6, color: '#88888e',
    },
    auth: {
      position: 'absolute', left: 96, top: 665,
      fontSize: 16, color: '#88888e',
      pointerEvents: 'none', userSelect: 'none',
    },
    sig: { position: 'absolute', top: 715 },
    sig1: { left: 96 },
    sig2: { left: 385 },
    script: { fontFamily: "'Pinyon Script', cursive", fontSize: 64, color: '#45454b' },
    line: { width: 250, borderBottom: '1px solid #c8c8c8', marginTop: 5, marginBottom: 10 },
    role: { fontSize: 16, fontWeight: 600, color: '#3d3d42' },
    person: { fontSize: 14, color: '#929299', marginTop: 4 },
    burst: { position: 'absolute', right: 75, top: 190, height: 400, width: 'auto' },
    mainLogo: { position: 'absolute', right: 99, bottom: 145, height: 60, width: 'auto' },
    providenceLogo: { position: 'absolute', right: 90, bottom: 75, height: 60, width: 'auto' },
  };

  return (
    <div style={{ position: 'relative', width: 1290, height: 950 }}>
      <div style={S.cert}>

        {/* Soft left circle */}
        <motion.div
          style={S.circle}
          variants={variantOf('circle')}
          initial="hidden"
          animate={vis('circle') ? 'visible' : 'hidden'}
        />

        {/* SVG mesh lines – draw-in animation */}
        {vis('bg') && (
          <AnimatedSVGBg visible duration={step('bg').duration} />
        )}

        {/* CERTIFICATE – typewriter */}
        <div style={S.heading}>
          {vis('heading') && (
            <TypewriterText text={step('heading').text} duration={step('heading').duration} />
          )}
        </div>

        {/* OF PLEDGE – typewriter */}
        <div style={S.sub}>
          {vis('sub') && (
            <>
              <TypewriterText text={step('sub').text} duration={step('sub').duration} />
              <span style={S.dot} />
            </>
          )}
        </div>

        {/* Date */}
        <motion.div
          style={S.date}
          variants={variantOf('date')}
          initial="hidden"
          animate={vis('date') ? 'visible' : 'hidden'}
        >
          {data?.date || 'November 12 | 2024'}
        </motion.div>

        {/* This is to certify that: */}
        <div style={S.given}>
          {vis('given') && (
            <TypewriterText text={step('given').text} duration={step('given').duration} />
          )}
        </div>

        {/* Recipient name */}
        <div style={S.name}>
          {vis('name') && (
            <TypewriterText text={step('name').text} duration={step('name').duration} />
          )}
        </div>

        {/* Award */}
        <div style={S.award}>
          {vis('award') && (
            <TypewriterText text={step('award').text} duration={step('award').duration} />
          )}
        </div>

        {/* Quote */}
        <motion.div
          style={S.quote}
          variants={variantOf('quote')}
          initial="hidden"
          animate={vis('quote') ? 'visible' : 'hidden'}
        >
          "{data?.pledgeText || 'like these sweet mornings of spring which I enjoy with my whole heart'}"
          {data?.values && data.values.length > 0 && (
            <div style={{ marginTop: 10, fontWeight: 'bold' }}>
              Values: {data.values.map(v => v.label).join(', ')}
            </div>
          )}
        </motion.div>

        {/* Authorized by */}
        <div style={S.auth}>
          {vis('auth') && (
            <TypewriterText text={step('auth').text} duration={step('auth').duration} />
          )}
        </div>

        {/* Signature 1 */}
        <motion.div
          style={{ ...S.sig, ...S.sig1 }}
          variants={variantOf('sig1')}
          initial="hidden"
          animate={vis('sig1') ? 'visible' : 'hidden'}
        >
          <div style={S.script}>nil</div>
          <div style={S.line} />
          <div style={S.role}>Campaign Initiative</div>
          <div style={S.person}>Operation Toofan</div>
        </motion.div>

        {/* Signature 2 */}
        <motion.div
          style={{ ...S.sig, ...S.sig2 }}
          variants={variantOf('sig2')}
          initial="hidden"
          animate={vis('sig2') ? 'visible' : 'hidden'}
        >
          <div style={S.script}>nil</div>
          <div style={S.line} />
          <div style={S.role}>Official Record</div>
          <div style={S.person}>ID: {data?.id || '---'}</div>
        </motion.div>

        {/* Burst */}
        <motion.img
          src="/assests/1element.png"
          alt=""
          style={S.burst}
          variants={variantOf('burst')}
          initial="hidden"
          animate={vis('burst') ? 'visible' : 'hidden'}
        />

        {/* Main Logo */}
        <motion.img
          src="/assests/logo.png"
          alt=""
          style={S.mainLogo}
          variants={variantOf('mainLogo')}
          initial="hidden"
          animate={vis('mainLogo') ? 'visible' : 'hidden'}
        />

        {/* Providence Logo */}
        <motion.img
          src="/assests/providence.png"
          alt=""
          style={S.providenceLogo}
          variants={variantOf('providenceLogo')}
          initial="hidden"
          animate={vis('providenceLogo') ? 'visible' : 'hidden'}
        />
      </div>

      {/* Cursor overlay – hidden once done */}
      {!done && (
        <Cursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />
      )}
    </div>
  );
}
