import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './CertificatePage.module.css'
import { generateCertificatePDF } from '../utils/generatePDF'
import CertificateTemplate from '../components/CertificateTemplate'
import html2canvas from 'html2canvas'

export default function CertificatePage({ data, navigate }) {
  const certRef = useRef(null)
  const [downloading, setDownloading] = useState(false)
  const [sharing, setSharing] = useState(false)

  if (!data) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <p>No pledge data found.</p>
        <button onClick={() => navigate('game')} style={{ marginTop: '1rem', padding: '10px 24px', background: 'var(--green-600)', color: '#fff', borderRadius: 'var(--radius-pill)' }}>
          Take the pledge
        </button>
      </div>
    )
  }

  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setScale(entry.contentRect.width / 1290);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const element = certRef.current
      if (!element) throw new Error('Certificate element not found')
      await generateCertificatePDF(data, element)
    } catch (e) {
      console.error('PDF generation failed:', e)
    }
    setDownloading(false)
  }

  const handleShare = async () => {
    const text = `Today, I pledged to stay drug-free through Operation Toofan.

A single pledge may seem small, but thousands of pledges can create a powerful movement. Join me and take the Drug-Free Pledge:

Take the Pledge Now : https://operation-toofan-jet.vercel.app/`;
    
    setSharing(true);
    try {
      const element = certRef.current;
      if (!element) throw new Error('Certificate element not found');

      // Generate canvas from certificate
      const canvas = await html2canvas(element, { scale: 2 });
      
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'certificate.png', { type: 'image/png' });

        // Try using native share with file (works on modern mobile browsers)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'My drug-free pledge',
              text: text,
              files: [file]
            });
            setSharing(false);
            return; // Successfully shared
          } catch (shareError) {
            console.log('Error sharing via navigator.share:', shareError);
          }
        }

        // Fallback: Download the image and open WhatsApp
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);

        // Open WhatsApp with text
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        setSharing(false);
      }, 'image/png');

    } catch (e) {
      console.error('Error generating image for share:', e);
      // Fallback to text-only share if image generation fails
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      setSharing(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className="bg-grid-fade" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.inner}
      >
        <div className={styles.header}>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={styles.congrats}
          >
            <span className={styles.confetti} aria-hidden="true">✦</span>
            Pledge complete
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.title}
          >
            Your certificate is ready
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            You earned {data.xp} XP · {data.score}/5 questions correct{data.perfect ? ' · Perfect score ✦' : ''}
          </motion.p>
        </div>

        {/* ── Certificate preview (scaled to fit) ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.2 }}
          ref={containerRef} style={{ 
          width: '100%', 
          aspectRatio: '1290 / 950', 
          marginBottom: '2rem', 
          overflow: 'hidden', 
          borderRadius: 'var(--radius)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ 
            width: '1290px', 
            height: '950px', 
            transform: `scale(${scale})`, 
            transformOrigin: 'top left' 
          }}>
            <CertificateTemplate ref={certRef} data={data} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={styles.actions}
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.primaryBtn} 
            onClick={handleDownload} 
            disabled={downloading}
          >
            {downloading ? 'Generating PDF…' : '⬇ Download certificate'}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.secondaryBtn} 
            onClick={handleShare} 
            disabled={sharing}
          >
            {sharing ? 'Preparing share…' : '⬆ Share my pledge'}
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={styles.next}
        >
          <button className={styles.ghostLink} onClick={() => navigate('community')}>
            See the community wall →
          </button>
          <button className={styles.ghostLink} onClick={() => navigate('game')}>
            Restart quest
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={styles.resources}
        >
          <div className={styles.resourcesTitle}>Helpful resources</div>
          <div className={styles.resourceGrid}>
            <motion.a 
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              href="https://www.samhsa.gov/find-help/national-helpline" 
              target="_blank" 
              rel="noopener" 
              className={styles.resourceCard}
            >
              <div className={styles.resourceIcon}>◉</div>
              <div>
                <div className={styles.resourceName}>SAMHSA Helpline</div>
                <div className={styles.resourceDesc}>Free, confidential, 24/7 treatment referral</div>
              </div>
            </motion.a>
            <motion.a 
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              href="https://www.nida.nih.gov" 
              target="_blank" 
              rel="noopener" 
              className={styles.resourceCard}
            >
              <div className={styles.resourceIcon}>◎</div>
              <div>
                <div className={styles.resourceName}>NIDA</div>
                <div className={styles.resourceDesc}>Science-based drug information</div>
              </div>
            </motion.a>
            <motion.a 
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
              href="https://www.drugfree.org" 
              target="_blank" 
              rel="noopener" 
              className={styles.resourceCard}
            >
              <div className={styles.resourceIcon}>◈</div>
              <div>
                <div className={styles.resourceName}>Partnership to End Addiction</div>
                <div className={styles.resourceDesc}>Support for families</div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
