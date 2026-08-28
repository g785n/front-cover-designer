/** Editorial Workshop: the tool rail and drawer keep creation actions legible, compact, and close to the artboard. */
import {
  Circle,
  ImagePlus,
  LayoutTemplate,
  Minus,
  Palette,
  RectangleHorizontal,
  Shapes,
  Type,
  Upload,
} from "lucide-react";
import { STUDIO_ASSETS, type CoverTemplate } from "@/lib/cover-editor";

export type StudioPanel = "templates" | "text" | "images" | "shapes" | "brand";

type StudioSidebarProps = {
  panel: StudioPanel;
  templates: CoverTemplate[];
  background: string;
  onPanelChange: (panel: StudioPanel) => void;
  onTemplate: (template: CoverTemplate) => void;
  onAddText: (kind: "title" | "subtitle" | "body") => void;
  onAddShape: (kind: "rectangle" | "ellipse" | "line") => void;
  onUpload: (file: File, kind: "photo" | "logo") => void;
  onBackground: (color: string) => void;
};

const tools: Array<{ id: StudioPanel; label: string; icon: typeof Type }> = [
  { id: "templates", label: "Layouts", icon: LayoutTemplate },
  { id: "text", label: "Text", icon: Type },
  { id: "images", label: "Images", icon: ImagePlus },
  { id: "shapes", label: "Shapes", icon: Shapes },
  { id: "brand", label: "Colours", icon: Palette },
];

const palette = ["#F4EFE6", "#FFFFFF", "#20211F", "#F04E30", "#173B72", "#173B30", "#D9CBB5", "#E8D86A"];

export default function StudioSidebar({
  panel,
  templates,
  background,
  onPanelChange,
  onTemplate,
  onAddText,
  onAddShape,
  onUpload,
  onBackground,
}: StudioSidebarProps) {
  const chooseFile = (kind: "photo" | "logo") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/svg+xml";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) onUpload(file, kind);
    };
    input.click();
  };

  return (
    <aside className="studio-sidebar">
      <nav className="tool-rail" aria-label="Cover tools">
        {tools.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`rail-button ${panel === id ? "active" : ""}`}
            onClick={() => onPanelChange(id)}
            aria-pressed={panel === id}
          >
            <Icon size={20} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <section className="tool-drawer">
        {panel === "templates" && (
          <>
            <div className="drawer-heading">
              <p>Start with a layout</p>
              <h2>Layouts</h2>
            </div>
            <div className="template-list">
              {templates.map((template, index) => (
                <button key={template.id} className="template-card" onClick={() => onTemplate(template)}>
                  <span className="template-preview" style={{ background: template.background }}>
                    {template.thumbnail ? (
                      <img src={template.thumbnail} alt="" />
                    ) : index === 4 ? (
                      <span className="bold-mini"><i />BOLD</span>
                    ) : (
                      <span className="blank-mini">+</span>
                    )}
                  </span>
                  <span className="template-copy">
                    <small>{template.eyebrow}</small>
                    <strong>{template.name}</strong>
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {panel === "text" && (
          <>
            <div className="drawer-heading">
              <p>Build your hierarchy</p>
              <h2>Text</h2>
            </div>
            <button className="text-preset text-preset-title" onClick={() => onAddText("title")}>
              Add a title
            </button>
            <button className="text-preset text-preset-subtitle" onClick={() => onAddText("subtitle")}>
              Add a subtitle
            </button>
            <button className="text-preset text-preset-body" onClick={() => onAddText("body")}>
              Add body copy
            </button>
            <div className="drawer-note">
              <Type size={17} />
              <p>Select words on the cover, then shape their type, size, colour, spacing and alignment here.</p>
            </div>
          </>
        )}

        {panel === "images" && (
          <>
            <div className="drawer-heading">
              <p>Bring in your visual identity</p>
              <h2>Images</h2>
            </div>
            <button className="upload-card" onClick={() => chooseFile("photo")}>
              <span className="upload-icon"><ImagePlus size={23} /></span>
              <span><strong>Add a photo</strong><small>JPG, PNG, WebP or SVG</small></span>
              <Upload size={17} />
            </button>
            <button className="upload-card" onClick={() => chooseFile("logo")}>
              <span className="upload-icon mark-icon"><img src={STUDIO_ASSETS.mark} alt="" /></span>
              <span><strong>Add your mark</strong><small>Transparent PNG works best</small></span>
              <Upload size={17} />
            </button>
            <div className="drawer-note">
              <ImagePlus size={17} />
              <p>Or drop an image onto the production desk and place it on the cover.</p>
            </div>
          </>
        )}

        {panel === "shapes" && (
          <>
            <div className="drawer-heading">
              <p>Create rhythm and structure</p>
              <h2>Shapes</h2>
            </div>
            <div className="shape-grid">
              <button onClick={() => onAddShape("rectangle")}><RectangleHorizontal /><span>Rectangle</span></button>
              <button onClick={() => onAddShape("ellipse")}><Circle /><span>Circle</span></button>
              <button onClick={() => onAddShape("line")}><Minus /><span>Line</span></button>
            </div>
            <div className="drawer-note">
              <Shapes size={17} />
              <p>Drag the corner handle to resize. Use the round handle above an object to rotate it.</p>
            </div>
          </>
        )}

        {panel === "brand" && (
          <>
            <div className="drawer-heading">
              <p>Set the foundation</p>
              <h2>Colours</h2>
            </div>
            <label className="colour-field full-colour-field">
              <span>Cover background</span>
              <span className="colour-input-wrap">
                <input type="color" value={background} onChange={(event) => onBackground(event.target.value)} />
                <code>{background.toUpperCase()}</code>
              </span>
            </label>
            <p className="control-label">Studio palette</p>
            <div className="swatch-grid">
              {palette.map((color) => (
                <button
                  key={color}
                  aria-label={`Set background to ${color}`}
                  className={background.toLowerCase() === color.toLowerCase() ? "selected" : ""}
                  style={{ background: color }}
                  onClick={() => onBackground(color)}
                />
              ))}
            </div>
            <div className="drawer-note">
              <Palette size={17} />
              <p>Select an object to give text and shapes their own colours from the inspector.</p>
            </div>
          </>
        )}
      </section>
    </aside>
  );
}
