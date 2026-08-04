import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";

export function ProjectPicture({
  file,
  alt,
  priority = false,
  className = "",
}: {
  file: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={pictureSrc(file)}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 100vw, 1200px"
      priority={priority}
    />
  );
}
