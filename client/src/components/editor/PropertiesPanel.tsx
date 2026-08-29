/** Editorial Workshop: the inspector now stays focused on imagery, geometry, and background production controls. */
import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, Lock, Trash2, Unlock } from "lucide-react";
import { COVER_HEIGHT, COVER_WIDTH, IMAGE_TREATMENTS, REPORT_PALETTE_LABELS, TITLE_PLACEMENTS, backgroundToCss, type CoverBackground, type CoverElement, type ImageTreatment, type PaletteColourKey, type ReportOverlaySettings, type ReportPalette } from "@/lib/cover-editor";

type PropertiesPanelProps = {
  element?: CoverElement;
  elements: CoverElement[];
  background: CoverBackground;
  reportPalette: ReportPalette;
  overlaySettings: ReportOverlaySettings;
  showSafeZone: boolean;
  onUpdate: (patch: Partial<CoverElement>) => void;
  onApplyReportColour: (color: string) => void;
  onOverlayChange: (settings: ReportOverlaySettings) => void;
  onShowSafeZoneChange: (show: boolean) => void;
  onSelect: (id: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onReorder: (direction: "up" | "down") => void;
};

const NumberField = ({ label, value, onChange, min }: { label: string; value: number; onChange: (value: number) => void; min?: number }) => <label className="number-field"><span>{label}</span><input type="number" min={min} value={Math.round(value)} onChange={(event) => onChange(Number(event.target.value))} /></label>;

export default function PropertiesPanel({ element, elements, background, reportPalette, overlaySettings, showSafeZone, onUpdate, onApplyReportColour, onOverlayChange, onShowSafeZoneChange, onSelect, onDuplicate, onDelete, onReorder }: PropertiesPanelProps) {
  const strokeOnly = element?.shape && ["line", "ring", "arc", "wave"].includes(element.shape);
  return (
    <aside className="properties-panel">
      <div className="properties-scroll">
        <div className="properties-heading"><p>{element ? element.type : "Background file"}</p><h2>{element ? element.name : "Output settings"}</h2></div>
        {!element && <div className="empty-inspector">
          <div className="dimension-display"><span><strong>{COVER_WIDTH.toLocaleString()}</strong> px</span><i>×</i><span><strong>{COVER_HEIGHT}</strong> px</span></div>
          <p>Your report system will add the title later, so this canvas exports clean background artwork at the exact required dimensions.</p>
          <div className="background-summary"><i style={{ background: backgroundToCss(background) }} /><span><small>{background.mode} background</small><strong>{background.mode === "solid" ? background.color1.toUpperCase() : `${background.color1.toUpperCase()} → ${background.color2.toUpperCase()}`}</strong></span></div>
          <p className="inspector-hint">Use <strong>Colours</strong> to change the background treatment, or select an element to edit it here.</p>
          <div className="overlay-settings">
            <div className="overlay-settings-head"><span><small>Report overlay preview</small><strong>Title & date area</strong></span><button className={showSafeZone ? "active" : ""} onClick={() => onShowSafeZoneChange(!showSafeZone)}>{showSafeZone ? <Eye size={15} /> : <EyeOff size={15} />}{showSafeZone ? "Shown" : "Hidden"}</button></div>
            <p className="control-label">Title position</p>
            <div className="title-placement-grid">
              {TITLE_PLACEMENTS.map(({ value, label }) => <button key={value} data-position={value} className={overlaySettings.titlePosition === value ? "active" : ""} title={label} aria-label={label} onClick={() => onOverlayChange({ ...overlaySettings, titlePosition: value })}><span className="sr-only">{label}</span></button>)}
            </div>
            <div className="selected-placement"><span>Selected zone</span><strong>{TITLE_PLACEMENTS.find(({ value }) => value === overlaySettings.titlePosition)?.label}</strong></div>
            <p className="control-label">Date placement</p>
            <div className="segment-control date-position-control"><button className={overlaySettings.datePosition === "title" ? "active" : ""} onClick={() => onOverlayChange({ ...overlaySettings, datePosition: "title" })}>In title</button><button className={overlaySettings.datePosition === "bottom-left" ? "active" : ""} onClick={() => onOverlayChange({ ...overlaySettings, datePosition: "bottom-left" })}>Bottom left</button><button className={overlaySettings.datePosition === "hidden" ? "active" : ""} onClick={() => onOverlayChange({ ...overlaySettings, datePosition: "hidden" })}>Hidden</button></div>
            <code className="overlay-url-preview">titlePosition={overlaySettings.titlePosition}<br />datePosition={overlaySettings.datePosition}</code>
            <p className="inspector-hint">These guides preview where Boardforms will overlay report text. They are never included in the exported background PNG.</p>
          </div>
        </div>}

        {element?.type === "image" && <div className="property-stack">
          <div className="property-field"><span>Image fit</span><div className="segment-control text-segments"><button className={element.fit === "cover" ? "active" : ""} onClick={() => onUpdate({ fit: "cover" })}>Fill frame</button><button className={element.fit === "contain" ? "active" : ""} onClick={() => onUpdate({ fit: "contain" })}>Show all</button></div></div>
          <div className="image-treatment-panel">
            <div className="image-treatment-heading"><span><small>Report palette treatment</small><strong>Make it feel on-brand</strong></span>{element.imageTreatment && element.imageTreatment !== "original" && <button onClick={() => onUpdate({ imageTreatment: "original" })}>Remove</button>}</div>
            <div className="treatment-options">
              {IMAGE_TREATMENTS.map(({ value, label, description }) => <button key={value} className={(element.imageTreatment || "original") === value ? "active" : ""} title={description} onClick={() => onUpdate({ imageTreatment: value as ImageTreatment, treatmentColour1: element.treatmentColour1 || "primary", treatmentColour2: element.treatmentColour2 || "accent1", treatmentStrength: element.treatmentStrength ?? 0.62 })}>{label}</button>)}
            </div>
            {(element.imageTreatment || "original") !== "original" && <>
              <div className="treatment-colour-row">
                <label><span>{element.imageTreatment === "tint" ? "Tint colour" : "Shadow / start"}</span><select value={element.treatmentColour1 || "primary"} onChange={(event) => onUpdate({ treatmentColour1: event.target.value as PaletteColourKey })}>{REPORT_PALETTE_LABELS.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}</select></label>
                {element.imageTreatment !== "tint" && <label><span>Highlight / end</span><select value={element.treatmentColour2 || "accent1"} onChange={(event) => onUpdate({ treatmentColour2: event.target.value as PaletteColourKey })}>{REPORT_PALETTE_LABELS.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}</select></label>}
              </div>
              {element.imageTreatment !== "duotone" && <label className="range-field"><span>Strength <b>{Math.round((element.treatmentStrength ?? 0.62) * 100)}%</b></span><input type="range" min="15" max="90" value={(element.treatmentStrength ?? 0.62) * 100} onChange={(event) => onUpdate({ treatmentStrength: Number(event.target.value) / 100 })} /></label>}
              <p className="inspector-hint treatment-hint">Colours stay linked to the report palette; changing URL colours refreshes this treatment automatically.</p>
            </>}
          </div>
          <NumberField label="Corner radius" min={0} value={element.radius || 0} onChange={(radius) => onUpdate({ radius })} />
          <p className="inspector-hint">Resize with the square handle. Move the image directly on the canvas.</p>
        </div>}

        {element?.type === "shape" && <div className="property-stack">
          <div className="property-field"><span>Report palette</span><div className="inspector-palette">
            {REPORT_PALETTE_LABELS.map(({ key, label }) => <button key={key} title={label} aria-label={`Apply ${label}`} style={{ background: reportPalette[key] }} onClick={() => onApplyReportColour(reportPalette[key])} />)}
          </div></div>
          {!strokeOnly && <label className="colour-field"><span>Element colour</span><span className="colour-input-wrap"><input type="color" value={element.fill || "#F04E30"} onChange={(event) => onUpdate({ fill: event.target.value, stroke: element.shape === "bubbles" ? event.target.value : element.stroke })} /><code>{(element.fill || "#F04E30").toUpperCase()}</code></span></label>}
          {(strokeOnly || element.shape === "bubbles" || element.shape === "rectangle" || element.shape === "ellipse") && <label className="colour-field"><span>{strokeOnly ? "Line colour" : "Outline colour"}</span><span className="colour-input-wrap"><input type="color" value={element.stroke || "#20211F"} onChange={(event) => onUpdate({ stroke: event.target.value })} /><code>{(element.stroke || "#20211F").toUpperCase()}</code></span></label>}
          {element.shape !== "dots" && <NumberField label={strokeOnly ? "Line weight" : "Outline weight"} min={0} value={element.strokeWidth || 0} onChange={(strokeWidth) => onUpdate({ strokeWidth })} />}
          {element.shape === "rectangle" && <NumberField label="Corner radius" min={0} value={element.radius || 0} onChange={(radius) => onUpdate({ radius })} />}
        </div>}

        {element && <>
          <div className="property-divider" />
          <div className="property-stack">
            <div className="field-row four-fields"><NumberField label="X" value={element.x} onChange={(x) => onUpdate({ x })} /><NumberField label="Y" value={element.y} onChange={(y) => onUpdate({ y })} /><NumberField label="W" min={1} value={element.width} onChange={(width) => onUpdate({ width })} /><NumberField label="H" min={1} value={element.height} onChange={(height) => onUpdate({ height })} /></div>
            <div className="field-row"><NumberField label="Rotation" value={element.rotation} onChange={(rotation) => onUpdate({ rotation })} /><label className="range-field"><span>Opacity <b>{Math.round(element.opacity * 100)}%</b></span><input type="range" min="10" max="100" value={element.opacity * 100} onChange={(event) => onUpdate({ opacity: Number(event.target.value) / 100 })} /></label></div>
            <div className="object-actions"><button onClick={() => onUpdate({ locked: !element.locked })}>{element.locked ? <Unlock size={16} /> : <Lock size={16} />}{element.locked ? "Unlock" : "Lock"}</button><button onClick={onDuplicate}><Copy size={16} />Duplicate</button><button className="danger" onClick={onDelete}><Trash2 size={16} />Delete</button></div>
            <div className="layer-move"><span>Layer order</span><div><button onClick={() => onReorder("up")}><ArrowUp size={16} /> Forward</button><button onClick={() => onReorder("down")}><ArrowDown size={16} /> Back</button></div></div>
          </div>
        </>}

        <div className="property-divider" />
        <div className="layers-section"><div className="section-title"><span>Artwork layers</span><b>{elements.length}</b></div><div className="layer-list">
          {[...elements].reverse().map((layer) => <button key={layer.id} className={element?.id === layer.id ? "active" : ""} onClick={() => onSelect(layer.id)}><span className={`layer-type layer-${layer.type}`}>{layer.type === "image" ? "IMG" : "◼"}</span><span>{layer.name}</span>{layer.locked && <Lock size={13} />}</button>)}
          {elements.length === 0 && <p className="no-layers">Add imagery or geometric elements to build the background.</p>}
        </div></div>
      </div>
    </aside>
  );
}
