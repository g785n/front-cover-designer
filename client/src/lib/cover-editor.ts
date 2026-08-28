/** Editorial Workshop: background-only compositions combine print-led colour fields, imagery, and restrained geometry. */
export const COVER_WIDTH = 1066;
export const COVER_HEIGHT = 735;

export const STUDIO_ASSETS = {
  mark: "/manus-storage/cover-studio-mark_5d7d393e.png",
  architecture: "/manus-storage/editorial-architecture-cover_e54bf533.jpg",
  botanical: "/manus-storage/editorial-botanical-cover_66b091fa.jpg",
  coast: "/manus-storage/editorial-coast-cover_663a6151.jpg",
};

export type BackgroundMode = "solid" | "linear" | "radial";
export type CoverBackground = {
  mode: BackgroundMode;
  color1: string;
  color2: string;
  angle: number;
};

export type ReportPalette = {
  primary: string;
  contrast: string;
  positive: string;
  average: string;
  negative: string;
  accent1: string;
  accent2: string;
  accent3: string;
  accent4: string;
  accent5: string;
};

export type ReportPaletteResult = {
  palette: ReportPalette;
  inheritedCount: number;
};

export const DEFAULT_REPORT_PALETTE: ReportPalette = {
  primary: "#173B72",
  contrast: "#FFFFFF",
  positive: "#2D8A64",
  average: "#E2A72E",
  negative: "#C74736",
  accent1: "#F04E30",
  accent2: "#74C6C8",
  accent3: "#8E6AAF",
  accent4: "#E8D86A",
  accent5: "#3F6F5E",
};

export const REPORT_PALETTE_LABELS: Array<{ key: keyof ReportPalette; label: string }> = [
  { key: "primary", label: "Primary" },
  { key: "contrast", label: "Text contrast" },
  { key: "positive", label: "Positive" },
  { key: "average", label: "Average" },
  { key: "negative", label: "Negative" },
  { key: "accent1", label: "Chart 1" },
  { key: "accent2", label: "Chart 2" },
  { key: "accent3", label: "Chart 3" },
  { key: "accent4", label: "Chart 4" },
  { key: "accent5", label: "Chart 5" },
];

const normaliseHex = (value: string | null) => {
  if (!value) return null;
  const cleaned = value.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return `#${cleaned.split("").map((character) => character.repeat(2)).join("")}`.toUpperCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) return `#${cleaned}`.toUpperCase();
  return null;
};

export const readReportPaletteFromUrl = (search: string): ReportPaletteResult => {
  const params = new URLSearchParams(search);
  const palette = { ...DEFAULT_REPORT_PALETTE };
  let inheritedCount = 0;
  REPORT_PALETTE_LABELS.forEach(({ key }) => {
    const parsed = normaliseHex(params.get(key));
    if (parsed) {
      palette[key] = parsed;
      inheritedCount += 1;
    }
  });
  return { palette, inheritedCount };
};

export const reportPaletteQuery = (palette: ReportPalette) => {
  const params = new URLSearchParams();
  REPORT_PALETTE_LABELS.forEach(({ key }) => params.set(key, palette[key].slice(1)));
  return params.toString();
};

export type ElementType = "image" | "shape";
export type ShapeKind = "rectangle" | "ellipse" | "line" | "ring" | "arc" | "wave" | "bubbles" | "dots";

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
  background: CoverBackground;
  elements: CoverElement[];
};

export const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const backgroundToCss = (background: CoverBackground) => {
  if (background.mode === "solid") return background.color1;
  if (background.mode === "radial") return `radial-gradient(circle at 35% 30%, ${background.color1}, ${background.color2})`;
  return `linear-gradient(${background.angle}deg, ${background.color1}, ${background.color2})`;
};

const background = (mode: BackgroundMode, color1: string, color2 = color1, angle = 135): CoverBackground => ({ mode, color1, color2, angle });

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

const shapeElement = (
  name: string,
  shape: ShapeKind,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  opacity = 1,
  stroke = fill,
  strokeWidth = 0,
): CoverElement => ({ id: makeId(), name, type: "shape", shape, x, y, width, height, rotation: 0, opacity, fill, stroke, strokeWidth });

export const createTemplates = (): CoverTemplate[] => [
  {
    id: "blank",
    name: "Blank canvas",
    eyebrow: "Start fresh",
    background: background("solid", "#F4EFE6"),
    elements: [],
  },
  {
    id: "architecture",
    name: "New Perspective",
    eyebrow: "Editorial image",
    thumbnail: STUDIO_ASSETS.architecture,
    background: background("solid", "#E9E0D3"),
    elements: [imageElement("Architecture artwork", STUDIO_ASSETS.architecture)],
  },
  {
    id: "botanical",
    name: "Natural Growth",
    eyebrow: "Organic image",
    thumbnail: STUDIO_ASSETS.botanical,
    background: background("solid", "#EBE7DA"),
    elements: [imageElement("Botanical artwork", STUDIO_ASSETS.botanical)],
  },
  {
    id: "coast",
    name: "Bright Horizons",
    eyebrow: "Coastal image",
    thumbnail: STUDIO_ASSETS.coast,
    background: background("solid", "#DAD1B8"),
    elements: [imageElement("Coastal artwork", STUDIO_ASSETS.coast)],
  },
  {
    id: "bubbles",
    name: "Soft Bubbles",
    eyebrow: "Subtle geometry",
    background: background("radial", "#F9E9DD", "#B9D8E5", 0),
    elements: [
      shapeElement("Soft bubble field", "bubbles", 470, 55, 530, 560, "#FFFFFF", 0.48),
      shapeElement("Fine coral ring", "ring", 85, 465, 175, 175, "transparent", 0.72, "#F04E30", 8),
    ],
  },
  {
    id: "signal",
    name: "Signal Field",
    eyebrow: "Bold geometry",
    background: background("linear", "#F04E30", "#F6C86D", 118),
    elements: [
      shapeElement("Cobalt panel", "rectangle", 690, 0, 376, 735, "#173B72"),
      shapeElement("Ivory orbit", "ring", 748, 190, 235, 235, "transparent", 0.94, "#F4EFE6", 16),
      shapeElement("Dot field", "dots", 70, 480, 410, 170, "#20211F", 0.33),
    ],
  },
  {
    id: "quiet-wave",
    name: "Quiet Current",
    eyebrow: "Gradient form",
    background: background("linear", "#E8E2D7", "#9BC8B9", 145),
    elements: [
      shapeElement("Cobalt wave", "wave", 0, 310, 1066, 330, "transparent", 0.86, "#173B72", 28),
      shapeElement("Vermilion arc", "arc", 600, 80, 390, 340, "transparent", 0.82, "#F04E30", 12),
    ],
  },
];

export const cloneElements = (elements: CoverElement[]) => elements.map((element) => ({ ...element, id: makeId() }));
