import { jsPDF } from 'jspdf'

export async function generateCertificatePDF(data) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const W = 297, H = 210

  doc.setFillColor(248, 247, 244)
  doc.rect(0, 0, W, H, 'F')

  doc.setDrawColor(59, 109, 17)
  doc.setLineWidth(0.4)
  doc.rect(10, 10, W - 20, H - 20, 'S')
  doc.setLineWidth(0.15)
  doc.rect(13, 13, W - 26, H - 26, 'S')

  doc.setFillColor(234, 243, 222)
  doc.rect(10, 10, W - 20, 38, 'F')

  doc.setDrawColor(59, 109, 17)
  doc.setLineWidth(0.3)
  doc.line(10, 48, W - 10, 48)

  doc.setFontSize(11)
  doc.setTextColor(99, 153, 34)
  doc.setFont('helvetica', 'normal')
  doc.text('✦  STAYFREE', W / 2, 22, { align: 'center' })

  doc.setFontSize(9)
  doc.setTextColor(136, 135, 128)
  doc.text('CERTIFICATE OF PLEDGE', W / 2, 30, { align: 'center' })
  doc.text('Drug-free commitment programme', W / 2, 37, { align: 'center' })

  doc.setFontSize(9)
  doc.setTextColor(136, 135, 128)
  doc.text('THIS CERTIFIES THAT', W / 2, 62, { align: 'center' })

  doc.setFontSize(36)
  doc.setTextColor(26, 26, 24)
  doc.setFont('times', 'italic')
  doc.text(data.name, W / 2, 82, { align: 'center' })

  doc.setFontSize(9)
  doc.setTextColor(136, 135, 128)
  doc.setFont('helvetica', 'normal')
  doc.text(`on ${data.date}, made the following pledge:`, W / 2, 92, { align: 'center' })

  doc.setDrawColor(151, 196, 89)
  doc.setLineWidth(0.5)
  doc.line(30, 98, 30, 128)

  doc.setFontSize(11)
  doc.setTextColor(39, 80, 10)
  doc.setFont('times', 'italic')
  const pledgeLines = doc.splitTextToSize(`"${data.pledgeText}"`, W - 80)
  doc.text(pledgeLines, 38, 105)

  if (data.values && data.values.length > 0) {
    let vx = W / 2 - ((data.values.length * 34) / 2)
    data.values.forEach(v => {
      doc.setFillColor(234, 243, 222)
      doc.setDrawColor(99, 153, 34)
      doc.setLineWidth(0.2)
      doc.roundedRect(vx, 134, 32, 8, 4, 4, 'FD')
      doc.setFontSize(7)
      doc.setTextColor(39, 80, 10)
      doc.setFont('helvetica', 'bold')
      doc.text(v.label, vx + 16, 139.5, { align: 'center' })
      vx += 36
    })
  }

  if (data.perfect) {
    doc.setFillColor(250, 238, 218)
    doc.setDrawColor(186, 117, 23)
    doc.setLineWidth(0.2)
    doc.roundedRect(W / 2 - 18, 146, 36, 8, 4, 4, 'FD')
    doc.setFontSize(7)
    doc.setTextColor(101, 56, 6)
    doc.setFont('helvetica', 'bold')
    doc.text('✦ Perfect score', W / 2, 151.5, { align: 'center' })
  }

  doc.setDrawColor(200, 200, 190)
  doc.setLineWidth(0.2)
  doc.line(10, H - 25, W - 10, H - 25)

  doc.setFontSize(7)
  doc.setTextColor(136, 135, 128)
  doc.setFont('helvetica', 'normal')
  doc.text(`Pledge ID: ${data.id}`, 20, H - 17)
  doc.text('Verify at stayfree.app/verify', W / 2, H - 17, { align: 'center' })
  doc.text('stayfree.app', W - 20, H - 17, { align: 'right' })

  doc.setFontSize(20)
  doc.setTextColor(59, 109, 17)
  doc.text('✦', 25, H - 37)
  doc.text('✦', W - 20, H - 37)

  doc.save(`StayFree-Pledge-${data.name.replace(/\s+/g, '-')}.pdf`)
}
