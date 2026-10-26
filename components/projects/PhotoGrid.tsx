import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";

type Photo = { file: string; alt: string; width?: number; height?: number };

/** Every photo at its own proportions, nothing cropped, laid out in columns so tall and wide ones
 *  sit together without gaps. */
export function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 md:gap-5">
      {photos.map((photo) => (
        <div key={photo.file} className="mb-4 break-inside-avoid md:mb-5">
          <Image
            src={pictureSrc(photo.file)}
            alt={photo.alt}
            width={photo.width ?? 2400}
            height={photo.height ?? 1600}
            className="h-auto w-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
