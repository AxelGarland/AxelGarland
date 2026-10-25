import type p5 from "p5";

/** A looping p5 animation of Axel's photo: it pixelates, then re-draws itself in four different
 *  styles (a duotone print, halftone dots, a grey-and-red illustration, pop colours), then
 *  resolves back to the photo. Every style is a function of the same 54 x 72 grid of averaged
 *  colours, so the transitions between styles are per-cell morphs rather than crossfades. */

const COLS = 54;
const ROWS = 72;
/** Finer grids shown in turn while the photo breaks into pixels (and back again). */
const PIXEL_STEPS: [number, number][] = [
  [216, 288],
  [128, 171],
  [80, 107],
];

type RGB = [number, number, number];
const INK: RGB = [26, 25, 22];
const CREAM: RGB = [245, 243, 239];
const GREY: RGB = [194, 192, 186];
const YELLOW: RGB = [255, 182, 39];
const RED: RGB = [214, 64, 64];

/** One cell of one style: the colour, how much of the cell the shape fills (0 to 1), how round
 *  it is (0 square, 0.5 circle), and the background colour behind it. */
const STRIDE = 8;

const lum = (r: number, g: number, b: number) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const hash = (i: number) => ((Math.imul(i + 1, 2654435761) >>> 0) % 100000) / 100000;

function setCell(
  out: Float32Array,
  i: number,
  c: RGB,
  scale: number,
  round: number,
  bg: RGB,
) {
  const o = i * STRIDE;
  out[o] = c[0];
  out[o + 1] = c[1];
  out[o + 2] = c[2];
  out[o + 3] = scale;
  out[o + 4] = round;
  out[o + 5] = bg[0];
  out[o + 6] = bg[1];
  out[o + 7] = bg[2];
}

function averageGrid(src: p5.Image, cols: number, rows: number): Uint8ClampedArray {
  const w = src.width;
  const h = src.height;
  const px = src.pixels;
  const out = new Uint8ClampedArray(cols * rows * 3);
  for (let cy = 0; cy < rows; cy++) {
    const y0 = Math.floor((cy * h) / rows);
    const y1 = Math.max(y0 + 1, Math.floor(((cy + 1) * h) / rows));
    const sy = Math.max(1, Math.floor((y1 - y0) / 4));
    for (let cx = 0; cx < cols; cx++) {
      const x0 = Math.floor((cx * w) / cols);
      const x1 = Math.max(x0 + 1, Math.floor(((cx + 1) * w) / cols));
      const sx = Math.max(1, Math.floor((x1 - x0) / 4));
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let y = y0; y < y1; y += sy) {
        for (let x = x0; x < x1; x += sx) {
          const k = (y * w + x) * 4;
          r += px[k];
          g += px[k + 1];
          b += px[k + 2];
          n++;
        }
      }
      const o = (cy * cols + cx) * 3;
      out[o] = r / n;
      out[o + 1] = g / n;
      out[o + 2] = b / n;
    }
  }
  return out;
}

/** Four hand-tuned looks, each computed once from the averaged colours. */
function buildStyles(base: Uint8ClampedArray): Float32Array[] {
  const n = COLS * ROWS;
  const trueColour = new Float32Array(n * STRIDE);
  const duotone = new Float32Array(n * STRIDE);
  const halftone = new Float32Array(n * STRIDE);
  const tritone = new Float32Array(n * STRIDE);
  const pop = new Float32Array(n * STRIDE);

  const POP: RGB[] = [
    INK,
    [123, 79, 224],
    [239, 47, 123],
    [255, 138, 43],
    [255, 212, 0],
    [30, 143, 224],
  ];

  for (let i = 0; i < n; i++) {
    const r = base[i * 3];
    const g = base[i * 3 + 1];
    const b = base[i * 3 + 2];
    const l = lum(r, g, b);
    const rgb: RGB = [r, g, b];

    setCell(trueColour, i, rgb, 1, 0, rgb);

    // Duotone: five steps between ink and the site's yellow, like a two-colour print.
    const q = Math.round(clamp01((l - 0.27) / 0.42) * 4) / 4;
    const duo: RGB = [mix(INK[0], YELLOW[0], q), mix(INK[1], YELLOW[1], q), mix(INK[2], YELLOW[2], q)];
    setCell(duotone, i, duo, 1, 0, YELLOW);

    // Halftone: round dots on cream, bigger where the photo is darker, red in the mid-tones.
    const dark = 1 - l;
    const dot = l > 0.9 ? 0 : clamp01(0.18 + dark * 1.05);
    setCell(halftone, i, l < 0.4 ? INK : RED, dot, 0.5, CREAM);

    // Tri-tone, close to the hand-drawn portrait: ink, grey, cream, with red on warm mid-tones.
    const cx = (i % COLS) / COLS;
    const cy = Math.floor(i / COLS) / ROWS;
    const lips = r > g * 1.5 && r > 120 && l > 0.2 && l < 0.7 && Math.abs(cx - 0.47) < 0.14 && Math.abs(cy - 0.46) < 0.05;
    const tone: RGB = lips ? RED : l < 0.3 ? INK : l < 0.63 ? GREY : CREAM;
    setCell(tritone, i, tone, 1, 0, CREAM);

    // Pop: six flat colours stepped by brightness, like the faces in Kindred.
    const band = l < 0.22 ? 0 : l < 0.42 ? 1 : l < 0.6 ? 2 : l < 0.78 ? 3 : l < 0.92 ? 4 : 5;
    setCell(pop, i, POP[band], 1, 0, POP[5]);
  }
  return [trueColour, duotone, halftone, tritone, pop];
}

/** Segment lengths in seconds, in the order they play. */
const HOLD_PHOTO = 2.4;
const PIXEL_STEP = 0.28;
const HOLD_MOSAIC = 0.7;
const MORPH = 1.15;
const HOLD_STYLE = 1.9;

type Segment =
  | { kind: "photo"; start: number; end: number }
  | { kind: "level"; level: number; start: number; end: number }
  | { kind: "cells"; from: number; to: number; sweep: number; start: number; end: number };

function buildTimeline(): { segments: Segment[]; loop: number } {
  const segments: Segment[] = [];
  let t = 0;
  const photo = (dur: number) => {
    segments.push({ kind: "photo", start: t, end: t + dur });
    t += dur;
  };
  const level = (index: number, dur: number) => {
    segments.push({ kind: "level", level: index, start: t, end: t + dur });
    t += dur;
  };
  const cells = (from: number, to: number, sweep: number, dur: number) => {
    segments.push({ kind: "cells", from, to, sweep, start: t, end: t + dur });
    t += dur;
  };

  let sweep = 0;
  photo(HOLD_PHOTO);
  for (let i = 0; i < PIXEL_STEPS.length; i++) level(i, PIXEL_STEP);
  cells(0, 0, 0, HOLD_MOSAIC);
  for (const style of [1, 2, 3, 4]) {
    cells(style - 1, style, sweep++, MORPH);
    cells(style, style, 0, HOLD_STYLE);
  }
  cells(4, 0, sweep++, MORPH);
  cells(0, 0, 0, HOLD_MOSAIC);
  for (let i = PIXEL_STEPS.length - 1; i >= 0; i--) level(i, PIXEL_STEP);
  return { segments, loop: t };
}

export function createPortraitSketch(opts: { url: string; host: HTMLElement }) {
  return (p: p5) => {
    let src: p5.Image | null = null;
    let levels: p5.Image[] = [];
    let styles: Float32Array[] = [];
    const delays = new Float32Array(COLS * ROWS);
    const { segments, loop } = buildTimeline();
    let t0 = 0;

    const size = () => [Math.max(1, opts.host.clientWidth), Math.max(1, opts.host.clientHeight)] as const;

    p.setup = () => {
      const [w, h] = size();
      const canvas = p.createCanvas(w, h);
      canvas.style("position", "absolute");
      canvas.style("inset", "0");
      canvas.style("width", "100%");
      canvas.style("height", "100%");
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      p.frameRate(30);
      p.noStroke();
      p.noLoop();
      p.loadImage(opts.url, (img) => {
        src = img;
        img.loadPixels();
        const grid = averageGrid(img, COLS, ROWS);
        styles = buildStyles(grid);
        levels = PIXEL_STEPS.map(([c, r]) => {
          const g = averageGrid(img, c, r);
          const out = p.createImage(c, r);
          out.loadPixels();
          for (let i = 0; i < c * r; i++) {
            out.pixels[i * 4] = g[i * 3];
            out.pixels[i * 4 + 1] = g[i * 3 + 1];
            out.pixels[i * 4 + 2] = g[i * 3 + 2];
            out.pixels[i * 4 + 3] = 255;
          }
          out.updatePixels();
          return out;
        });
        // Morph order radiates out from the face, with a little noise so it never looks mechanical.
        for (let cy = 0; cy < ROWS; cy++) {
          for (let cx = 0; cx < COLS; cx++) {
            const dx = cx / COLS - 0.5;
            const dy = cy / ROWS - 0.4;
            const d = Math.min(1, Math.hypot(dx, dy * 0.75) * 1.7);
            delays[cy * COLS + cx] = clamp01(d * 0.82 + hash(cy * COLS + cx) * 0.18);
          }
        }
        t0 = p.millis();
        p.loop();
      });
    };

    p.windowResized = () => {
      const [w, h] = size();
      p.resizeCanvas(w, h);
    };

    const nowSeconds = () => {
      const override = (window as unknown as { __heroT?: number }).__heroT;
      if (process.env.NODE_ENV !== "production" && typeof override === "number") return override % loop;
      return ((p.millis() - t0) / 1000) % loop;
    };

    p.draw = () => {
      if (!src) return;
      const t = nowSeconds();
      const seg = segments.find((s) => t >= s.start && t < s.end) ?? segments[0];
      const w = p.width;
      const h = p.height;
      if (seg.kind === "photo") {
        p.smooth();
        p.image(src, 0, 0, w, h);
        return;
      }
      if (seg.kind === "level") {
        p.noSmooth();
        p.image(levels[seg.level], 0, 0, w, h);
        return;
      }
      const prog = (t - seg.start) / (seg.end - seg.start);
      const from = styles[seg.from];
      const to = styles[seg.to];
      const still = seg.from === seg.to;
      const cw = w / COLS;
      const ch = h / ROWS;
      const spread = 0.55;
      for (let cy = 0; cy < ROWS; cy++) {
        const y0 = Math.floor(cy * ch);
        const hh = Math.ceil((cy + 1) * ch) - y0;
        for (let cx = 0; cx < COLS; cx++) {
          const i = cy * COLS + cx;
          const x0 = Math.floor(cx * cw);
          const ww = Math.ceil((cx + 1) * cw) - x0;
          const o = i * STRIDE;
          let q = 1;
          if (!still) {
            const d = seg.sweep % 2 === 0 ? delays[i] : 1 - delays[i];
            q = smooth(clamp01(prog * (1 + spread) - d * spread));
          }
          const a = still ? to : from;
          const r = still ? a[o] : mix(a[o], to[o], q);
          const g = still ? a[o + 1] : mix(a[o + 1], to[o + 1], q);
          const b = still ? a[o + 2] : mix(a[o + 2], to[o + 2], q);
          const sc = still ? a[o + 3] : mix(a[o + 3], to[o + 3], q);
          const rd = still ? a[o + 4] : mix(a[o + 4], to[o + 4], q);
          if (sc >= 0.995 && rd < 0.02) {
            p.fill(r, g, b);
            p.rect(x0, y0, ww, hh);
            continue;
          }
          p.fill(
            still ? a[o + 5] : mix(a[o + 5], to[o + 5], q),
            still ? a[o + 6] : mix(a[o + 6], to[o + 6], q),
            still ? a[o + 7] : mix(a[o + 7], to[o + 7], q),
          );
          p.rect(x0, y0, ww, hh);
          if (sc < 0.02) continue;
          const s = Math.min(ww, hh) * sc;
          p.fill(r, g, b);
          if (rd > 0.45) p.circle(x0 + ww / 2, y0 + hh / 2, s);
          else p.rect(x0 + (ww - s) / 2, y0 + (hh - s) / 2, s, s, s * rd);
        }
      }
    };
  };
}
