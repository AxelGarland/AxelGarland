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
