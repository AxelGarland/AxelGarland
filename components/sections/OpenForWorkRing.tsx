/** A ring of text that circles the hero portrait and turns slowly. The words are set on a circular
 *  path, so they stay sharp at any size. Three "OPEN FOR WORK" phrases each sit centred in their
 *  own third of the ring, with a dot exactly on each boundary, so the gaps are all equal. Purely
 *  decorative: the "Open to opportunities" link beside the buttons carries the same message for
 *  screen readers. With reduced motion the ring holds still. */
const RADIUS = 45;
const PHRASES = 3;
/** Radius of the dots: they sit at the visual middle of the letters, not on the baseline. */
const DOT_RADIUS = 46.4;
const PATH = `M ${50 - RADIUS},50 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 ${-RADIUS * 2},0`;

export function OpenForWorkRing() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="pointer-events-none absolute -inset-[8.5%] h-[117%] w-[117%] overflow-visible motion-safe:animate-ring-spin"
    >
      <defs>
        <path id="open-for-work-ring" d={PATH} />
      </defs>
      {Array.from({ length: PHRASES }, (_, i) => {
        // The path starts at 9 o'clock and runs clockwise.
        const angle = Math.PI + (2 * Math.PI * i) / PHRASES;
        return (
          <circle
            key={`dot-${i}`}
            cx={50 + DOT_RADIUS * Math.cos(angle)}
            cy={50 + DOT_RADIUS * Math.sin(angle)}
            r={0.95}
            className="fill-accent"
          />
        );
      })}
      {Array.from({ length: PHRASES }, (_, i) => (
        <text
          key={`phrase-${i}`}
          className="font-body fill-ink"
          style={{ fontSize: 4, fontWeight: 600, letterSpacing: "0.55px" }}
          textAnchor="middle"
        >
          <textPath href="#open-for-work-ring" startOffset={`${((i + 0.5) / PHRASES) * 100}%`}>
            OPEN FOR WORK
          </textPath>
        </text>
      ))}
    </svg>
  );
}
