/** How each project's picture sits inside its circle. `contain` shows a whole picture on a soft
 *  backdrop; `cover` fills the circle and crops the edges. */
export const CROP: Record<string, { fit: "cover" | "contain"; position?: string; backdrop?: string; scale?: string; previewBg?: string }> = {
  kindred: { fit: "cover", position: "50% 50%", previewBg: "#06090A" },
  giuson: { fit: "cover", position: "50% 55%" },
  "mundos-mejores": { fit: "cover", position: "50% 42%" },
  "better-eater": { fit: "contain", backdrop: "bg-surface-raised", scale: "scale-[1.12]" },
  alutit: { fit: "cover", position: "50% 38%" },
  afterlife: { fit: "cover", position: "50% 50%", backdrop: "bg-black" },
  jabberwocky: { fit: "contain", backdrop: "bg-surface-raised", scale: "scale-[1.04]" },
};

/** The picture each project shows in the Work page's grid, a 3:2 rectangle: the file, how it fits and
 *  where it sits, and the colour behind it when the whole picture is shown. */
export const WORK_IMAGES: Record<string, { file: string; fit?: "cover" | "contain"; position?: string; backdrop?: string }> = {
  kindred: { file: "kindred/card.jpg" },
  giuson: { file: "giuson/giuson banner.jpg" },
  "mundos-mejores": { file: "mundos mejores/web/summer 2.jpg", position: "50% 40%" },
  "better-eater": { file: "bettereater/hero.png", position: "50% 40%" },
  alutit: { file: "alutit/Alutit rainbow.png", fit: "contain", backdrop: "#000" },
  afterlife: { file: "afterlife/entrance-poster.jpg" },
  jabberwocky: { file: "jabberwocky/book-mockup.jpg", position: "50% 55%" },
};
