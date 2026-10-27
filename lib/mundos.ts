import type { RetabloBox } from "@/components/projects/RetabloSelector";

/** The five Mundos Mejores retablos, in box order. Each box has its own page at
 *  /work/mundos-mejores/[slug]. */
export const MUNDOS_BOXES: RetabloBox[] = [
  {
    slug: "familia",
    title: "Familia",
    lid: "Mundos Mejores",
    description:
      "A family gathered together, arms linked around the recurring figure, with framed memories hanging on the wall behind them. The box that holds the people who remember her.",
    retablo: "Retablo 1 web.webp",
    retabloWidth: 1200,
    retabloHeight: 456,
    open: { prefix: "retablo-anim/1", width: 1316, height: 259, left: 318, right: 985, lid: 52 },
    images: [
      { file: "mundos mejores/web/Familia 1.jpg", width: 2400, height: 925, alt: "The \"Mundos Mejores\" box: a family of figures standing arm in arm" },
      { file: "mundos mejores/web/familia 2.jpg", width: 2400, height: 1450, alt: "Family box, detail view" },
      { file: "mundos mejores/web/familia 3.jpg", width: 2400, height: 1338, alt: "Family box, detail view" },
    ],
  },
  {
    slug: "between-the-stars",
    title: "Between the Stars",
    lid: "Entre las Estrellas",
    description:
      "The figure on a swing, reaching up toward painted stars that hang on chains. A night sky small enough to hold, and a moment of wonder at whatever lies beyond it.",
    retablo: "Retablo 2 web.webp",
    retabloWidth: 761,
    retabloHeight: 1200,
    open: { prefix: "retablo-anim/2", width: 1080, height: 864, left: 262, right: 796, lid: 64 },
    images: [
      { file: "mundos mejores/web/between the stars.jpg", width: 2400, height: 1600, alt: "A figure swinging among hanging painted stars" },
      { file: "mundos mejores/web/between the stars2.jpg", width: 1600, height: 2400, alt: "Stars box, detail view" },
      { file: "mundos mejores/web/between stars 3.jpg", width: 1600, height: 2400, alt: "Stars box, detail view" },
    ],
  },
  {
    slug: "summer",
    title: "Never-Ending Summer",
    lid: "Verano sin Fin",
    description:
      "An endless summer: the figure stands under a smiling sun, flowers blooming around her and hummingbirds flying across the doors. A warm moment held still, for as long as the box stays open.",
    verse: ["Maybe I'll find you where the sun never sets,", "and the scent of jasmine fills the air."],
    retablo: "Retablo 3 web.webp",
    retabloWidth: 1075,
    retabloHeight: 1200,
    open: { prefix: "retablo-anim/3", width: 966, height: 526, left: 251, right: 717, lid: 55 },
    images: [
      { file: "mundos mejores/web/summer 1.jpg", width: 2400, height: 1665, alt: "A figure basking beneath a smiling sun and blooming flowers" },
      { file: "mundos mejores/web/summer 2.jpg", width: 2400, height: 1368, alt: "Never-Ending Summer box, detail view" },
      { file: "mundos mejores/web/summer 3.jpg", width: 2400, height: 2177, alt: "Never-Ending Summer box, detail view" },
      { file: "mundos mejores/web/summer 4.jpg", width: 1600, height: 2400, alt: "Never-Ending Summer box, detail view" },
    ],
  },
  {
    slug: "underwater",
    title: "Underwater",
    lid: "Bajo el Agua",
    description:
      "The figure in a swimsuit and flippers, hanging weightless in a tiled pool, one hand raised in a wave. A playful memory of floating, with nothing to carry.",
    retablo: "Retablo 4 web.webp",
    retabloWidth: 1107,
    retabloHeight: 1200,
    open: { prefix: "retablo-anim/4", width: 1045, height: 571, left: 257, right: 777, lid: 70 },
    images: [
      { file: "mundos mejores/web/underwater1.jpg", width: 1600, height: 2400, alt: "A figure in a swimsuit and flippers, suspended underwater" },
      { file: "mundos mejores/web/underwater 2.jpg", width: 2400, height: 1600, alt: "Underwater box, detail view" },
      { file: "mundos mejores/web/underwater 3.jpg", width: 1736, height: 2400, alt: "Underwater box, detail view" },
    ],
  },
  {
    slug: "biblioteca",
    title: "Endless Library",
    lid: "Biblioteca Infinita",
    description:
      "The figure reading among stacks of books beneath a chandelier, in a library that never ends. A box about curiosity, and about all the stories still left to read.",
    retablo: "Retablo 5 web.webp",
    retabloWidth: 771,
    retabloHeight: 1200,
    open: { prefix: "retablo-anim/5", width: 960, height: 772, left: 248, right: 722, lid: 66 },
    images: [
      { file: "mundos mejores/web/biblioteca1.jpg", width: 2400, height: 1699, alt: "A figure reading among towering stacks of books" },
      { file: "mundos mejores/web/biblioteca 2.jpg", width: 2400, height: 1925, alt: "Endless Library box, detail view" },
    ],
  },
];

/** "01"–"05" label for a box index. */
export const boxNumber = (i: number) => String(i + 1).padStart(2, "0");

export function getBox(slug: string) {
  const index = MUNDOS_BOXES.findIndex((box) => box.slug === slug);
  return index === -1 ? null : { box: MUNDOS_BOXES[index], index };
}
