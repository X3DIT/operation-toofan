import React, { forwardRef, useEffect } from 'react';
import styles from './CertificateTemplate.module.css';

// Load Google Fonts via link tag in document head (only once)
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

const CertificateTemplate = forwardRef(({ data }, ref) => {
  useEffect(() => { ensureFonts(); }, []);

  return (
    <div className={styles.cert} ref={ref}>

      <div className={styles.circle}></div>

      {/* MESH BACKGROUND */}
      <svg className={styles.bg} viewBox="0 0 1290 950">
        <g stroke="#d7d7d7" fill="none" opacity=".85">
          <path d="M290 330 C520 200 680 610 1290 430"/>
          <path d="M290 340 C520 210 680 620 1290 440"/>
          <path d="M290 350 C520 220 680 630 1290 450"/>
          <path d="M290 360 C520 230 680 640 1290 460"/>
          <path d="M290 370 C520 240 680 650 1290 470"/>
          <path d="M290 380 C520 250 680 660 1290 480"/>
          <path d="M290 390 C520 260 680 670 1290 490"/>
          <path d="M290 400 C520 270 680 680 1290 500"/>
          <path d="M290 410 C520 280 680 690 1290 510"/>
          <path d="M290 420 C520 290 680 700 1290 520"/>
          <path d="M290 430 C520 300 680 710 1290 530"/>
          <path d="M290 440 C520 310 680 720 1290 540"/>
          <path d="M290 450 C520 320 680 730 1290 550"/>
        </g>
      </svg>

      <div className={styles.heading}>CERTIFICATE</div>

      <div className={styles.sub}>
        OF PLEDGE
        <span className={styles.dot}></span>
      </div>

      <div className={styles.date}>{data?.date || 'November 12 | 2024'}</div>

      <div className={styles.given}>
        This is to certify that:
      </div>

      <div className={styles.name}>
        {data?.name?.toUpperCase() || 'JHOSUA STEVEN'}
      </div>

      <div className={styles.award}>
        Operation Toofan Drug-Free Pledge
      </div>

      <div className={styles.quote}>
        "{data?.pledgeText || 'like these sweet mornings of spring which I enjoy with my whole heart'}"
        {data?.values && data.values.length > 0 && (
           <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
             Values: {data.values.map(v => v.label).join(', ')}
           </div>
        )}
      </div>

      <div className={styles.auth}>
        Authorized by:
      </div>

      <div className={`${styles.sig} ${styles.sig1}`}>
        <div className={styles.script}>Santosh</div>
        <div className={styles.line}></div>
        <div className={styles.role}>Campaign Initiative</div>
        <div className={styles.person}>Operation Toofan</div>
      </div>

      <div className={`${styles.sig} ${styles.sig2}`}>
        <div className={styles.script}>Madhav</div>
        <div className={styles.line}></div>
        <div className={styles.role}>Official Record</div>
        <div className={styles.person}>ID: {data?.id || '---'}</div>
      </div>

      {/* BURST REPLACEMENT */}
      <img src="/assests/1element.png" alt="Element" className={styles.burst} width="220" />


      {/* MAIN LOGO */}
      <img src="/assests/logo.png" alt="Main Logo" className={styles.mainLogo} />

      {/* PROVIDENCE LOGO */}
      <img src="/assests/providence.png" alt="Providence Logo" className={styles.providenceLogo} />

    </div>
  );
});

export default CertificateTemplate;
