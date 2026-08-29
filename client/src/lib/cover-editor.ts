/** Editorial Workshop: background-only compositions combine print-led colour fields, imagery, and restrained geometry. */
export const COVER_WIDTH = 1066;
export const COVER_HEIGHT = 735;
export type BubbleEnvironment = "test" | "live";
export const BUBBLE_COVER_WORKFLOWS: Record<BubbleEnvironment, string> = {
  test: "https://boevaluate.bubbleapps.io/version-test/api/1.1/wf/coverstudio",
  live: "https://boevaluate.bubbleapps.io/api/1.1/wf/coverstudio",
};

export const STUDIO_ASSETS = {
  boardformsBlack: "/manus-storage/boardforms-wordmark-black_31eeb753.svg",
  boardformsWhite: "/manus-storage/boardforms-wordmark-white_4bf18f88.png",
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

export type TitlePosition = "top-left" | "top-centre" | "top-right" | "middle-left" | "middle-centre" | "middle-right" | "bottom-left" | "bottom-centre" | "bottom-right";
export type DatePosition = "title" | "bottom-left" | "hidden";
export type ReportOverlaySettings = {
  titlePosition: TitlePosition;
  datePosition: DatePosition;
};

export type TitlePlacement = {
  value: TitlePosition;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  align: "left" | "centre" | "right";
};

export const DEFAULT_REPORT_OVERLAY: ReportOverlaySettings = {
  titlePosition: "middle-left",
  datePosition: "title",
};

export const TITLE_PLACEMENTS: TitlePlacement[] = [
  { value: "top-left", label: "Top left", x: 55, y: 55, width: 430, height: 160, align: "left" },
  { value: "top-centre", label: "Top centre", x: 258, y: 55, width: 550, height: 160, align: "centre" },
  { value: "top-right", label: "Top right", x: 581, y: 55, width: 430, height: 160, align: "right" },
  { value: "middle-left", label: "Middle left", x: 55, y: 280, width: 430, height: 150, align: "left" },
  { value: "middle-centre", label: "Middle centre", x: 258, y: 280, width: 550, height: 150, align: "centre" },
  { value: "middle-right", label: "Middle right", x: 581, y: 280, width: 430, height: 150, align: "right" },
  { value: "bottom-left", label: "Bottom left", x: 55, y: 530, width: 430, height: 145, align: "left" },
  { value: "bottom-centre", label: "Bottom centre", x: 258, y: 530, width: 550, height: 145, align: "centre" },
  { value: "bottom-right", label: "Bottom right", x: 581, y: 530, width: 430, height: 145, align: "right" },
];

const titlePositionValues = new Set<TitlePosition>(TITLE_PLACEMENTS.map(({ value }) => value));
const datePositionValues = new Set<DatePosition>(["title", "bottom-left", "hidden"]);

export const readReportOverlayFromUrl = (search: string) => {
  const params = new URLSearchParams(search);
  const rawTitle = params.get("titlePosition");
  const rawDate = params.get("datePosition");
  const titlePosition = rawTitle && titlePositionValues.has(rawTitle as TitlePosition) ? rawTitle as TitlePosition : DEFAULT_REPORT_OVERLAY.titlePosition;
  const datePosition = rawDate && datePositionValues.has(rawDate as DatePosition) ? rawDate as DatePosition : DEFAULT_REPORT_OVERLAY.datePosition;
  return {
    settings: { titlePosition, datePosition } satisfies ReportOverlaySettings,
    hasValidParams: Boolean((rawTitle && titlePositionValues.has(rawTitle as TitlePosition)) || (rawDate && datePositionValues.has(rawDate as DatePosition))),
  };
};

export const getTitlePlacement = (position: TitlePosition) => TITLE_PLACEMENTS.find(({ value }) => value === position) ?? TITLE_PLACEMENTS[3];

export const readCompanyIdFromUrl = (search: string) => {
  const company = new URLSearchParams(search).get("company")?.trim() ?? "";
  return /^\d+x\d+$/.test(company) ? company : null;
};

export const readBubbleEnvironmentFromUrl = (search: string): BubbleEnvironment => {
  const environment = new URLSearchParams(search).get("bubbleEnv")?.trim().toLowerCase();
  return environment === "live" ? "live" : "test";
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

export const reportConfigurationQuery = (palette: ReportPalette, overlay: ReportOverlaySettings, companyId?: string | null, bubbleEnvironment: BubbleEnvironment = "test") => {
  const params = new URLSearchParams();
  REPORT_PALETTE_LABELS.forEach(({ key }) => params.set(key, palette[key].slice(1)));
  params.set("titlePosition", overlay.titlePosition);
  params.set("datePosition", overlay.datePosition);
  if (companyId) params.set("company", companyId);
  params.set("bubbleEnv", bubbleEnvironment);
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
    background: background("solid", "#EDF7FA"),
    elements: [],
  },
  {
    id: "bubbles",
    name: "Boardroom Air",
    eyebrow: "Report-ready geometry",
    background: background("radial", "#F5FBFC", "#B9DDE8", 0),
    elements: [
      shapeElement("Soft bubble field", "bubbles", 470, 55, 530, 560, "#FFFFFF", 0.48),
      shapeElement("Boardforms green ring", "ring", 85, 465, 175, 175, "transparent", 0.72, "#168B68", 8),
    ],
  },
  {
    id: "quiet-wave",
    name: "Governance Flow",
    eyebrow: "Report-ready gradient",
    background: background("linear", "#EAF6FA", "#9FCEDB", 145),
    elements: [
      shapeElement("Governance navy wave", "wave", 0, 310, 1066, 330, "transparent", 0.86, "#1E3A5F", 28),
      shapeElement("Boardforms green arc", "arc", 600, 80, 390, 340, "transparent", 0.82, "#168B68", 12),
    ],
  },
  {
    id: "signal",
    name: "Decision Field",
    eyebrow: "Report-ready structure",
    background: background("linear", "#168B68", "#8CDABF", 118),
    elements: [
      shapeElement("Governance navy panel", "rectangle", 690, 0, 376, 735, "#1E3A5F"),
      shapeElement("White orbit", "ring", 748, 190, 235, 235, "transparent", 0.94, "#FFFFFF", 16),
      shapeElement("Evidence dot field", "dots", 70, 480, 410, 170, "#172D46", 0.33),
    ],
  },
  {
    id: "architecture",
    name: "New Perspective",
    eyebrow: "Editorial architecture",
    thumbnail: STUDIO_ASSETS.architecture,
    background: background("solid", "#E9E0D3"),
    elements: [imageElement("Architecture artwork", STUDIO_ASSETS.architecture)],
  },
  {
    id: "botanical",
    name: "Natural Growth",
    eyebrow: "Editorial image",
    thumbnail: STUDIO_ASSETS.botanical,
    background: background("solid", "#EBE7DA"),
    elements: [imageElement("Botanical artwork", STUDIO_ASSETS.botanical)],
  },
  {
    id: "coast",
    name: "Bright Horizons",
    eyebrow: "Editorial image",
    thumbnail: STUDIO_ASSETS.coast,
    background: background("solid", "#DAD1B8"),
    elements: [imageElement("Coastal artwork", STUDIO_ASSETS.coast)],
  },
];

export const cloneElements = (elements: CoverElement[]) => elements.map((element) => ({ ...element, id: makeId() }));
