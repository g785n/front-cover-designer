/** Editorial Workshop: the page behaves as a crafted print studio with an exact artboard and progressive tools. */
import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { Download, Grid3X3, Maximize, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import CoverCanvas from "@/components/editor/CoverCanvas";
import PropertiesPanel from "@/components/editor/PropertiesPanel";
import StudioSidebar, { type StudioPanel } from "@/components/editor/StudioSidebar";
import {
  COVER_HEIGHT,
  COVER_WIDTH,
  STUDIO_ASSETS,
  cloneElements,
  createTemplates,
  makeId,
  readReportPaletteFromUrl,
  type CoverBackground,
  type CoverElement,
  type CoverTemplate,
  type ShapeKind,
} from "@/lib/cover-editor";

const fileToDataUrl = (file: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const downloadSvgAsPng = async (svg: SVGSVGElement, filename: string) => {
  await document.fonts.ready;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.querySelectorAll("[data-editor-ui]").forEach((node) => node.remove());
  clone.setAttribute("width", String(COVER_WIDTH));
  clone.setAttribute("height", String(COVER_HEIGHT));
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const images = Array.from(clone.querySelectorAll("image"));
  await Promise.all(
    images.map(async (image) => {
      const href = image.getAttribute("href");
      if (!href || href.startsWith("data:")) return;
      try {
        const response = await fetch(href);
        const blob = await response.blob();
        image.setAttribute("href", await fileToDataUrl(blob));
      } catch {
        // Same-origin assets can remain linked if conversion is unavailable.
      }
    }),
  );

  const xml = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();
  image.decoding = "sync";

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Unable to render the cover."));
    image.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = COVER_WIDTH;
  canvas.height = COVER_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas export is not supported by this browser.");
  context.drawImage(image, 0, 0, COVER_WIDTH, COVER_HEIGHT);
  URL.revokeObjectURL(url);

  const png = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Unable to create PNG."))), "image/png"),
  );
  const pngUrl = URL.createObjectURL(png);
  const link = document.createElement("a");
  link.href = pngUrl;
  link.download = `${filename.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "front-cover"}.png`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
};

export default function Home() {
  const templates = useMemo(() => createTemplates(), []);
  const firstTemplate = templates[1];
  const reportPaletteResult = useMemo(() => readReportPaletteFromUrl(window.location.search), []);
  const hasReportPalette = reportPaletteResult.inheritedCount > 0;
  const initialBackground = useMemo<CoverBackground>(() => hasReportPalette
    ? { mode: "linear", color1: reportPaletteResult.palette.primary, color2: reportPaletteResult.palette.accent1, angle: 135 }
    : { ...firstTemplate.background }, [firstTemplate.background, hasReportPalette, reportPaletteResult.palette]);
  const [panel, setPanel] = useState<StudioPanel>("templates");
  const [elements, setElements] = useState<CoverElement[]>(() => hasReportPalette ? [] : cloneElements(firstTemplate.elements));
  const [background, setBackground] = useState<CoverBackground>(() => initialBackground);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(78);
  const [showGrid, setShowGrid] = useState(false);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [documentName, setDocumentName] = useState(hasReportPalette ? "Report palette background" : "New perspective");
  const [isExporting, setIsExporting] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const selectedElement = elements.find((element) => element.id === selectedId);

  const updateSelected = (patch: Partial<CoverElement>) => {
    if (!selectedId) return;
    setElements((current) => current.map((element) => (element.id === selectedId ? { ...element, ...patch } : element)));
  };

  const addElement = (element: CoverElement) => {
    setElements((current) => [...current, element]);
    setSelectedId(element.id);
  };

  const changeBackground = (nextBackground: CoverBackground) => {
    setBackground(nextBackground);
    setElements((current) => current.filter((element) => !(
      element.type === "image" &&
      element.locked &&
      element.x === 0 &&
      element.y === 0 &&
      element.width === COVER_WIDTH &&
      element.height === COVER_HEIGHT
    )));
    setSelectedId(null);
  };

  const applyReportColour = (color: string) => {
    if (selectedElement?.type === "shape") {
      const strokeOnly = selectedElement.shape && ["line", "ring", "arc", "wave"].includes(selectedElement.shape);
      updateSelected(strokeOnly ? { stroke: color } : { fill: color, ...(selectedElement.shape === "bubbles" ? { stroke: color } : {}) });
      toast.success("Report colour applied to the selected element.");
      return;
    }
    changeBackground({ ...background, color1: color, ...(background.mode === "solid" ? { color2: color } : {}) });
    toast.success("Report colour applied to the background.");
  };

  const addShape = (shape: ShapeKind) => {
    const options: Record<ShapeKind, { name: string; x: number; y: number; width: number; height: number; fill: string; stroke: string; strokeWidth: number; opacity: number; radius?: number }> = {
      rectangle: { name: "Rectangle", x: 170, y: 170, width: 250, height: 180, fill: "#F04E30", stroke: "#F04E30", strokeWidth: 0, opacity: 1, radius: 8 },
      ellipse: { name: "Circle", x: 190, y: 150, width: 210, height: 210, fill: "#F04E30", stroke: "#F04E30", strokeWidth: 0, opacity: 1 },
      line: { name: "Line", x: 170, y: 340, width: 360, height: 30, fill: "transparent", stroke: "#20211F", strokeWidth: 7, opacity: 1 },
      ring: { name: "Ring", x: 180, y: 150, width: 230, height: 230, fill: "transparent", stroke: "#173B72", strokeWidth: 12, opacity: 0.9 },
      arc: { name: "Arch", x: 150, y: 170, width: 390, height: 290, fill: "transparent", stroke: "#F04E30", strokeWidth: 13, opacity: 0.9 },
      wave: { name: "Wave", x: 120, y: 250, width: 700, height: 250, fill: "transparent", stroke: "#173B72", strokeWidth: 18, opacity: 0.88 },
      bubbles: { name: "Soft bubbles", x: 500, y: 90, width: 480, height: 470, fill: "#FFFFFF", stroke: "#FFFFFF", strokeWidth: 2, opacity: 0.52 },
      dots: { name: "Dot field", x: 90, y: 460, width: 430, height: 190, fill: "#20211F", stroke: "#20211F", strokeWidth: 0, opacity: 0.34 },
    };
    const option = options[shape];
    addElement({
      id: makeId(),
      name: option.name,
      type: "shape",
      shape,
      x: option.x,
      y: option.y,
      width: option.width,
      height: option.height,
      rotation: 0,
      opacity: option.opacity,
      fill: option.fill,
      stroke: option.stroke,
      strokeWidth: option.strokeWidth,
      radius: option.radius || 0,
    });
  };

  const uploadImage = (file: File, kind: "photo" | "logo") => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result);
      const image = new Image();
      image.onload = () => {
        const maxWidth = kind === "logo" ? 260 : 560;
        const maxHeight = kind === "logo" ? 180 : 400;
        const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
        const width = Math.max(80, image.width * scale);
        const height = Math.max(60, image.height * scale);
        addElement({
          id: makeId(),
          name: kind === "logo" ? "Logo" : file.name.replace(/\.[^.]+$/, ""),
          type: "image",
          x: (COVER_WIDTH - width) / 2,
          y: (COVER_HEIGHT - height) / 2,
          width,
          height,
          rotation: 0,
          opacity: 1,
          src,
          fit: kind === "logo" ? "contain" : "cover",
          radius: 0,
        });
        toast.success(kind === "logo" ? "Logo added to the background." : "Photo added to the background.");
      };
      image.src = src;
    };
    reader.readAsDataURL(file);
  };

  const applyTemplate = (template: CoverTemplate) => {
    setElements(cloneElements(template.elements));
    setBackground({ ...template.background });
    setDocumentName(template.name);
    setSelectedId(null);
    toast.success(`${template.name} layout applied.`);
  };

  const duplicateSelected = () => {
    if (!selectedElement) return;
    const copy = {
      ...selectedElement,
      id: makeId(),
      name: `${selectedElement.name} copy`,
      x: selectedElement.x + 24,
      y: selectedElement.y + 24,
      locked: false,
    };
    addElement(copy);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setElements((current) => current.filter((element) => element.id !== selectedId));
    setSelectedId(null);
  };

  const reorderSelected = (direction: "up" | "down") => {
    if (!selectedId) return;
    setElements((current) => {
      const index = current.findIndex((element) => element.id === selectedId);
      const target = direction === "up" ? index + 1 : index - 1;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const file = Array.from(event.dataTransfer.files).find((candidate) => candidate.type.startsWith("image/"));
    if (file) uploadImage(file, "photo");
  };

  const exportCover = async () => {
    if (!svgRef.current) return;
    setIsExporting(true);
    try {
      await downloadSvgAsPng(svgRef.current, documentName);
      toast.success("Background exported at exactly 1,066 × 735 px.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The PNG could not be generated.");
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if ((event.key === "Delete" || event.key === "Backspace") && selectedId) {
        event.preventDefault();
        deleteSelected();
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d" && selectedId) {
        event.preventDefault();
        duplicateSelected();
      }
      if (event.key === "Escape") setSelectedId(null);
      if (selectedId && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
        const step = event.shiftKey ? 10 : 1;
        const patch =
          event.key === "ArrowUp"
            ? { y: (selectedElement?.y || 0) - step }
            : event.key === "ArrowDown"
              ? { y: (selectedElement?.y || 0) + step }
              : event.key === "ArrowLeft"
                ? { x: (selectedElement?.x || 0) - step }
                : { x: (selectedElement?.x || 0) + step };
        updateSelected(patch);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="studio-app">
      <header className="studio-topbar">
        <div className="studio-brand">
          <img src={STUDIO_ASSETS.mark} alt="Cover Studio symbol" />
          <div><strong>Cover</strong><span>STUDIO</span></div>
        </div>
        <div className="document-meta">
          <label>
            <span className="sr-only">Cover name</span>
            <input value={documentName} onChange={(event) => setDocumentName(event.target.value)} />
          </label>
          <span className="saved-state"><i /> Working locally</span>
        </div>
        <div className="topbar-actions">
          <span className="size-pill"><Maximize size={15} /> 1,066 × 735 px</span>
          <button className="export-button" onClick={exportCover} disabled={isExporting}>
            {isExporting ? <Sparkles size={18} className="spin-soft" /> : <Download size={18} />}
            {isExporting ? "Preparing background…" : "Export background PNG"}
          </button>
        </div>
      </header>

      <main className="studio-main">
        <StudioSidebar
          panel={panel}
          templates={templates}
          background={background}
          reportPalette={reportPaletteResult.palette}
          inheritedColourCount={reportPaletteResult.inheritedCount}
          selectedElement={selectedElement}
          onPanelChange={setPanel}
          onTemplate={applyTemplate}
          onAddShape={addShape}
          onUpload={uploadImage}
          onBackground={changeBackground}
          onApplyReportColour={applyReportColour}
        />

        <section className="pasteboard" onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
          <div className="pasteboard-intro">
            <p>BACKGROUND ARTWORK / LIVE ARTBOARD</p>
            <span>Your report title will be added automatically</span>
          </div>
          <div className="canvas-stage">
            <CoverCanvas
              elements={elements}
              background={background}
              selectedId={selectedId}
              zoom={zoom}
              showGrid={showGrid}
              showSafeZone={showSafeZone}
              svgRef={svgRef}
              onSelect={setSelectedId}
              onChange={setElements}
            />
          </div>
          <div className="canvas-controls">
            <button className={showGrid ? "active" : ""} onClick={() => setShowGrid((value) => !value)}><Grid3X3 size={16} /> Grid</button>
            <button className={showSafeZone ? "active" : ""} onClick={() => setShowSafeZone((value) => !value)}><ShieldCheck size={16} /> Title-safe</button>
            <span className="control-separator" />
            <button className="zoom-step" onClick={() => setZoom((value) => Math.max(45, value - 5))}>−</button>
            <input aria-label="Zoom" type="range" min="45" max="100" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
            <button className="zoom-step" onClick={() => setZoom((value) => Math.min(100, value + 5))}>+</button>
            <strong>{zoom}%</strong>
          </div>
        </section>

        <PropertiesPanel
          element={selectedElement}
          elements={elements}
          background={background}
          reportPalette={reportPaletteResult.palette}
          onUpdate={updateSelected}
          onApplyReportColour={applyReportColour}
          onSelect={setSelectedId}
          onDuplicate={duplicateSelected}
          onDelete={deleteSelected}
          onReorder={reorderSelected}
        />
      </main>
    </div>
  );
}
