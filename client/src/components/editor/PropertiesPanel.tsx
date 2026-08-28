/** Editorial Workshop: contextual properties reveal precise controls only when they are useful. */
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  Copy,
  Lock,
  Trash2,
  Unlock,
} from "lucide-react";
import { COVER_HEIGHT, COVER_WIDTH, type CoverElement } from "@/lib/cover-editor";

type PropertiesPanelProps = {
  element?: CoverElement;
  elements: CoverElement[];
  background: string;
  onBackground: (color: string) => void;
  onUpdate: (patch: Partial<CoverElement>) => void;
  onSelect: (id: string) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onReorder: (direction: "up" | "down") => void;
};

const NumberField = ({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) => (
  <label className="number-field">
    <span>{label}</span>
    <input type="number" min={min} value={Math.round(value)} onChange={(event) => onChange(Number(event.target.value))} />
  </label>
);

export default function PropertiesPanel({
  element,
  elements,
  background,
  onBackground,
  onUpdate,
  onSelect,
  onDuplicate,
  onDelete,
  onReorder,
}: PropertiesPanelProps) {
  return (
    <aside className="properties-panel">
      <div className="properties-scroll">
        <div className="properties-heading">
          <p>{element ? element.type : "Document"}</p>
          <h2>{element ? element.name : "Cover settings"}</h2>
        </div>

        {!element && (
          <div className="empty-inspector">
            <div className="dimension-display">
              <span><strong>{COVER_WIDTH.toLocaleString()}</strong> px</span>
              <i>×</i>
              <span><strong>{COVER_HEIGHT}</strong> px</span>
            </div>
            <p>Output is locked to these exact dimensions. Select an object and edit it directly on the cover.</p>
            <label className="colour-field full-colour-field">
              <span>Cover background</span>
              <span className="colour-input-wrap">
                <input type="color" value={background} onChange={(event) => onBackground(event.target.value)} />
                <code>{background.toUpperCase()}</code>
              </span>
            </label>
          </div>
        )}

        {element?.type === "text" && (
          <div className="property-stack">
            <label className="property-field">
              <span>Words</span>
              <textarea rows={4} value={element.text} onChange={(event) => onUpdate({ text: event.target.value })} />
            </label>
            <div className="field-row wide-first">
              <label className="property-field">
                <span>Typeface</span>
                <select value={element.fontFamily} onChange={(event) => onUpdate({ fontFamily: event.target.value })}>
                  <option value="DM Sans">DM Sans</option>
                  <option value="Bodoni Moda">Bodoni Moda</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </label>
              <NumberField label="Size" min={8} value={element.fontSize || 44} onChange={(fontSize) => onUpdate({ fontSize })} />
            </div>
            <div className="field-row wide-first">
              <label className="property-field">
                <span>Weight</span>
                <select value={element.fontWeight} onChange={(event) => onUpdate({ fontWeight: Number(event.target.value) })}>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="600">Semi bold</option>
                  <option value="700">Bold</option>
                </select>
              </label>
              <NumberField label="Spacing" value={element.letterSpacing || 0} onChange={(letterSpacing) => onUpdate({ letterSpacing })} />
            </div>
            <div className="property-field">
              <span>Alignment</span>
              <div className="segment-control">
                {([
                  ["left", AlignLeft],
                  ["center", AlignCenter],
                  ["right", AlignRight],
                ] as const).map(([align, Icon]) => (
                  <button key={align} className={element.align === align ? "active" : ""} onClick={() => onUpdate({ align })} aria-label={`Align ${align}`}>
                    <Icon size={17} />
                  </button>
                ))}
              </div>
            </div>
            <label className="colour-field">
              <span>Text colour</span>
              <span className="colour-input-wrap">
                <input type="color" value={element.color || "#20211F"} onChange={(event) => onUpdate({ color: event.target.value })} />
                <code>{(element.color || "#20211F").toUpperCase()}</code>
              </span>
            </label>
          </div>
        )}

        {element?.type === "image" && (
          <div className="property-stack">
            <div className="property-field">
              <span>Image fit</span>
              <div className="segment-control text-segments">
                <button className={element.fit === "cover" ? "active" : ""} onClick={() => onUpdate({ fit: "cover" })}>Fill frame</button>
                <button className={element.fit === "contain" ? "active" : ""} onClick={() => onUpdate({ fit: "contain" })}>Show all</button>
              </div>
            </div>
            <NumberField label="Corner radius" min={0} value={element.radius || 0} onChange={(radius) => onUpdate({ radius })} />
            <p className="inspector-hint">Resize with the square handle. Move the image directly on the canvas.</p>
          </div>
        )}

        {element?.type === "shape" && (
          <div className="property-stack">
            {element.shape !== "line" && (
              <label className="colour-field">
                <span>Fill colour</span>
                <span className="colour-input-wrap">
                  <input type="color" value={element.fill || "#F04E30"} onChange={(event) => onUpdate({ fill: event.target.value })} />
                  <code>{(element.fill || "#F04E30").toUpperCase()}</code>
                </span>
              </label>
            )}
            <label className="colour-field">
              <span>{element.shape === "line" ? "Line colour" : "Border colour"}</span>
              <span className="colour-input-wrap">
                <input type="color" value={element.stroke || "#20211F"} onChange={(event) => onUpdate({ stroke: event.target.value })} />
                <code>{(element.stroke || "#20211F").toUpperCase()}</code>
              </span>
            </label>
            <NumberField label={element.shape === "line" ? "Line weight" : "Border weight"} min={0} value={element.strokeWidth || 0} onChange={(strokeWidth) => onUpdate({ strokeWidth })} />
            {element.shape === "rectangle" && (
              <NumberField label="Corner radius" min={0} value={element.radius || 0} onChange={(radius) => onUpdate({ radius })} />
            )}
          </div>
        )}

        {element && (
          <>
            <div className="property-divider" />
            <div className="property-stack">
              <div className="field-row four-fields">
                <NumberField label="X" value={element.x} onChange={(x) => onUpdate({ x })} />
                <NumberField label="Y" value={element.y} onChange={(y) => onUpdate({ y })} />
                <NumberField label="W" min={1} value={element.width} onChange={(width) => onUpdate({ width })} />
                <NumberField label="H" min={1} value={element.height} onChange={(height) => onUpdate({ height })} />
              </div>
              <div className="field-row">
                <NumberField label="Rotation" value={element.rotation} onChange={(rotation) => onUpdate({ rotation })} />
                <label className="range-field">
                  <span>Opacity <b>{Math.round(element.opacity * 100)}%</b></span>
                  <input type="range" min="10" max="100" value={element.opacity * 100} onChange={(event) => onUpdate({ opacity: Number(event.target.value) / 100 })} />
                </label>
              </div>
              <div className="object-actions">
                <button onClick={() => onUpdate({ locked: !element.locked })}>{element.locked ? <Unlock size={16} /> : <Lock size={16} />}{element.locked ? "Unlock" : "Lock"}</button>
                <button onClick={onDuplicate}><Copy size={16} />Duplicate</button>
                <button className="danger" onClick={onDelete}><Trash2 size={16} />Delete</button>
              </div>
              <div className="layer-move">
                <span>Layer order</span>
                <div>
                  <button onClick={() => onReorder("up")}><ArrowUp size={16} /> Forward</button>
                  <button onClick={() => onReorder("down")}><ArrowDown size={16} /> Back</button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="property-divider" />
        <div className="layers-section">
          <div className="section-title"><span>Layers</span><b>{elements.length}</b></div>
          <div className="layer-list">
            {[...elements].reverse().map((layer) => (
              <button key={layer.id} className={element?.id === layer.id ? "active" : ""} onClick={() => onSelect(layer.id)}>
                <span className={`layer-type layer-${layer.type}`}>{layer.type === "text" ? "T" : layer.type === "image" ? "IMG" : "◼"}</span>
                <span>{layer.name}</span>
                {layer.locked && <Lock size={13} />}
              </button>
            ))}
            {elements.length === 0 && <p className="no-layers">Your objects will appear here.</p>}
          </div>
        </div>
      </div>
    </aside>
  );
}
