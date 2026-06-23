import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates a certificate PDF using html2canvas + jsPDF.
 *
 * @param {object} data - The pledge data (name, date, pledgeText, etc.)
 * @param {HTMLElement} element - The DOM element to capture
 */
export async function generateCertificatePDF(data, element) {

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
    // Certificate is 1290×950 px - landscape orientation
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
