export function svgToDataUri(svg: string) {
  // Encode SVG for safe usage in `src="data:image/svg+xml,..."`.
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml,${encoded}`;
}

export function makeLuxuryCardSvg(opts: {
  label: string;
  accent: string; // e.g. "#d4af37"
  bg1: string;
  bg2: string;
}) {
  const { label, accent, bg1, bg2 } = opts;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${bg1}"/>
          <stop offset="100%" stop-color="${bg2}"/>
        </linearGradient>
        <linearGradient id="a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.15"/>
          <stop offset="50%" stop-color="${accent}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0.15"/>
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur"/>
          <feOffset dy="18" result="off"/>
          <feColorMatrix type="matrix" values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 .45 0" result="color"/>
          <feMerge>
            <feMergeNode in="color"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect x="90" y="55" width="720" height="490" rx="40" fill="url(#g)" filter="url(#shadow)"/>
      <rect x="90" y="55" width="720" height="490" rx="40" fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="2"/>

      <path d="M160 185 C 280 120, 420 120, 540 185 C 660 250, 760 270, 770 350"
            fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" stroke-opacity="0.55"/>
      <path d="M160 215 C 300 155, 430 155, 550 215 C 680 275, 760 300, 770 375"
            fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round" stroke-opacity="0.35"/>

      <rect x="135" y="95" width="630" height="70" rx="22" fill="url(#a)" opacity="0.55"/>
      <text x="450" y="145" text-anchor="middle"
            font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
            font-size="28" letter-spacing="0.14em" fill="white" fill-opacity="0.92">
        ${escapeXml(label.toUpperCase())}
      </text>

      <g opacity="0.9">
        <circle cx="210" cy="410" r="28" fill="${accent}" fill-opacity="0.18"/>
        <circle cx="240" cy="410" r="10" fill="${accent}" fill-opacity="0.55"/>
        <text x="310" y="412"
              font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
              font-size="18" fill="white" fill-opacity="0.78">
          Tap. Share. Own your link.
        </text>
      </g>
    </svg>
  `;

  return svgToDataUri(svg);
}

export function makeTemplatePreviewSvg(opts: {
  label: string;
  accent: string;
  bg1: string;
  bg2: string;
}) {
  const { label, accent, bg1, bg2 } = opts;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${bg1}"/>
          <stop offset="100%" stop-color="${bg2}"/>
        </linearGradient>
        <linearGradient id="a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.10"/>
          <stop offset="50%" stop-color="${accent}" stop-opacity="0.75"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0.10"/>
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur"/>
          <feOffset dy="14" result="off"/>
          <feColorMatrix type="matrix" values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 .40 0" result="color"/>
          <feMerge>
            <feMergeNode in="color"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <rect x="70" y="60" width="760" height="500" rx="38" fill="url(#g)" filter="url(#shadow)"/>
      <rect x="70" y="60" width="760" height="500" rx="38" fill="none" stroke="${accent}" stroke-opacity="0.40" stroke-width="2"/>

      <path d="M140 170 C 220 110, 360 110, 440 170 C 520 230, 650 240, 720 190"
            fill="none" stroke="${accent}" stroke-width="5" stroke-opacity="0.55" stroke-linecap="round"/>

      <rect x="140" y="220" width="620" height="34" rx="17" fill="url(#a)" opacity="0.85"/>

      <g opacity="0.95">
        <circle cx="210" cy="365" r="54" fill="${accent}" fill-opacity="0.18"/>
        <circle cx="210" cy="365" r="22" fill="${accent}" fill-opacity="0.55"/>
        <rect x="290" y="315" width="420" height="14" rx="7" fill="white" fill-opacity="0.78"/>
        <rect x="290" y="340" width="300" height="10" rx="5" fill="white" fill-opacity="0.55"/>
        <rect x="290" y="370" width="360" height="10" rx="5" fill="white" fill-opacity="0.35"/>
      </g>

      <g opacity="0.95">
        <rect x="140" y="430" width="190" height="46" rx="23" fill="white" fill-opacity="0.10" stroke="white" stroke-opacity="0.18"/>
        <rect x="350" y="430" width="190" height="46" rx="23" fill="white" fill-opacity="0.08" stroke="white" stroke-opacity="0.16"/>
        <rect x="560" y="430" width="200" height="46" rx="23" fill="white" fill-opacity="0.12" stroke="white" stroke-opacity="0.20"/>
      </g>

      <text x="500" y="525" text-anchor="middle"
            font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
            font-size="22" letter-spacing="0.16em" fill="white" fill-opacity="0.55">
        ${escapeXml(label.toUpperCase())}
      </text>
    </svg>
  `;

  return svgToDataUri(svg);
}

function escapeXml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

