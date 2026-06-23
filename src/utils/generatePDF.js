/**
 * Dynamically loads a script from a CDN URL.
 * Returns a promise that resolves when the script is loaded.
 */
function loadScript(src, globalCheck) {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (globalCheck && window[globalCheck]) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(script);

    // Timeout after 10 seconds
    setTimeout(() => reject(new Error(`Timeout loading: ${src}`)), 10000);
  });
}

/**
 * Generates a certificate PDF using html2canvas + jsPDF (loaded from CDN).
 *
 * @param {object} data - The pledge data (name, date, pledgeText, etc.)
 * @param {HTMLElement} element - The DOM element to capture
 */
export async function generateCertificatePDF(data, element) {
  try {
    // ── Step 1: Load libraries from CDN ──
    await Promise.all([
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
        'html2canvas'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js',
        'jspdf'
      ),
    ]);
  } catch (err) {
    console.error('CDN load failed:', err);
    alert('Could not load PDF libraries. Please check your internet connection and try again.');
    return;
  }

  const html2canvas = window.html2canvas;
  const { jsPDF } = window.jspdf;

  if (!html2canvas || !jsPDF) {
    alert('PDF libraries did not initialize properly. Please refresh and try again.');
    return;
  }

  try {
    // ── Step 2: Capture the certificate DOM element as a canvas ──
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: '#f5f5f3',
      logging: false,
      allowTaint: true,
      removeContainer: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // ── Step 3: Create PDF ──
    // Certificate is 1290×950 px — landscape orientation
    const pdfWidth = 297;  // A4 landscape width in mm
    const pdfHeight = (canvas.height / canvas.width) * pdfWidth;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
    });

    doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // ── Step 4: Download ──
    const fileName = `Operation-Toofan-Pledge-${(data.name || 'Certificate').replace(/\s+/g, '-')}.pdf`;
    doc.save(fileName);
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Failed to generate PDF. Please try again.');
  }
}
