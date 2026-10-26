"use client";

import { useEffect } from "react";

/** Replaces the system pointer with one drawn in halftone dots, like the name in the hero: black
 *  dots in the body of the arrow, red along its edges, on a white halo so it shows over dark
 *  sections. Over links and buttons the arrow turns red-heavy. Only for devices with a real mouse;
 *  touch screens are untouched, and text fields keep the normal text cursor. */

const INK = "#1A1916";
const RED = "#D64040";
/** The classic arrow, in a 24-unit box, tip at the top left. */
const ARROW: [number, number][] = [
  [3, 2],
  [3, 20],
  [7.6, 15.8],
  [10.6, 22.6],
  [13.6, 21.3],
  [10.7, 14.8],
  [17.2, 14.6],
];
const SCALE = 1.45;
const BOX = 36;
const CELL = 2.6;

function draw(invert: boolean, dpr: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = BOX * dpr;
  canvas.height = BOX * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  const path = () => {
    ctx.beginPath();
    ARROW.forEach(([x, y], i) => (i ? ctx.lineTo(x * SCALE + 1.5, y * SCALE + 1.5) : ctx.moveTo(x * SCALE + 1.5, y * SCALE + 1.5)));
    ctx.closePath();
  };
  // White halo and body, so the dots have a light ground whatever is underneath.
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineJoin = "round";
  ctx.lineWidth = 3.4;
  path();
  ctx.stroke();
  ctx.fill();

  // Coverage mask of the arrow, sampled per cell to size each dot.
  const mask = document.createElement("canvas");
  mask.width = BOX;
  mask.height = BOX;
  const m = mask.getContext("2d")!;
  m.fillStyle = "#000";
  m.beginPath();
  ARROW.forEach(([x, y], i) => (i ? m.lineTo(x * SCALE + 1.5, y * SCALE + 1.5) : m.moveTo(x * SCALE + 1.5, y * SCALE + 1.5)));
  m.closePath();
  m.fill();
  const data = m.getImageData(0, 0, BOX, BOX).data;
  const core = invert ? RED : INK;
  const edge = invert ? INK : RED;
  for (let y = 0; y < BOX; y += CELL) {
    for (let x = 0; x < BOX; x += CELL) {
      let sum = 0;
      let n = 0;
      for (let yy = Math.floor(y); yy < Math.min(BOX, Math.floor(y + CELL)); yy++) {
        for (let xx = Math.floor(x); xx < Math.min(BOX, Math.floor(x + CELL)); xx++) {
          sum += data[(yy * BOX + xx) * 4 + 3];
          n++;
        }
      }
      const cov = n ? sum / n / 255 : 0;
      if (cov < 0.12) continue;
      ctx.fillStyle = cov > 0.62 ? core : edge;
      ctx.beginPath();
      ctx.arc(x + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(cov) * 1.12, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  return canvas.toDataURL("image/png");
}

export function HalftoneCursor() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const make = (invert: boolean) => {
      const one = draw(invert, 1);
      const two = draw(invert, 2);
      // The tip of the arrow is the click point.
      return `image-set(url(${one}) 1x, url(${two}) 2x) 5 4, auto`;
    };
    const style = document.createElement("style");
    style.setAttribute("data-halftone-cursor", "");
    style.textContent = `
      html { cursor: ${make(false)}; }
      a, button, [role="button"], summary, label, select { cursor: ${make(true)}; }
      input, textarea { cursor: text; }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return null;
}
