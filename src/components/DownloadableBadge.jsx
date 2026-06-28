import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DownloadableBadge.module.css';
import { Icons } from './Icons';

export default function DownloadableBadge({ score, badgeName, badgeIcon, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleLinkedInShare = () => {
    // LinkedIn share URL parameters
    const text = `I just scored ${score}/100 in the Operation Toofan Myth vs Fact game and earned the ${badgeName} badge! Try it out and test your knowledge.`;
    const url = window.location.origin; // Link to the current site (can be adjusted if deployed)
    
    // Fallback share URL format for sharing text on LinkedIn
    const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text + '\n\nPlay here: ' + url)}`;
    
    window.open(linkedInShareUrl, '_blank', 'noopener,noreferrer');
  };

  const modalContent = (
    <AnimatePresence>
      <motion.div
        className={styles.badgeOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.badgeModal}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <Icons.X />
          </button>
          
          <div className={styles.badgePreviewWrapper}>
            <div className={styles.badgePreview}>
              <img src="/badge/badge.png" alt="Operation Toofan Badge" className={styles.badgeImage} />
            </div>
            <div className={styles.badgeTextInfo}>
              <div className={styles.badgeTitle}>{badgeName}</div>
              <div className={styles.badgeScore}>Score: {score}/100</div>
            </div>
          </div>
          
          <div className={styles.actionBtns}>
            <a
              href="/badge/badge.png"
              download="Operation-Toofan-Badge.png"
              className="btn-primary"
            >
              <Icons.Download size={18} />
              DOWNLOAD BADGE
            </a>
            <button
              className="btn-primary"
              onClick={handleLinkedInShare}
            >
              SHARE ON LINKEDIN
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}
