/** The name, painted in the bust's own materials. It is real text in the site's heavy capitals, filled with
 *  the crayon texture of the hair; as the stars fall, colour from the painting (shirt blue, cheek pink)
 *  floods into the letters one by one, and a hovered letter takes its colour at once. The page sets
 *  `--p` (0 to 1, how far the stars have fallen) on an ancestor. */

const LINES = ["AXEL", "GARLAND"] as const;

/** For each letter, in reading order: its paint and when (0 to 1) the colour reaches it. Letters marked
 *  "ink" stay dark while scrolling (so the name always reads) and only take colour on hover. */
const PAINT: { tex: "blue" | "pink"; at: number; ink?: boolean }[] = [
  { tex: "blue", at: 0.55 }, // A
  { tex: "pink", at: 0.1 }, // X
  { tex: "blue", at: 2, ink: true }, // E
  { tex: "blue", at: 0.8 }, // L
  { tex: "pink", at: 0.3 }, // G
  { tex: "blue", at: 2, ink: true }, // A
  { tex: "blue", at: 0.45 }, // R
  { tex: "pink", at: 2, ink: true }, // L
  { tex: "pink", at: 0.7 }, // A
  { tex: "blue", at: 0.2 }, // N
  { tex: "pink", at: 2, ink: true }, // D
];

export function PaintedName() {
  let n = 0;
  return (
    <>
      <style>{CSS}</style>
      <h1 className="painted-name font-display" aria-label="Axel Garland">
        {LINES.map((line, li) => (
          <span key={line} className="painted-line" aria-hidden>
            {line.split("").map((c, ci) => {
              const k = n++;
              const paint = PAINT[k];
              return (
                <span
                  key={`${li}-${ci}`}
                  className="painted-ch"
                  data-c={c}
                  style={
                    {
                      "--i": k,
                      "--at": paint.at,
                      "--tex": `url(/home/tex/${paint.tex}.jpg)`,
                      "--r": `${((k * 37) % 9) - 4}deg`,
                    } as React.CSSProperties
                  }
                >
                  {c}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    </>
  );
}

const CSS = `
.painted-name {
  margin: 0;
  font-size: clamp(3.2rem, 7.3vw, 8rem);
  line-height: 0.86;
  letter-spacing: -0.025em;
  color: #1a1916;
}
.painted-line { display: block; white-space: nowrap; }
.painted-ch {
  position: relative;
  display: inline-block;
  color: #1a1916;
  animation: painted-in 0.7s cubic-bezier(0.2, 0.9, 0.25, 1.15) both;
  animation-delay: calc(var(--i) * 55ms + 120ms);
}
.painted-ch::after {
  content: attr(data-c);
  position: absolute;
  left: 0;
  top: 0;
  background-image: var(--tex);
  background-size: 1.15em auto;
  background-position: calc(var(--i) * -0.29em) 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: clamp(0, calc((var(--p, 0) - var(--at)) * 7), 1);
  transition: opacity 0.22s ease;
}
.painted-ch:hover::after { opacity: 1; }
@keyframes painted-in {
  from { opacity: 0; transform: translateY(0.22em) rotate(var(--r)); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .painted-ch { animation: none; }
  .painted-ch::after { transition: none; }
}
`;
