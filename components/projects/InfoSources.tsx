/** "A spreadsheet + a PDF + a map = too many places to look": the tools recruiters had to juggle,
 *  drawn as simple icons, with the sum underneath. Decoration plus one line of text; the whole
 *  thing is read as a single sentence. */

const PAGE = "M6 0H30L42 12V58a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6Z";

function Sheet() {
  return (
    <svg viewBox="0 0 42 64" className="h-full w-auto" aria-hidden>
      <path d={PAGE} fill="#23A566" />
      <path d="M30 0V12H42Z" fill="#8FD1AE" />
      <rect x="9" y="28" width="24" height="22" rx="2" fill="#fff" />
      <path d="M9 35.3H33M9 42.7H33M21 28V50" stroke="#23A566" strokeWidth="1.6" />
    </svg>
  );
}

function Pdf() {
  return (
    <svg viewBox="0 0 42 64" className="h-full w-auto" aria-hidden>
      <path d={PAGE} fill="#E5342F" />
      <path d="M30 0V12H42Z" fill="#F3A09D" />
      <text x="21" y="46" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">
        PDF
      </text>
    </svg>
  );
}

function Pin() {
  return (
    <svg viewBox="0 0 48 64" className="h-full w-auto" aria-hidden>
      <path d="M24 0C11 0 1 10 1 23c0 16 23 41 23 41s23-25 23-41C47 10 37 0 24 0Z" fill="#EA4335" />
      <circle cx="24" cy="23" r="9" fill="#fff" />
    </svg>
  );
}

export function InfoSources() {
  return (
    <div
      role="img"
      aria-label="A spreadsheet, a PDF and a map: too many places to look"
      className="flex flex-col items-center gap-5 text-center md:gap-6"
    >
      <div aria-hidden className="flex h-16 items-center gap-4 md:h-[5.5rem] md:gap-6">
        <Sheet />
        <span className="font-display text-3xl font-light leading-none text-ink-muted md:text-4xl">+</span>
        <Pdf />
        <span className="font-display text-3xl font-light leading-none text-ink-muted md:text-4xl">+</span>
        <Pin />
      </div>
      <span aria-hidden className="font-display text-4xl font-light leading-none text-accent md:text-5xl">
        =
      </span>
      <p aria-hidden className="font-display text-2xl font-semibold leading-[1.15] text-ink md:text-3xl">
        Too many places to look
      </p>
    </div>
  );
}
