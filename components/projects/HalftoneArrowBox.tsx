/** The site's one arrow: a heavy arrowhead (a chevron, no shaft), with nothing around it at rest. When the
 *  link or button around it (the nearest `group`) is hovered or focused, an ink box appears behind it and
 *  the arrow turns white. It is decoration: whatever it sits in carries the name.
 *
 *  `shape="square"` is a button-sized box (give it a size with `className` to change it);
 *  `shape="tall"` stretches to the height of whatever is beside it, with the arrow centred. */

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
  const tall = shape === "tall";
  const box = tall ? "w-12 self-stretch sm:w-[3.75rem]" : "h-12 w-12 sm:h-14 sm:w-14";
  const icon = tall ? "absolute left-1/2 top-1/2 h-12 w-12 sm:h-14 sm:w-14" : "absolute inset-0 h-full w-full";
  const turn = { transform: `${tall ? "translate(-50%, -50%) " : ""}rotate(${ROTATE[dir]}deg)` };

  return (
    <span
      aria-hidden
      className={`relative block shrink-0 border border-transparent bg-transparent text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white group-focus-visible:border-ink group-focus-visible:bg-ink group-focus-visible:text-white ${box} ${className ?? ""}`}
    >
      <svg viewBox="0 0 56 56" style={turn} className={icon} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M21 13l15 15-15 15" />
      </svg>
    </span>
  );
}
