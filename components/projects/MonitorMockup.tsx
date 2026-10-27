import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";

/** A screenshot shown on a desktop monitor. The frame is a cut-out whose screen is transparent; the
 *  screenshot sits behind it, cropped to the screen's shape from the top. */
export function MonitorMockup({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="relative mx-auto aspect-[1100/884] w-full max-w-[22rem] drop-shadow-[0_24px_30px_rgba(26,25,22,0.18)] md:max-w-[30rem]">
      <div className="absolute left-[2.23%] top-[2.77%] h-[74.68%] w-[95.54%] overflow-hidden bg-white">
        <Image src={pictureSrc(src)} alt={alt} fill className="object-cover object-top" sizes={sizes} />
      </div>
      <Image
        src={pictureSrc("giuson/monitor-frame.png")}
        alt=""
        width={1100}
        height={884}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        sizes={sizes}
      />
    </div>
  );
}
