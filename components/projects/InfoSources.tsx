import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";

/** "A spreadsheet + a PDF + a map = one tool": the places recruiters had to look, with the
 *  one tool that replaces them underneath. Decoration plus one line of text; the whole thing is read as a single
 *  sentence. */

const SOURCES = [
  { file: "giuson/src-sheets.png", width: 326, height: 240 },
  { file: "giuson/src-pdf.png", width: 240, height: 240 },
  { file: "giuson/src-maps.png", width: 240, height: 240 },
] as const;

export function InfoSources() {
  return (
    <div
      role="img"
      aria-label="A spreadsheet, a PDF and a map: one tool: Giuson"
      className="flex flex-col items-center gap-5 text-center md:gap-6"
    >
      <div aria-hidden className="flex h-14 items-center gap-4 md:h-20 md:gap-6">
        {SOURCES.map((src, i) => (
          <div key={src.file} className="flex h-full items-center gap-4 md:gap-6">
            {i > 0 ? (
              <span className="font-display text-3xl font-light leading-none text-ink-muted md:text-4xl">+</span>
            ) : null}
            <Image
              src={pictureSrc(src.file)}
              alt=""
              width={src.width}
              height={src.height}
              className="h-full w-auto"
              sizes="120px"
            />
          </div>
        ))}
      </div>
      <span aria-hidden className="font-display text-4xl font-light leading-none text-accent md:text-5xl">
        =
      </span>
      <p aria-hidden className="font-display text-2xl font-semibold leading-[1.15] text-ink md:text-3xl">
        One tool: <span className="text-accent">Giuson</span>
      </p>
    </div>
  );
}
