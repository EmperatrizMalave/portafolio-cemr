const WIDTHS = {
  " ": 278, "!": 278, '"': 355, "#": 556, $: 556, "%": 889, "&": 667, "'": 191,
  "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
  0: 556, 1: 556, 2: 556, 3: 556, 4: 556, 5: 556, 6: 556, 7: 556, 8: 556, 9: 556,
  ":": 278, ";": 278, "?": 556, "@": 1015,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500,
  K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611,
  U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222,
  k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278,
  u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
};

const WIN = {
  á: 0xe1, é: 0xe9, í: 0xed, ó: 0xf3, ú: 0xfa, ñ: 0xf1, ü: 0xfc,
  Á: 0xc1, É: 0xc9, Í: 0xcd, Ó: 0xd3, Ú: 0xda, Ñ: 0xd1, Ü: 0xdc,
  "–": 0x96, "—": 0x97, "•": 0x95, "¿": 0xbf, "¡": 0xa1,
};

const PAGE_W = 595;
const PAGE_H = 842;
const MARGIN = 50;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM = 50;

const encodeByte = (ch) => {
  if (WIN[ch] != null) return WIN[ch];
  const code = ch.codePointAt(0);
  if (code >= 32 && code <= 126) return code;
  if (code >= 160 && code <= 255) return code;
  return 63;
};

const pdfText = (value) => {
  let out = "";
  for (const ch of value) {
    const byte = encodeByte(ch);
    if (byte === 40 || byte === 41 || byte === 92) out += `\\${String.fromCharCode(byte)}`;
    else if (byte < 32 || byte > 126) out += `\\${byte.toString(8).padStart(3, "0")}`;
    else out += String.fromCharCode(byte);
  }
  return out;
};

const charWidth = (ch) => {
  if (WIDTHS[ch]) return WIDTHS[ch];
  const plain = ch.normalize("NFD").replace(/\p{M}/gu, "");
  return WIDTHS[plain] || WIDTHS[plain.toLowerCase()] || 500;
};

const textWidth = (value, size) => {
  let width = 0;
  for (const ch of value) width += (charWidth(ch) * size) / 1000;
  return width;
};

const wrapWords = (value, size, maxWidth) => {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = [];
  words.forEach((word) => {
    const trial = [...current, word].join(" ");
    if (current.length === 0 || textWidth(trial, size) <= maxWidth) current.push(word);
    else {
      lines.push(current);
      current = [word];
    }
  });
  if (current.length) lines.push(current);
  return lines;
};

const lineOperator = (words, size, maxWidth, justify) => {
  const text = words.join(" ");
  if (!justify || words.length < 2) return `(${pdfText(text)}) Tj`;
  const gaps = words.length - 1;
  const extra = Math.max(0, maxWidth - textWidth(text, size));
  const gapAdjust = -(278 + Math.round(((extra / gaps) / size) * 1000));
  return `[${words
    .map((word, index) => `(${pdfText(word)})${index < gaps ? ` ${gapAdjust}` : ""}`)
    .join(" ")}] TJ`;
};

export const buildResumePdf = (resume) => {
  const pages = [];
  let ops = [];
  let y = PAGE_H - MARGIN;

  const newPage = () => {
    if (ops.length) pages.push(ops);
    ops = [];
    y = PAGE_H - MARGIN;
  };

  const ensure = (height) => {
    if (y - height < BOTTOM) newPage();
  };

  const draw = (words, size, font, color, justify, x) => {
    const leading = size * 1.5;
    ensure(leading);
    const operator = lineOperator(words, size, CONTENT_W, justify);
    ops.push(
      `${color} rg`,
      "BT",
      `${font} ${size} Tf`,
      `1 0 0 1 ${x} ${y.toFixed(2)} Tm`,
      operator,
      "ET"
    );
    y -= leading;
  };

  const paragraph = (value, { size = 11, font = "/F1", color = "0.12 0.16 0.2", justify = true, gap = 8, center = false } = {}) => {
    const lines = wrapWords(value, size, CONTENT_W);
    lines.forEach((words, index) => {
      const width = textWidth(words.join(" "), size);
      const x = center ? MARGIN + (CONTENT_W - width) / 2 : MARGIN;
      const last = index === lines.length - 1;
      draw(words, size, font, color, justify && !center && !last, x);
    });
    y -= gap;
  };

  paragraph(resume.fullName, { size: 18, font: "/F2", color: "0.08 0.16 0.24", justify: false, center: true, gap: 4 });
  paragraph(`(${resume.shortName})`, { size: 11, color: "0.22 0.64 0.84", justify: false, center: true, gap: 4 });
  paragraph(resume.headline, { size: 12, font: "/F2", justify: false, center: true, gap: 6 });
  paragraph(`${resume.location}  |  ${resume.email}`, { size: 10, justify: false, center: true, gap: 2 });
  paragraph(`${resume.linkedinLabel}: ${resume.linkedin}`, { size: 10, justify: false, center: true, gap: 2 });
  paragraph(`${resume.githubLabel}: ${resume.github}`, { size: 10, justify: false, center: true, gap: 14 });

  const section = (title) => {
    y -= 4;
    paragraph(title, { size: 13, font: "/F2", color: "0.22 0.64 0.84", justify: false, gap: 6 });
  };

  section(resume.summaryTitle);
  paragraph(resume.summary, { gap: 12 });

  section(resume.experienceTitle);
  resume.jobs.forEach((job) => {
    paragraph(`${job.role} | ${job.org}`, { font: "/F2", justify: false, gap: 1 });
    paragraph(job.date, { size: 10, color: "0.22 0.64 0.84", justify: false, gap: 3 });
    if (job.note) paragraph(job.note, { gap: 3 });
    job.duties.forEach((duty) => paragraph(`• ${duty}`, { gap: 2 }));
    y -= 6;
  });

  section(resume.educationTitle);
  resume.education.forEach((item) => {
    paragraph(`${item.course} — ${item.place} (${item.date})`, { gap: 3 });
  });

  y -= 6;
  section(resume.skillsTitle);
  resume.skills.forEach((group) => {
    paragraph(`${group.label}: ${group.items}`, { gap: 3 });
  });

  if (ops.length) pages.push(ops);

  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length;
  };

  const pageIds = [];
  const contentIds = [];
  pages.forEach((commands) => {
    const stream = commands.join("\n");
    const contentId = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    contentIds.push(contentId);
  });
  const fontRegular = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  const fontBold = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
  contentIds.forEach((contentId) => {
    pageIds.push(
      add(
        `<< /Type /Page /Parent PAGES /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> >>`
      )
    );
  });
  const pagesId = add(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
  const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  objects.forEach((body, index) => {
    if (pageIds.includes(index + 1)) objects[index] = body.replace("PAGES", `${pagesId} 0 R`);
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new TextEncoder().encode(pdf);
};

const saveBlob = (bytes, name, type) => {
  const blob = new Blob([bytes], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
};

const htmlEscape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export const buildResumeDoc = (resume) => {
  const jobs = resume.jobs
    .map(
      (job) => `<h3>${htmlEscape(job.role)} | ${htmlEscape(job.org)}</h3><p>${htmlEscape(job.date)}</p>${
        job.note ? `<p>${htmlEscape(job.note)}</p>` : ""
      }<ul>${job.duties.map((duty) => `<li>${htmlEscape(duty)}</li>`).join("")}</ul>`
    )
    .join("");
  const education = resume.education
    .map((item) => `<li>${htmlEscape(item.course)} — ${htmlEscape(item.place)} (${htmlEscape(item.date)})</li>`)
    .join("");
  const skills = resume.skills
    .map((group) => `<li><strong>${htmlEscape(group.label)}:</strong> ${htmlEscape(group.items)}</li>`)
    .join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body { font-family: Calibri, "Segoe UI", sans-serif; line-height: 1.5; text-align: justify; color: #1c2430; margin: 48px; }
    h1, h2, p.center { text-align: center; }
    h1 { font-size: 22pt; margin-bottom: 0; }
    h2 { color: #1a7eab; font-size: 14pt; text-align: left; margin-top: 18px; }
    h3 { font-size: 12pt; margin-bottom: 0; text-align: left; }
    p, li { font-size: 11pt; }
  </style></head><body>
    <h1>${htmlEscape(resume.fullName)}</h1>
    <p class="center">(${htmlEscape(resume.shortName)})</p>
    <p class="center"><strong>${htmlEscape(resume.headline)}</strong></p>
    <p class="center">${htmlEscape(resume.location)} | ${htmlEscape(resume.email)}</p>
    <p class="center">${htmlEscape(resume.linkedinLabel)}: ${htmlEscape(resume.linkedin)}</p>
    <p class="center">${htmlEscape(resume.githubLabel)}: ${htmlEscape(resume.github)}</p>
    <h2>${htmlEscape(resume.summaryTitle)}</h2>
    <p>${htmlEscape(resume.summary)}</p>
    <h2>${htmlEscape(resume.experienceTitle)}</h2>
    ${jobs}
    <h2>${htmlEscape(resume.educationTitle)}</h2>
    <ul>${education}</ul>
    <h2>${htmlEscape(resume.skillsTitle)}</h2>
    <ul>${skills}</ul>
  </body></html>`;
};

export const downloadResume = (resume) => {
  const slug = resume.shortName.toLowerCase().includes("cori") ? "Cori-Malave" : "CV";
  saveBlob(buildResumePdf(resume), `CV-${slug}.pdf`, "application/pdf");
  saveBlob(
    new TextEncoder().encode(`\ufeff${buildResumeDoc(resume)}`),
    `CV-${slug}.doc`,
    "application/msword"
  );
};
