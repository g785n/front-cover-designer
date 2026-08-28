/** Editorial Workshop: shared cover types and starter compositions use print-led naming and restrained geometry. */
export const COVER_WIDTH = 1066;
export const COVER_HEIGHT = 735;

export const STUDIO_ASSETS = {
  mark: "/manus-storage/cover-studio-mark_5d7d393e.png",
  architecture: "/manus-storage/editorial-architecture-cover_e54bf533.jpg",
  botanical: "/manus-storage/editorial-botanical-cover_66b091fa.jpg",
  coast: "/manus-storage/editorial-coast-cover_663a6151.jpg",
};

export type ElementType = "text" | "image" | "shape";
export type TextAlign = "left" | "center" | "right";
export type ShapeKind = "rectangle" | "ellipse" | "line";

export type CoverElement = {
  id: string;
  name: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked?: boolean;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  align?: TextAlign;
  letterSpacing?: number;
  lineHeight?: number;
  src?: string;
  fit?: "cover" | "contain";
  shape?: ShapeKind;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
};

export type CoverTemplate = {
  id: string;
  name: string;
  eyebrow: string;
  thumbnail?: string;
  background: string;
  elements: CoverElement[];
};

export const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const textElement = (
  name: string,
  text: string,
  x: number,
  y: number,
  width: number,
  height: number,
  size: number,
  color: string,
  weight = 700,
  family = "DM Sans",
): CoverElement => ({
  id: makeId(),
  name,
  type: "text",
  x,
  y,
  width,
  height,
  rotation: 0,
  opacity: 1,
  text,
  fontFamily: family,
  fontSize: size,
  fontWeight: weight,
  color,
  align: "left",
  letterSpacing: 0,
  lineHeight: 1.04,
});

const imageElement = (name: string, src: string): CoverElement => ({
  id: makeId(),
  name,
  type: "image",
  x: 0,
  y: 0,
  width: COVER_WIDTH,
  height: COVER_HEIGHT,
  rotation: 0,
  opacity: 1,
  src,
  fit: "cover",
  locked: true,
});

export const createTemplates = (): CoverTemplate[] => [
  {
    id: "blank",
    name: "Blank canvas",
    eyebrow: "Start fresh",
    background: "#F4EFE6",
    elements: [],
  },
  {
    id: "architecture",
    name: "New Perspective",
    eyebrow: "Editorial",
    thumbnail: STUDIO_ASSETS.architecture,
    background: "#E9E0D3",
    elements: [
      imageElement("Architecture artwork", STUDIO_ASSETS.architecture),
      {
        ...textElement("Kicker", "ANNUAL REVIEW / 2026", 74, 66, 460, 30, 17, "#20211F", 700),
        letterSpacing: 3.2,
      },
      {
        ...textElement("Title", "A NEW\nPERSPECTIVE", 68, 124, 560, 176, 76, "#20211F", 700, "Bodoni Moda"),
        lineHeight: 0.92,
      },
      textElement("Subtitle", "Ideas, progress and the shape of what comes next.", 74, 620, 460, 42, 22, "#20211F", 500),
    ],
  },
  {
    id: "botanical",
    name: "Natural Growth",
    eyebrow: "Organic",
    thumbnail: STUDIO_ASSETS.botanical,
    background: "#EBE7DA",
    elements: [
      imageElement("Botanical artwork", STUDIO_ASSETS.botanical),
      {
        ...textElement("Kicker", "IMPACT REPORT", 74, 65, 420, 26, 16, "#173B30", 700),
        letterSpacing: 4,
      },
      {
        ...textElement("Title", "GROWING\nWITH PURPOSE", 72, 130, 480, 178, 65, "#173B30", 700, "Bodoni Moda"),
        lineHeight: 0.98,
      },
      textElement("Year", "2026", 77, 610, 200, 55, 38, "#F04E30", 700),
    ],
  },
  {
    id: "coast",
    name: "Bright Horizons",
    eyebrow: "Optimistic",
    thumbnail: STUDIO_ASSETS.coast,
    background: "#DAD1B8",
    elements: [
      imageElement("Coastal artwork", STUDIO_ASSETS.coast),
      {
        ...textElement("Kicker", "OUR PLAN / 2026–2029", 65, 54, 500, 30, 16, "#183A68", 700),
        letterSpacing: 3.4,
      },
      {
        ...textElement("Title", "BRIGHTER\nHORIZONS", 62, 111, 560, 168, 72, "#183A68", 700, "Bodoni Moda"),
        lineHeight: 0.94,
      },
      textElement("Subtitle", "A practical route to positive change.", 68, 624, 440, 35, 21, "#183A68", 600),
    ],
  },
  {
    id: "bold",
    name: "Bold Signal",
    eyebrow: "Graphic",
    background: "#F04E30",
    elements: [
      {
        id: makeId(),
        name: "Cobalt panel",
        type: "shape",
        shape: "rectangle",
        x: 665,
        y: 0,
        width: 401,
        height: 735,
        rotation: 0,
        opacity: 1,
        fill: "#173B72",
        stroke: "transparent",
        strokeWidth: 0,
      },
      {
        id: makeId(),
        name: "Cream circle",
        type: "shape",
        shape: "ellipse",
        x: 753,
        y: 220,
        width: 220,
        height: 220,
        rotation: 0,
        opacity: 1,
        fill: "#F4EFE6",
        stroke: "transparent",
        strokeWidth: 0,
      },
      {
        ...textElement("Kicker", "FIELD NOTES / ISSUE 08", 62, 58, 520, 30, 17, "#20211F", 700),
        letterSpacing: 3.6,
      },
      {
        ...textElement("Title", "MAKE\nROOM FOR\nBOLD IDEAS", 58, 125, 570, 300, 75, "#20211F", 700, "Bodoni Moda"),
        lineHeight: 0.9,
      },
      textElement("Footer", "A collection of provocations, plans and possibilities.", 64, 635, 520, 32, 19, "#20211F", 600),
    ],
  },
];

export const cloneElements = (elements: CoverElement[]) =>
  elements.map((element) => ({ ...element, id: makeId() }));

