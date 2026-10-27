"use client";

import { useEffect, useRef } from "react";

/** The site's one arrow: a white box with a thin black frame holding an arrowhead (a chevron, no shaft) drawn in halftone
 *  dots, black with red at the edges. When the link or button around it (the nearest `group`) is
 *  hovered or focused, the box turns black and the arrow white. The arrow is drawn once into two
 *  canvases, one per state, and the page fades between them. It is decoration: whatever it sits in
 *  carries the name.
 *
 *  `shape="square"` is a button-sized box (give it a size with `className` to change it);
 *  `shape="tall"` stretches to the height of whatever is beside it, with the arrow centred. */

const INK = "#1A1916";
const RED = "#D64040";
const WHITE = "#FFFFFF";
const SIZE = 56;
const CELL = 2;

function paint(canvas: HTMLCanvasElement, mask: Uint8ClampedArray, fg: string, dpr: number) {
  canvas.width = SIZE * dpr;
  canvas.height = SIZE * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, SIZE, SIZE);
  for (let y = 0; y < SIZE; y += CELL) {
    for (let x = 0; x < SIZE; x += CELL) {
      let sum = 0;
      let n = 0;
      for (let yy = Math.floor(y); yy < Math.min(SIZE, Math.floor(y + CELL)); yy++) {
        for (let xx = Math.floor(x); xx < Math.min(SIZE, Math.floor(x + CELL)); xx++) {
          sum += mask[(yy * SIZE + xx) * 4 + 3];
          n++;
        }
      }
      const cov = n ? sum / n / 255 : 0;
      if (cov < 0.12) continue;
      ctx.fillStyle = cov > 0.55 ? fg : RED;
      ctx.beginPath();
      ctx.arc(x + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(cov) * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

const ROTATE = { right: 0, down: 90, left: 180, up: 270 } as const;

export function HalftoneArrowBox({
  dir = "right",
  shape = "square",
  className,
}: {
  dir?: keyof typeof ROTATE;
  shape?: "square" | "tall";
  className?: string;
}) {
  const rest = useRef<HTMLCanvasElement>(null);
  const hover = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!rest.current || !hover.current) return;
    const c = document.createElement("canvas");
    c.width = SIZE;
    c.height = SIZE;
    const m = c.getContext("2d")!;
    m.strokeStyle = "#000";
    m.lineWidth = 8.5;
    m.lineCap = "round";
    m.lineJoin = "round";
    m.beginPath();
    m.moveTo(20.5, 13);
    m.lineTo(35.5, 28);
    m.lineTo(20.5, 43);
    m.stroke();
    const mask = m.getImageData(0, 0, SIZE, SIZE).data;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    paint(rest.current, mask, INK, dpr);
    paint(hover.current, mask, WHITE, dpr);
  }, []);

  const tall = shape === "tall";
  const box = tall ? "w-12 self-stretch sm:w-[3.75rem]" : "h-12 w-12 sm:h-14 sm:w-14";
  const canvas = tall
    ? "absolute left-1/2 top-1/2 h-12 w-12 sm:h-14 sm:w-14"
    : "absolute inset-0 h-full w-full";
  const turn = { transform: `${tall ? "translate(-50%, -50%) " : ""}rotate(${ROTATE[dir]}deg)` };

  return (
    <span
      aria-hidden
      className={`relative block shrink-0 border border-ink bg-white transition-colors duration-300 group-hover:bg-ink group-focus-visible:bg-ink ${box} ${className ?? ""}`}
    >
      <canvas
        ref={rest}
        style={turn}
        className={`${canvas} transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0`}
      />
      <canvas
        ref={hover}
        style={turn}
        className={`${canvas} opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100`}
      />
    </span>
  );
}
