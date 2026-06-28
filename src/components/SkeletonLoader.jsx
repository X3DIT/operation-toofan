import React from 'react';
import styles from './SkeletonLoader.module.css';

export default function SkeletonLoader({ type = 'page', count = 3 }) {
  if (type === 'cards') {
    return (
      <div className={styles.cardsGrid}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={styles.cardSkeleton}>
            <div className={styles.cardTop}>
              <div className={styles.avatar} />
              <div className={styles.cardMeta}>
                <div className={styles.lineShort} />
                <div className={styles.lineMini} />
              </div>
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.linePill} />
              <div className={styles.linePill} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'certificate') {
    return (
      <div className={styles.certSkeletonWrapper}>
        <div className={`${styles.line} ${styles.headline}`} style={{ width: '300px' }} />
        <div className={styles.certSkeleton} />
        <div className={styles.buttonGroup}>
          <div className={styles.button} />
          <div className={styles.button} />
        </div>
      </div>
    );
  }

  if (type === 'hero') {
    return (
      <div className={styles.heroSkeleton}>
        <div className={styles.heroContent}>
          <div className={`${styles.line} ${styles.eyebrow}`} />
          <div className={`${styles.line} ${styles.headline}`} />
          <div className={`${styles.line} ${styles.headline}`} />
          <div className={`${styles.line} ${styles.headline} ${styles.headlineShort}`} />
          <div className={`${styles.line} ${styles.subtitle}`} />
          <div className={styles.buttonGroup}>
            <div className={styles.button} />
            <div className={styles.button} />
          </div>
        </div>
        <div className={styles.heroArtSkeleton} />
      </div>
    );
  }

  // Default 'page' skeleton
  return (
    <div className={styles.pageSkeleton}>
      <div className={`${styles.line} ${styles.title}`} />
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={`${styles.line} ${styles.short}`} />
    </div>
  );
}
