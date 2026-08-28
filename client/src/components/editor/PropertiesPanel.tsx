/** Editorial Workshop: the inspector now stays focused on imagery, geometry, and background production controls. */
import { ArrowDown, ArrowUp, Copy, Lock, Trash2, Unlock } from "lucide-react";
import { COVER_HEIGHT, COVER_WIDTH, backgroundToCss, type CoverBackground, type CoverElement } from "@/lib/cover-editor";

type PropertiesPanelProps = {
  element?: CoverElement;
  elements: CoverElement[];
  background: CoverBackground;
  onUpdate: (patch: Partial<CoverElement>) => void;
  onSelect: (id: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onReorder: (direction: "up" | "down") => void;
};

const NumberField = ({ label, value, onChange, min }: { label: string; value: number; onChange: (value: number) => void; min?: number }) => <label className="number-field"><span>{label}</span><input type="number" min={min} value={Math.round(value)} onChange={(event) => onChange(Number(event.target.value))} /></label>;

export default function PropertiesPanel({ element, elements, background, onUpdate, onSelect, onDuplicate, onDelete, onReorder }: PropertiesPanelProps) {
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
        </div>}

        {element?.type === "image" && <div className="property-stack">
          <div className="property-field"><span>Image fit</span><div className="segment-control text-segments"><button className={element.fit === "cover" ? "active" : ""} onClick={() => onUpdate({ fit: "cover" })}>Fill frame</button><button className={element.fit === "contain" ? "active" : ""} onClick={() => onUpdate({ fit: "contain" })}>Show all</button></div></div>
          <NumberField label="Corner radius" min={0} value={element.radius || 0} onChange={(radius) => onUpdate({ radius })} />
          <p className="inspector-hint">Resize with the square handle. Move the image directly on the canvas.</p>
        </div>}

        {element?.type === "shape" && <div className="property-stack">
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
