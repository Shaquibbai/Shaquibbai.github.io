import { jsPDF } from 'jspdf';
import { RESUME_DATA } from '../data/resumeData';

/**
 * Generates an authentic text-based, recruiter-ready A4 PDF résumé
 * with selectable text and clickable hyperlinks.
 *
 * Uses the exact same single source of truth (RESUME_DATA) as the web résumé view.
 */
export function generateResumePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const margin = 14;
  const pageWidth = 210;
  const contentWidth = pageWidth - margin * 2;
  let y = margin + 4;

  // Color palette: crisp, professional, high-contrast
  const cBlack: [number, number, number] = [20, 20, 24];
  const cDark: [number, number, number] = [45, 55, 72];
  const cMuted: [number, number, number] = [100, 116, 139];
  const cPrimary: [number, number, number] = [111, 38, 57]; // #6f2639
  const cLink: [number, number, number] = [37, 99, 235]; // #2563eb

  function checkPageBreak(neededHeight: number) {
    if (y + neededHeight > 282) {
      doc.addPage();
      y = margin + 4;
    }
  }

  function sectionHeader(title: string) {
    checkPageBreak(12);
    y += 3.8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...cPrimary);
    doc.text(title.toUpperCase(), margin, y);
    y += 1.6;
    doc.setDrawColor(...cPrimary);
    doc.setLineWidth(0.35);
    doc.line(margin, y, margin + contentWidth, y);
    y += 4.2;
  }

  // ==========================================
  // HEADER
  // ==========================================
  const id = RESUME_DATA.identity;
  const ct = RESUME_DATA.contact;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...cBlack);
  doc.text(id.name, margin, y);
  y += 5.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...cDark);
  doc.text(`${id.degree}  ·  ${id.institution}`, margin, y);
  y += 4.5;

  // Clickable contact links
  doc.setFontSize(8.5);
  let linkX = margin;

  const links = [
    { label: `Email: ${ct.email}`, url: `mailto:${ct.email}` },
    { label: `GitHub: ${ct.github.display}`, url: ct.github.url },
    { label: `LinkedIn: ${ct.linkedin.display}`, url: ct.linkedin.url },
    { label: `itch.io: ${ct.itch.display}`, url: ct.itch.url }
  ];

  links.forEach((l, idx) => {
    const itemWidth = doc.getTextWidth(l.label);
    const sep = '   |   ';
    const sepWidth = doc.getTextWidth(sep);

    if (linkX + itemWidth > margin + contentWidth) {
      y += 4.2;
      linkX = margin;
    }

    doc.setTextColor(...cLink);
    doc.textWithLink(l.label, linkX, y, { url: l.url });
    linkX += itemWidth;
    if (idx < links.length - 1) {
      if (linkX + sepWidth + 20 <= margin + contentWidth) {
        doc.setTextColor(...cMuted);
        doc.text(sep, linkX, y);
        linkX += sepWidth;
      }
    }
  });

  y += 3.8;
  doc.setFontSize(8);
  doc.setTextColor(...cMuted);
  doc.text(id.location, margin, y);
  y += 3;

  // ==========================================
  // PROFESSIONAL SUMMARY
  // ==========================================
  sectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(...cDark);
  const splitSummary = doc.splitTextToSize(id.summary, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 4.2;

  // ==========================================
  // EDUCATION
  // ==========================================
  sectionHeader('Education');
  RESUME_DATA.education.forEach((e) => {
    checkPageBreak(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...cBlack);
    doc.text(e.institution, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...cMuted);
    const periodWidth = doc.getTextWidth(e.period);
    doc.text(e.period, margin + contentWidth - periodWidth, y);
    y += 3.8;

    doc.setTextColor(...cDark);
    const subtitle = e.degree + (e.gpa ? `  ·  ${e.gpa}` : '') + (e.details ? `  ·  ${e.details}` : '');
    const splitSub = doc.splitTextToSize(subtitle, contentWidth);
    doc.text(splitSub, margin, y);
    y += splitSub.length * 3.8 + 1;
  });

  // ==========================================
  // FEATURED PROJECTS
  // ==========================================
  sectionHeader('Featured Projects');
  RESUME_DATA.featuredProjects.forEach((p) => {
    checkPageBreak(22);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...cBlack);
    doc.text(p.name, margin, y);

    const px = margin + doc.getTextWidth(p.name);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...cMuted);
    doc.text(`  — ${p.subtitle}`, px, y);

    // Clickable action links aligned right
    let rightX = margin + contentWidth;
    if (p.demoUrl) {
      const demoStr = '[Live Demo]';
      const dw = doc.getTextWidth(demoStr);
      doc.setTextColor(...cLink);
      doc.textWithLink(demoStr, rightX - dw, y, { url: p.demoUrl });
      rightX -= dw + 3;
    }
    if (p.repoUrl) {
      const repoStr = '[Repository]';
      const rw = doc.getTextWidth(repoStr);
      doc.setTextColor(...cLink);
      doc.textWithLink(repoStr, rightX - rw, y, { url: p.repoUrl });
    }
    y += 3.8;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...cPrimary);
    doc.text(`Technologies: ${p.tech.join(', ')}`, margin, y);
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(...cDark);
    p.highlights.forEach((b) => {
      checkPageBreak(5);
      doc.text('•', margin + 2, y);
      const splitB = doc.splitTextToSize(b, contentWidth - 8);
      doc.text(splitB, margin + 6, y);
      y += splitB.length * 3.6;
    });
    y += 1.8;
  });

  // ==========================================
  // ADDITIONAL PROJECTS
  // ==========================================
  sectionHeader('Additional Projects');
  RESUME_DATA.additionalProjects.forEach((a) => {
    checkPageBreak(7);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...cBlack);
    doc.text(a.name, margin, y);
    const nw = doc.getTextWidth(a.name);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...cMuted);
    const techStr = ` (${a.tech}) — `;
    doc.text(techStr, margin + nw, y);
    const tw = doc.getTextWidth(techStr);

    doc.setTextColor(...cDark);
    const splitA = doc.splitTextToSize(a.description, contentWidth - nw - tw);
    doc.text(splitA, margin + nw + tw, y);
    y += Math.max(splitA.length * 3.6, 4.2);
  });

  // ==========================================
  // TECHNICAL SKILLS
  // ==========================================
  sectionHeader('Technical Skills');
  RESUME_DATA.skills.forEach((s) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(...cBlack);
    const prefix = `${s.category}: `;
    doc.text(prefix, margin, y);
    const cw = doc.getTextWidth(prefix);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(...cDark);
    const itemsStr = s.items.map((i) => i.name + (i.detail ? ` (${i.detail})` : '')).join(', ');
    const splitS = doc.splitTextToSize(itemsStr, contentWidth - cw);
    doc.text(splitS, margin + cw, y);
    y += splitS.length * 3.6 + 0.8;
  });

  // Save/trigger direct download
  doc.save('Shaquib_Wasif_Resume.pdf');
}
