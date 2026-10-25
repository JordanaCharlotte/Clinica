// Ilustración del "método del plato": ½ verduras, ¼ proteína, ¼ carbohidratos.
// Es SVG dibujado en código (sin imágenes externas), así que pesa poco y se ve
// nítido en cualquier pantalla.
export default function IlustracionPlato({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 440 400"
      role="img"
      aria-labelledby="plato-titulo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="plato-titulo">Plato equilibrado: mitad verduras, un cuarto proteína y un cuarto carbohidratos</title>

      {/* Mantel */}
      <ellipse cx="220" cy="210" rx="200" ry="182" fill="#E3F2EC" />

      {/* Tenedor */}
      <g fill="#FFFFFF" opacity="0.95">
        <rect x="28" y="120" width="10" height="170" rx="5" />
        <rect x="18" y="80" width="5" height="52" rx="2.5" />
        <rect x="30.5" y="80" width="5" height="52" rx="2.5" />
        <rect x="43" y="80" width="5" height="52" rx="2.5" />
        <rect x="18" y="122" width="30" height="14" rx="6" />
      </g>
      {/* Cuchillo */}
      <g fill="#FFFFFF" opacity="0.95">
        <rect x="402" y="150" width="11" height="140" rx="5.5" />
        <path d="M402 160 C402 110 412 82 424 78 L424 168 Z" />
      </g>

      {/* Plato */}
      <circle cx="220" cy="205" r="160" fill="#FFFFFF" />
      <circle cx="220" cy="205" r="160" fill="none" stroke="#CFE3DA" strokeWidth="2" />
      <circle cx="220" cy="205" r="134" fill="#F7FAF8" />

      {/* ½ verduras (izquierda) */}
      <path d="M220 75 A130 130 0 0 0 220 335 Z" fill="#6DBE8C" />
      <g fill="#3E9466">
        <ellipse cx="160" cy="150" rx="26" ry="13" transform="rotate(-35 160 150)" />
        <ellipse cx="128" cy="210" rx="28" ry="14" transform="rotate(20 128 210)" />
        <ellipse cx="170" cy="272" rx="25" ry="12" transform="rotate(-15 170 272)" />
      </g>
      <g fill="#E85D5D">
        <circle cx="185" cy="205" r="13" />
        <circle cx="150" cy="248" r="10" />
        <circle cx="196" cy="128" r="9" />
      </g>
      <g fill="#F7FAF8" opacity="0.7">
        <circle cx="181" cy="201" r="3" />
        <circle cx="147" cy="245" r="2.5" />
      </g>

      {/* ¼ proteína (arriba a la derecha) */}
      <path d="M220 205 L220 75 A130 130 0 0 1 350 205 Z" fill="#F3B391" />
      <path d="M248 120 C275 100 318 118 322 150 C326 178 290 190 262 178 C238 168 232 134 248 120 Z" fill="#E8875E" />
      <path d="M258 132 C280 124 302 136 306 152" fill="none" stroke="#F7D2BE" strokeWidth="4" strokeLinecap="round" />
      <path d="M254 152 C276 146 296 156 300 170" fill="none" stroke="#F7D2BE" strokeWidth="4" strokeLinecap="round" />

      {/* ¼ carbohidratos (abajo a la derecha) */}
      <path d="M220 205 L350 205 A130 130 0 0 1 220 335 Z" fill="#F2D27A" />
      <g fill="#E0B64A">
        <ellipse cx="262" cy="236" rx="9" ry="5" transform="rotate(25 262 236)" />
        <ellipse cx="292" cy="230" rx="9" ry="5" transform="rotate(-20 292 230)" />
        <ellipse cx="318" cy="246" rx="9" ry="5" transform="rotate(40 318 246)" />
        <ellipse cx="250" cy="268" rx="9" ry="5" transform="rotate(-30 250 268)" />
        <ellipse cx="282" cy="262" rx="9" ry="5" transform="rotate(15 282 262)" />
        <ellipse cx="306" cy="280" rx="9" ry="5" transform="rotate(-45 306 280)" />
        <ellipse cx="262" cy="300" rx="9" ry="5" transform="rotate(30 262 300)" />
        <ellipse cx="236" cy="240" rx="9" ry="5" transform="rotate(-10 236 240)" />
      </g>

      {/* Divisiones del plato */}
      <path d="M220 75 L220 335 M220 205 L350 205" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

      {/* Vaso de agua */}
      <g>
        <path d="M352 22 L398 22 L392 92 L358 92 Z" fill="#FFFFFF" opacity="0.9" />
        <path d="M355 46 L395 46 L392 92 L358 92 Z" fill="#9FD3E6" />
        <path d="M352 22 L398 22" stroke="#CFE3DA" strokeWidth="2" />
      </g>
    </svg>
  );
}
