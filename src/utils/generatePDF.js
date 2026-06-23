import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Convert an image URL (including SVG) to a base64 PNG data URL.
 * html2canvas cannot render external SVG files in <img> tags,
 * so we draw them onto a temporary canvas first.
 */
function imgToDataURL(src, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const cvs = document.createElement('canvas');
      cvs.width = width || img.naturalWidth || 300;
      cvs.height = height || img.naturalHeight || 300;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
      resolve(cvs.toDataURL('image/png'));
    };
    img.onerror = () => {
      console.warn('Failed to convert image:', src);
      resolve(src); // fall back to original src
    };
    img.src = src;
  });
}

/**
 * Replace all <img> src in a cloned DOM element with inline base64 data URLs.
 * This ensures html2canvas can render every image, including SVGs.
 */
async function inlineAllImages(container) {
  const imgs = container.querySelectorAll('img');
  await Promise.all(
    Array.from(imgs).map(async (img) => {
      try {
        const dataUrl = await imgToDataURL(
          img.src,
          img.naturalWidth || img.width || 300,
          img.naturalHeight || img.height || 300
        );
        img.src = dataUrl;
      } catch (e) {
        console.warn('Could not inline image', img.src, e);
      }
    })
  );
}

/**
 * Generates a canvas from the certificate element.
 */
export async function generateCertificateCanvas(element) {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const clone = element.cloneNode(true);
  const offscreen = document.createElement('div');
  offscreen.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: 1290px;
    height: 950px;
    overflow: hidden;
    z-index: -1;
    pointer-events: none;
  `;
  offscreen.appendChild(clone);
  document.body.appendChild(offscreen);

  await inlineAllImages(clone);
  await new Promise(resolve => setTimeout(resolve, 200));

  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#f5f5f3',
    logging: false,
    allowTaint: true,
    width: 1290,
    height: 950,
  });

  document.body.removeChild(offscreen);
  return canvas;
}

/**
 * Generates a certificate PDF using html2canvas + jsPDF.
 *
 * The certificate is displayed scaled-down in the browser via CSS transform.
 * html2canvas doesn't handle transform: scale() well, causing overlapping text.
 * Fix: clone the element into a full-size off-screen container before capture.
 *
 * @param {object} data - The pledge data (name, date, pledgeText, etc.)
 * @param {HTMLElement} element - The DOM element to capture (the .cert div)
 */
export async function generateCertificatePDF(data, element) {
  try {
    const canvas = await generateCertificateCanvas(element);

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // ── Step 5: Create PDF ──
    // Certificate is 1290×950 px — landscape orientation
    const pdfWidth = 297;  // A4 landscape width in mm
    const pdfHeight = (canvas.height / canvas.width) * pdfWidth;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
    });

    doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // ── Step 6: Download ──
    const fileName = `Operation-Toofan-Pledge-${(data.name || 'Certificate').replace(/\s+/g, '-')}.pdf`;
    doc.save(fileName);
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Failed to generate PDF. Please try again.');
  }
}
