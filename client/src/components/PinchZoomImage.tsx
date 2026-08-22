// Direção visual: Jardim de Código em Aquarela — interação delicada, acessível e sem interferir na leitura do convite.
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";

type Transform = { scale: number; x: number; y: number };
type Point = { x: number; y: number };

type PinchZoomImageProps = {
  src: string;
  alt: string;
  className?: string;
  surfaceClassName?: string;
  maxScale?: number;
  ariaLabel?: string;
};

const MIN_SCALE = 1;
const DEFAULT_MAX_SCALE = 3.25;

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PinchZoomImage({
  src,
  alt,
  className = "",
  surfaceClassName = "",
  maxScale = DEFAULT_MAX_SCALE,
  ariaLabel,
}: PinchZoomImageProps) {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const pointersRef = useRef(new Map<number, Point>());
  const transformRef = useRef<Transform>({ scale: MIN_SCALE, x: 0, y: 0 });
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 });
  const pinchRef = useRef({ startDistance: 0, startScale: MIN_SCALE });
  const [transform, setTransform] = useState<Transform>(transformRef.current);

  const boundedTransform = (next: Transform): Transform => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return { ...next, x: 0, y: 0 };
    const maxX = Math.max(0, ((next.scale - 1) * rect.width) / 2);
    const maxY = Math.max(0, ((next.scale - 1) * rect.height) / 2);
    return {
      scale: clamp(next.scale, MIN_SCALE, maxScale),
      x: clamp(next.x, -maxX, maxX),
      y: clamp(next.y, -maxY, maxY),
    };
  };

  const applyTransform = (next: Transform) => {
    const safe = boundedTransform(next);
    transformRef.current = safe;
    setTransform(safe);
  };

  const resetZoom = () => applyTransform({ scale: MIN_SCALE, x: 0, y: 0 });

  const zoomBy = (factor: number) => {
    const current = transformRef.current;
    applyTransform({ scale: current.scale * factor, x: current.x, y: current.y });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size === 1) {
      dragRef.current = { active: transformRef.current.scale > MIN_SCALE, lastX: event.clientX, lastY: event.clientY };
    } else if (pointersRef.current.size === 2) {
      const points = Array.from(pointersRef.current.values());
      pinchRef.current = { startDistance: distance(points[0], points[1]), startScale: transformRef.current.scale };
      dragRef.current.active = false;
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const previous = pointersRef.current.get(event.pointerId);
    if (!previous) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size >= 2 && pinchRef.current.startDistance > 0) {
      const points = Array.from(pointersRef.current.values());
      const nextScale = pinchRef.current.startScale * (distance(points[0], points[1]) / pinchRef.current.startDistance);
      applyTransform({ ...transformRef.current, scale: nextScale });
      event.preventDefault();
      return;
    }

    if (dragRef.current.active && transformRef.current.scale > MIN_SCALE) {
      const dx = event.clientX - previous.x;
      const dy = event.clientY - previous.y;
      applyTransform({ ...transformRef.current, x: transformRef.current.x + dx, y: transformRef.current.y + dy });
      event.preventDefault();
    }
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current.startDistance = 0;
    if (pointersRef.current.size === 0) dragRef.current.active = false;
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey && !event.metaKey && Math.abs(event.deltaY) < 4) return;
    event.preventDefault();
    zoomBy(event.deltaY < 0 ? 1.12 : 0.89);
  };

  const handleDoubleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (transformRef.current.scale > MIN_SCALE) resetZoom();
    else applyTransform({ scale: 2, x: 0, y: 0 });
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "+" || event.key === "=") { event.preventDefault(); zoomBy(1.18); }
    if (event.key === "-") { event.preventDefault(); zoomBy(0.85); }
    if (event.key === "0" || event.key === "Escape") { event.preventDefault(); resetZoom(); }
  };

  return (
    <div
      ref={surfaceRef}
      className={`pinch-zoom-surface ${surfaceClassName}`.trim()}
      role="img"
      aria-label={ariaLabel ?? alt}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="pinch-zoom-content" style={{ transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})` }}>
        <img className={className} src={src} alt={alt} draggable={false} />
      </div>
      <span className="pinch-zoom-hint" aria-hidden="true">pinça para ampliar</span>
      <span className="sr-only">Use dois dedos para ampliar ou reduzir. No computador, use duplo clique, roda do mouse ou as teclas mais, menos e zero.</span>
    </div>
  );
}
