/** Editorial Workshop: the fixed-ratio artboard renders export-safe gradients, geometry, and imagery with direct manipulation. */
import { type PointerEvent, type RefObject, useRef } from "react";
import { COVER_HEIGHT, COVER_WIDTH, type CoverBackground, type CoverElement } from "@/lib/cover-editor";

type Interaction = {
  kind: "move" | "resize" | "rotate";
  pointerId: number;
  startX: number;
  startY: number;
  element: CoverElement;
  startAngle?: number;
};

type CoverCanvasProps = {
  elements: CoverElement[];
  background: CoverBackground;
  selectedId: string | null;
  zoom: number;
  showGrid: boolean;
  showSafeZone: boolean;
  svgRef: RefObject<SVGSVGElement | null>;
  onSelect: (id: string | null) => void;
  onChange: (elements: CoverElement[]) => void;
};

const HANDLE = 10;

export default function CoverCanvas({ elements, background, selectedId, zoom, showGrid, showSafeZone, svgRef, onSelect, onChange }: CoverCanvasProps) {
  const interactionRef = useRef<Interaction | null>(null);

  const pointFromEvent = (event: PointerEvent<SVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: ((event.clientX - rect.left) / rect.width) * COVER_WIDTH, y: ((event.clientY - rect.top) / rect.height) * COVER_HEIGHT };
  };

  const beginInteraction = (event: PointerEvent<SVGElement>, element: CoverElement, kind: Interaction["kind"]) => {
    event.stopPropagation();
    event.preventDefault();
    onSelect(element.id);
    if (element.locked) return;
    const point = pointFromEvent(event);
    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;
    interactionRef.current = {
      kind,
      pointerId: event.pointerId,
      startX: point.x,
      startY: point.y,
      element: { ...element },
      startAngle: kind === "rotate" ? Math.atan2(point.y - centerY, point.x - centerX) * (180 / Math.PI) : undefined,
    };
    svgRef.current?.setPointerCapture(event.pointerId);
  };

  const updateInteraction = (event: PointerEvent<SVGSVGElement>) => {
    const interaction = interactionRef.current;
    if (!interaction) return;
    const point = pointFromEvent(event);
    const deltaX = point.x - interaction.startX;
    const deltaY = point.y - interaction.startY;
    onChange(elements.map((element) => {
      if (element.id !== interaction.element.id) return element;
      if (interaction.kind === "move") return { ...element, x: Math.round(interaction.element.x + deltaX), y: Math.round(interaction.element.y + deltaY) };
      if (interaction.kind === "resize") return { ...element, width: Math.max(28, Math.round(interaction.element.width + deltaX)), height: Math.max(20, Math.round(interaction.element.height + deltaY)) };
      const centerX = interaction.element.x + interaction.element.width / 2;
      const centerY = interaction.element.y + interaction.element.height / 2;
      const currentAngle = Math.atan2(point.y - centerY, point.x - centerX) * (180 / Math.PI);
      return { ...element, rotation: Math.round(interaction.element.rotation + currentAngle - (interaction.startAngle ?? 0)) };
    }));
  };

  const endInteraction = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactionRef.current) return;
    try { svgRef.current?.releasePointerCapture(interactionRef.current.pointerId); } catch { /* Capture may already be released. */ }
    interactionRef.current = null;
    event.preventDefault();
  };

  const renderShape = (element: CoverElement) => {
    const fill = element.fill || "#F04E30";
    const stroke = element.stroke || fill;
    const weight = Math.max(2, element.strokeWidth || 5);
    if (element.shape === "rectangle") return <rect width={element.width} height={element.height} rx={element.radius || 0} fill={fill} stroke={stroke} strokeWidth={element.strokeWidth || 0} />;
    if (element.shape === "ellipse") return <ellipse cx={element.width / 2} cy={element.height / 2} rx={element.width / 2} ry={element.height / 2} fill={fill} stroke={stroke} strokeWidth={element.strokeWidth || 0} />;
    if (element.shape === "line") return <line x1="0" y1={element.height / 2} x2={element.width} y2={element.height / 2} stroke={stroke} strokeWidth={weight} strokeLinecap="round" />;
    if (element.shape === "ring") return <ellipse cx={element.width / 2} cy={element.height / 2} rx={Math.max(1, element.width / 2 - weight)} ry={Math.max(1, element.height / 2 - weight)} fill="none" stroke={stroke} strokeWidth={weight} />;
    if (element.shape === "arc") return <path d={`M ${element.width * 0.06} ${element.height * 0.86} Q ${element.width * 0.5} ${-element.height * 0.12} ${element.width * 0.94} ${element.height * 0.86}`} fill="none" stroke={stroke} strokeWidth={weight} strokeLinecap="round" />;
    if (element.shape === "wave") return <path d={`M 0 ${element.height * 0.5} C ${element.width * 0.2} ${-element.height * 0.08}, ${element.width * 0.32} ${element.height * 1.08}, ${element.width * 0.52} ${element.height * 0.5} S ${element.width * 0.82} ${-element.height * 0.08}, ${element.width} ${element.height * 0.5}`} fill="none" stroke={stroke} strokeWidth={weight} strokeLinecap="round" />;
    if (element.shape === "dots") {
      return <g>{Array.from({ length: 40 }, (_, index) => {
        const col = index % 8;
        const row = Math.floor(index / 8);
        return <circle key={index} cx={(col + 0.5) * (element.width / 8)} cy={(row + 0.5) * (element.height / 5)} r={Math.max(2, Math.min(element.width / 85, element.height / 38))} fill={fill} />;
      })}</g>;
    }
    if (element.shape === "bubbles") {
      const bubbles = [
        [0.24, 0.28, 0.19, 0.38], [0.61, 0.18, 0.13, 0.58], [0.79, 0.48, 0.21, 0.28],
        [0.42, 0.61, 0.17, 0.5], [0.14, 0.76, 0.1, 0.68], [0.72, 0.82, 0.12, 0.46],
      ];
      return <g>{bubbles.map(([cx, cy, radius, alpha], index) => <circle key={index} cx={cx * element.width} cy={cy * element.height} r={radius * Math.min(element.width, element.height)} fill={fill} fillOpacity={alpha} stroke={stroke} strokeOpacity={Math.min(0.7, alpha + 0.12)} strokeWidth={Math.max(1, element.strokeWidth || 2)} />)}</g>;
    }
    return null;
  };

  const renderElement = (element: CoverElement) => {
    const clipId = `clip-${element.id}`;
    return (
      <g key={element.id} transform={`translate(${element.x} ${element.y}) rotate(${element.rotation} ${element.width / 2} ${element.height / 2})`} opacity={element.opacity} onPointerDown={(event) => beginInteraction(event, element, "move")} style={{ cursor: element.locked ? "not-allowed" : "move", touchAction: "none" }}>
        {element.type === "image" && (
          <>
            <defs><clipPath id={clipId}><rect width={element.width} height={element.height} rx={element.radius || 0} /></clipPath></defs>
            <image href={element.src} width={element.width} height={element.height} preserveAspectRatio={element.fit === "contain" ? "xMidYMid meet" : "xMidYMid slice"} clipPath={`url(#${clipId})`} />
          </>
        )}
        {element.type === "shape" && renderShape(element)}
        {selectedId === element.id && (
          <g data-editor-ui="selection" opacity={1}>
            <rect x={-3} y={-3} width={element.width + 6} height={element.height + 6} fill="none" stroke="#F04E30" strokeWidth={3} strokeDasharray={element.locked ? "12 8" : undefined} vectorEffect="non-scaling-stroke" pointerEvents="none" />
            {!element.locked && (
              <>
                <line x1={element.width / 2} y1={-3} x2={element.width / 2} y2={-38} stroke="#F04E30" strokeWidth={2} vectorEffect="non-scaling-stroke" pointerEvents="none" />
                <circle cx={element.width / 2} cy={-45} r={HANDLE} fill="#F4EFE6" stroke="#F04E30" strokeWidth={3} vectorEffect="non-scaling-stroke" onPointerDown={(event) => beginInteraction(event, element, "rotate")} style={{ cursor: "grab" }} />
                <rect x={element.width - HANDLE} y={element.height - HANDLE} width={HANDLE * 2} height={HANDLE * 2} rx={3} fill="#F4EFE6" stroke="#F04E30" strokeWidth={3} vectorEffect="non-scaling-stroke" onPointerDown={(event) => beginInteraction(event, element, "resize")} style={{ cursor: "nwse-resize" }} />
              </>
            )}
          </g>
        )}
      </g>
    );
  };

  const radians = ((background.angle - 90) * Math.PI) / 180;
  const x1 = 50 - Math.cos(radians) * 50;
  const y1 = 50 - Math.sin(radians) * 50;
  const x2 = 50 + Math.cos(radians) * 50;
  const y2 = 50 + Math.sin(radians) * 50;
  const backgroundFill = background.mode === "solid" ? background.color1 : `url(#cover-background)`;

  return (
    <div className="artboard-zoom" style={{ width: `${zoom}%` }}>
      <div className="crop-frame">
        <div className="ruler ruler-top" aria-hidden="true"><span>0</span>{Array.from({ length: 26 }, (_, index) => <i key={index} />)}<span>1,066 PX</span></div>
        <div className="ruler ruler-left" aria-hidden="true"><span>0</span>{Array.from({ length: 18 }, (_, index) => <i key={index} />)}<span>735 PX</span></div>
        <span className="crop crop-tl" /><span className="crop crop-tr" /><span className="crop crop-bl" /><span className="crop crop-br" />
        <svg ref={svgRef} viewBox={`0 0 ${COVER_WIDTH} ${COVER_HEIGHT}`} width={COVER_WIDTH} height={COVER_HEIGHT} className="cover-canvas" xmlns="http://www.w3.org/2000/svg" onPointerDown={() => onSelect(null)} onPointerMove={updateInteraction} onPointerUp={endInteraction} onPointerCancel={endInteraction} style={{ touchAction: "none" }} aria-label="Editable 1066 by 735 pixel background canvas">
          <defs>
            {background.mode === "linear" && <linearGradient id="cover-background" x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}><stop offset="0%" stopColor={background.color1} /><stop offset="100%" stopColor={background.color2} /></linearGradient>}
            {background.mode === "radial" && <radialGradient id="cover-background" cx="35%" cy="30%" r="80%"><stop offset="0%" stopColor={background.color1} /><stop offset="100%" stopColor={background.color2} /></radialGradient>}
          </defs>
          <rect width={COVER_WIDTH} height={COVER_HEIGHT} fill={backgroundFill} />
          {elements.map(renderElement)}
          {showGrid && <g data-editor-ui="grid" opacity="0.17" pointerEvents="none">{Array.from({ length: Math.floor(COVER_WIDTH / 40) + 1 }, (_, index) => <line key={`v-${index}`} x1={index * 40} y1="0" x2={index * 40} y2={COVER_HEIGHT} stroke="#20211F" strokeWidth="1" />)}{Array.from({ length: Math.floor(COVER_HEIGHT / 40) + 1 }, (_, index) => <line key={`h-${index}`} x1="0" y1={index * 40} x2={COVER_WIDTH} y2={index * 40} stroke="#20211F" strokeWidth="1" />)}</g>}
          {showSafeZone && <rect data-editor-ui="safe-zone" x="36" y="36" width={COVER_WIDTH - 72} height={COVER_HEIGHT - 72} fill="none" stroke="#F04E30" strokeWidth="2" strokeDasharray="10 8" pointerEvents="none" />}
        </svg>
      </div>
    </div>
  );
}

