import type { RetabloBox } from "@/components/projects/RetabloSelector";

/** The five Mundos Mejores retablos, in box order. Each box has its own page at
 *  /work/mundos-mejores/[slug]. */
export const MUNDOS_BOXES: RetabloBox[] = [
  {
    slug: "familia",
    title: "Familia",
    lid: "Mundos Mejores",
    retablo: "Retablo 1 web.webp",
    retabloWidth: 1200,
    retabloHeight: 456,
    images: [
      { file: "mundos mejores/web/Familia 1.jpg", alt: "The \"Mundos Mejores\" box: a family of figures standing arm in arm" },
      { file: "mundos mejores/web/familia 2.jpg", alt: "Family box, detail view" },
      { file: "mundos mejores/web/familia 3.jpg", alt: "Family box, detail view" },
    ],
  },
  {
    slug: "between-the-stars",
    title: "Between the Stars",
    lid: "Entre las Estrellas",
    retablo: "Retablo 2 web.webp",
    retabloWidth: 761,
    retabloHeight: 1200,
    images: [
      { file: "mundos mejores/web/between the stars.jpg", alt: "A figure swinging among hanging painted stars" },
      { file: "mundos mejores/web/between the stars1.jpg", alt: "Stars box, detail view" },
      { file: "mundos mejores/web/between the stars2.jpg", alt: "Stars box, detail view", portrait: true },
      { file: "mundos mejores/web/between stars 3.jpg", alt: "Stars box, detail view", portrait: true },
    ],
  },
  {
    slug: "summer",
    title: "Summer",
    lid: "Verano sin Fin",
    retablo: "Retablo 3 web.webp",
    retabloWidth: 1075,
    retabloHeight: 1200,
    images: [
      { file: "mundos mejores/web/summer 1.jpg", alt: "A figure basking beneath a smiling sun and blooming flowers" },
      { file: "mundos mejores/web/summer 2.jpg", alt: "Summer box, detail view" },
      { file: "mundos mejores/web/summer 3.jpg", alt: "Summer box, detail view" },
      { file: "mundos mejores/web/summer 4.jpg", alt: "Summer box, detail view", portrait: true },
    ],
  },
  {
    slug: "underwater",
    title: "Underwater",
    lid: "Bajo el Agua",
    retablo: "Retablo 4 web.webp",
    retabloWidth: 1107,
    retabloHeight: 1200,
    images: [
      { file: "mundos mejores/web/underwater1.jpg", alt: "A figure in a swimsuit and flippers, suspended underwater", portrait: true },
      { file: "mundos mejores/web/underwater 2.jpg", alt: "Underwater box, detail view" },
      { file: "mundos mejores/web/underwater 3.jpg", alt: "Underwater box, detail view", portrait: true },
    ],
  },
  {
    slug: "biblioteca",
    title: "Biblioteca",
    lid: "Biblioteca Infinita",
    retablo: "Retablo 5 web.webp",
    retabloWidth: 771,
    retabloHeight: 1200,
    images: [
      { file: "mundos mejores/web/biblioteca1.jpg", alt: "A figure reading among towering stacks of books" },
      { file: "mundos mejores/web/biblioteca 2.jpg", alt: "Library box, detail view" },
      { file: "mundos mejores/web/biblioteca 3.jpg", alt: "Library box, detail view" },
    ],
  },
];

/** "01"–"05" label for a box index. */
export const boxNumber = (i: number) => String(i + 1).padStart(2, "0");

export function getBox(slug: string) {
  const index = MUNDOS_BOXES.findIndex((box) => box.slug === slug);
  return index === -1 ? null : { box: MUNDOS_BOXES[index], index };
}
