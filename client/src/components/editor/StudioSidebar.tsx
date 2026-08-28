/** Editorial Workshop: creation tools now focus on background imagery, report-driven colour, gradients, and quiet geometric accents. */
import { useState } from "react";
import { Check, Circle, Copy, ImagePlus, LayoutTemplate, Minus, Palette, RectangleHorizontal, Shapes, Upload } from "lucide-react";
import { REPORT_PALETTE_LABELS, STUDIO_ASSETS, backgroundToCss, reportConfigurationQuery, type CoverBackground, type CoverElement, type CoverTemplate, type ReportOverlaySettings, type ReportPalette, type ShapeKind } from "@/lib/cover-editor";

export type StudioPanel = "templates" | "images" | "shapes" | "brand";

type StudioSidebarProps = {
  panel: StudioPanel;
  templates: CoverTemplate[];
  background: CoverBackground;
  reportPalette: ReportPalette;
  inheritedColourCount: number;
  overlaySettings: ReportOverlaySettings;
  selectedElement?: CoverElement;
  onPanelChange: (panel: StudioPanel) => void;
  onTemplate: (template: CoverTemplate) => void;
  onAddShape: (kind: ShapeKind) => void;
  onUpload: (file: File, kind: "photo" | "logo") => void;
  onBackground: (background: CoverBackground) => void;
  onApplyReportColour: (color: string) => void;
};

const tools: Array<{ id: StudioPanel; label: string; icon: typeof Shapes }> = [
  { id: "brand", label: "Colours", icon: Palette },
  { id: "images", label: "Images", icon: ImagePlus },
  { id: "shapes", label: "Elements", icon: Shapes },
  { id: "templates", label: "Backgrounds", icon: LayoutTemplate },
];

const gradientPresets: Array<{ name: string; value: CoverBackground }> = [
  { name: "Sunrise", value: { mode: "linear", color1: "#F04E30", color2: "#F6C86D", angle: 118 } },
  { name: "Coastal", value: { mode: "linear", color1: "#173B72", color2: "#74C6C8", angle: 135 } },
  { name: "Mineral", value: { mode: "radial", color1: "#F5EBDD", color2: "#A8BFB2", angle: 0 } },
  { name: "Plum", value: { mode: "linear", color1: "#4D214D", color2: "#E58F65", angle: 150 } },
  { name: "Mist", value: { mode: "radial", color1: "#F8F5EF", color2: "#B9D8E5", angle: 0 } },
  { name: "Ink", value: { mode: "linear", color1: "#20211F", color2: "#173B72", angle: 115 } },
];

const elementChoices: Array<{ kind: ShapeKind; name: string }> = [
  { kind: "rectangle", name: "Rectangle" }, { kind: "ellipse", name: "Circle" }, { kind: "line", name: "Line" },
  { kind: "ring", name: "Ring" }, { kind: "arc", name: "Arch" }, { kind: "wave", name: "Wave" },
  { kind: "bubbles", name: "Bubbles" }, { kind: "dots", name: "Dot field" },
];

export default function StudioSidebar({ panel, templates, background, reportPalette, inheritedColourCount, overlaySettings, selectedElement, onPanelChange, onTemplate, onAddShape, onUpload, onBackground, onApplyReportColour }: StudioSidebarProps) {
  const [copied, setCopied] = useState(false);
  const chooseFile = (kind: "photo" | "logo") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/svg+xml";
    input.onchange = () => { const file = input.files?.[0]; if (file) onUpload(file, kind); };
    input.click();
  };

  const setMode = (mode: CoverBackground["mode"]) => onBackground({ ...background, mode, color2: background.color2 || "#173B72" });
  const reportGradientPresets: Array<{ name: string; value: CoverBackground }> = [
    { name: "Brand blend", value: { mode: "linear", color1: reportPalette.primary, color2: reportPalette.accent1, angle: 135 } },
    { name: "Chart blend", value: { mode: "linear", color1: reportPalette.accent2, color2: reportPalette.accent5, angle: 120 } },
    { name: "Rating blend", value: { mode: "linear", color1: reportPalette.positive, color2: reportPalette.average, angle: 145 } },
    { name: "Primary glow", value: { mode: "radial", color1: reportPalette.contrast, color2: reportPalette.primary, angle: 0 } },
  ];

  const copyPaletteUrl = async () => {
    const url = `${window.location.origin}${window.location.pathname}?${reportConfigurationQuery(reportPalette, overlaySettings)}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <aside className="studio-sidebar">
      <nav className="tool-rail" aria-label="Cover tools">
        {tools.map(({ id, label, icon: Icon }) => <button key={id} className={`rail-button ${panel === id ? "active" : ""}`} onClick={() => onPanelChange(id)} aria-pressed={panel === id}><Icon size={20} strokeWidth={1.8} /><span>{label}</span></button>)}
      </nav>

      <section className="tool-drawer">
        {panel === "templates" && <>
          <div className="drawer-heading"><p>Choose a starting point</p><h2>Backgrounds</h2></div>
          <div className="template-list">
            {templates.map((template, index) => <button key={template.id} className="template-card" onClick={() => onTemplate(template)}>
              <span className="template-preview" style={{ background: backgroundToCss(template.background) }}>
                {template.thumbnail ? <img src={template.thumbnail} alt="" /> : template.id === "bubbles" ? <span className="bubble-mini"><i /><i /><i /><i /></span> : template.id === "signal" ? <span className="bold-mini"><i /></span> : template.id === "quiet-wave" ? <span className="wave-mini">∿</span> : <span className="blank-mini">+</span>}
              </span>
              <span className="template-copy"><small>{template.eyebrow}</small><strong>{template.name}</strong></span>
            </button>)}
          </div>
        </>}

        {panel === "images" && <>
          <div className="drawer-heading"><p>Bring in your visual identity</p><h2>Images</h2></div>
          <button className="upload-card" onClick={() => chooseFile("photo")}><span className="upload-icon"><ImagePlus size={23} /></span><span><strong>Add a photo</strong><small>JPG, PNG, WebP or SVG</small></span><Upload size={17} /></button>
          <button className="upload-card" onClick={() => chooseFile("logo")}><span className="upload-icon mark-icon"><img src={STUDIO_ASSETS.boardformsBlack} alt="" /></span><span><strong>Add your mark</strong><small>Transparent PNG works best</small></span><Upload size={17} /></button>
          <div className="drawer-note"><ImagePlus size={17} /><p>Or drop an image onto the production desk and place it on the background.</p></div>
        </>}

        {panel === "shapes" && <>
          <div className="drawer-heading"><p>Add depth without clutter</p><h2>Elements</h2></div>
          <div className="shape-grid element-grid">
            {elementChoices.map(({ kind, name }) => <button key={kind} onClick={() => onAddShape(kind)}>
              <span className={`shape-glyph glyph-${kind}`} aria-hidden="true">{kind === "line" ? <Minus /> : kind === "ellipse" ? <Circle /> : kind === "rectangle" ? <RectangleHorizontal /> : null}</span>
              <span>{name}</span>
            </button>)}
          </div>
          <div className="drawer-note"><Shapes size={17} /><p>Every element can be moved, resized, rotated, recoloured, faded, and reordered.</p></div>
        </>}

        {panel === "brand" && <>
          <div className="drawer-heading"><p>Build a colour atmosphere</p><h2>Colours</h2></div>
          <div className={`palette-connection ${inheritedColourCount > 0 ? "connected" : "fallback"}`}>
            <span><i />{inheritedColourCount > 0 ? `${inheritedColourCount} URL colours connected` : "Using example report palette"}</span>
            <small>{inheritedColourCount > 0 ? "Valid values from the report URL are ready below." : "Add URL parameters to replace these fallback colours."}</small>
          </div>
          <p className="control-label report-palette-label">Report palette</p>
          <div className="report-palette-grid">
            {REPORT_PALETTE_LABELS.map(({ key, label }) => <button key={key} onClick={() => onApplyReportColour(reportPalette[key])} title={`Apply ${label}`}>
              <i style={{ background: reportPalette[key] }} /><span><b>{label}</b><small>{reportPalette[key]}</small></span>
            </button>)}
          </div>
          <p className="palette-action-hint">Click a colour to apply it to {selectedElement?.type === "shape" ? "the selected element" : "the background"}.</p>
          <div className="property-field"><span>Treatment</span><div className="segment-control text-segments gradient-mode">
            {(["solid", "linear", "radial"] as const).map((mode) => <button key={mode} className={background.mode === mode ? "active" : ""} onClick={() => setMode(mode)}>{mode === "solid" ? "Solid" : mode === "linear" ? "Linear" : "Radial"}</button>)}
          </div></div>
          <div className="gradient-colours">
            <label className="colour-field full-colour-field"><span>{background.mode === "solid" ? "Background colour" : "First colour"}</span><span className="colour-input-wrap"><input type="color" value={background.color1} onChange={(event) => onBackground({ ...background, color1: event.target.value })} /><code>{background.color1.toUpperCase()}</code></span></label>
            {background.mode !== "solid" && <label className="colour-field full-colour-field"><span>Second colour</span><span className="colour-input-wrap"><input type="color" value={background.color2} onChange={(event) => onBackground({ ...background, color2: event.target.value })} /><code>{background.color2.toUpperCase()}</code></span></label>}
          </div>
          {background.mode === "linear" && <label className="range-field gradient-angle"><span>Direction <b>{background.angle}°</b></span><input type="range" min="0" max="360" value={background.angle} onChange={(event) => onBackground({ ...background, angle: Number(event.target.value) })} /></label>}
          <p className="control-label">Report recipes</p>
          <div className="gradient-presets report-recipes">{reportGradientPresets.map((preset) => <button key={preset.name} onClick={() => onBackground({ ...preset.value })}><i style={{ background: backgroundToCss(preset.value) }} /><span>{preset.name}</span></button>)}</div>
          <p className="control-label">Gradient recipes</p>
          <div className="gradient-presets">{gradientPresets.map((preset) => <button key={preset.name} onClick={() => onBackground({ ...preset.value })}><i style={{ background: backgroundToCss(preset.value) }} /><span>{preset.name}</span></button>)}</div>
          <button className="copy-palette-url" onClick={copyPaletteUrl}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Integration URL copied" : "Copy integration URL"}</button>
          <div className="drawer-note"><Palette size={17} /><p>The copied URL includes the report palette plus title and date placement settings.</p></div>
        </>}
      </section>
    </aside>
  );
}
