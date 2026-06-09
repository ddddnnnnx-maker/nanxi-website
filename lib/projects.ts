export type Project = {
  id: string;
  title: string;
  year: string;
  description: string;
  /** CSS gradient used as the vivid placeholder visual */
  gradient: string;
};

/* Placeholder content — swap titles/descriptions and (later) real images.
   The only colour in the whole site lives in these gradients. */
export const projects: Project[] = [
  {
    id: "p1",
    title: "Project One",
    year: "2024",
    description:
      "Placeholder description. A short line about what this project explores and the role I played.",
    gradient: "linear-gradient(150deg, #FF2D8B 0%, #7A2FF7 52%, #FF8A3D 100%)",
  },
  {
    id: "p2",
    title: "Project Two",
    year: "2024",
    description:
      "Placeholder description. Replace with a sentence on the problem, approach and outcome.",
    gradient: "linear-gradient(150deg, #B026FF 0%, #FF2D8B 50%, #FF6A00 100%)",
  },
  {
    id: "p3",
    title: "Project Three",
    year: "2023",
    description:
      "Placeholder description. Keep it to one or two quiet, confident lines.",
    gradient: "linear-gradient(150deg, #6A2FF7 0%, #C13BFF 45%, #FF7A18 100%)",
  },
  {
    id: "p4",
    title: "Project Four",
    year: "2023",
    description:
      "Placeholder description. Swap me out whenever you are ready.",
    gradient: "linear-gradient(150deg, #FF2D8B 0%, #8A2BE2 55%, #FFA23D 100%)",
  },
  {
    id: "p5",
    title: "Project Five",
    year: "2022",
    description:
      "Placeholder description. A final card to round out the row.",
    gradient: "linear-gradient(150deg, #9D2BFF 0%, #FF2D6B 50%, #FF9E2C 100%)",
  },
];

export const SITE = {
  name: "Nanxi Dao",
  tagline: "Designing a way out of everyday tension.",
};

/* Page-1 Hero card images (in public/slide1/). To add/replace: drop files in
   public/slide1/ and edit this list. Any aspect ratio works — they are
   cropped (object-cover) to the card's fixed shape. */
export const heroImages: string[] = [
  "/slide1/slide-1.png",
  "/slide1/slide-2.jpg",
  "/slide1/slide-3.png",
  "/slide1/slide-4.png",
  "/slide1/slide-5.png",
  "/slide1/slide-6.png",
  "/slide1/slide-7.png",
  "/slide1/slide-9.png",
  "/slide1/slide-10.png",
  "/slide1/slide-11.png",
  "/slide1/slide-12.png",
  "/slide1/slide-13.png",
  "/slide1/slide-14.png",
];
