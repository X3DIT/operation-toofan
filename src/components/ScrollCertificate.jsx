import React, { useRef } from 'react'
import html2canvas from 'html2canvas'

export default function ScrollCertificate({ pledgerName, rollNumber, date }) {
  const certRef = useRef(null)

  const downloadScroll = async () => {
    if (!certRef.current) return
    const canvas = await html2canvas(certRef.current, {
      scale: 2,         // High-DPI for crisp Instagram Story
      backgroundColor: '#0a0a1a',
      width: 1080,
      height: 1920,
      useCORS: true,
    })
    const link = document.createElement('a')
    link.download = `toofan-scroll-${pledgerName.replace(/\\s+/g, '-').toLowerCase()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div>
      {/* Certificate visible on screen at 50% scale, actual size 1080×1920 for Stories */}
      <div
        ref={certRef}
        aria-label={`Drug-free pledge certificate for ${pledgerName}`}
        style={{
          width: 540, height: 960,      /* display at 50% of 1080×1920 */
          background: '#0a0a1a',
          border: '2px solid #f0b429',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 32px',
          textAlign: 'center',
          color: '#e0e0e0',
          fontFamily: 'serif',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>⚡</div>
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#f0b429', marginBottom: '8px', textTransform: 'uppercase' }}>
          Legendary Scroll of The Order
        </div>
        <h2 style={{ fontSize: '22px', color: '#f0f0f0', margin: '0 0 8px', fontWeight: 700 }}>
          {pledgerName}
        </h2>
        {rollNumber && (
          <div style={{ fontSize: '12px', color: '#808090', marginBottom: '20px' }}>
            Roll No: {rollNumber}
          </div>
        )}
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#c0c0d0', maxWidth: '320px', marginBottom: '24px' }}>
          has taken the sacred oath against the shadow and joined The Order of Operation Toofan, pledging to live drug-free.
        </p>
        <div style={{ borderTop: '1px solid rgba(240,180,41,0.3)', width: '80%', paddingTop: '20px', fontSize: '12px', color: '#606070' }}>
          <div>{date}</div>
          <div style={{ marginTop: '8px', color: '#f0b429', fontWeight: 600 }}>
            Operation Toofan · PCE Kerala
          </div>
        </div>
      </div>

      <button
        onClick={downloadScroll}
        aria-label="Download your legendary scroll as an image"
        style={{
          marginTop: '20px',
          background: '#f0b429',
          color: '#0a0a1a',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 28px',
          fontWeight: 700,
          fontSize: '15px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Download Your Scroll (Share on Instagram)
      </button>
    </div>
  )
}
