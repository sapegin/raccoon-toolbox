import clsx from 'clsx';
import type { ReactNode, RefObject } from 'react';

// Percentage per key press
const KEYBOARD_STEP = 1;

interface ColorSliderProps {
  /** Ref to the container element, used for coordinate calculations during drag. */
  areaRef: RefObject<HTMLDivElement | null>;
  className: string;
  style: React.CSSProperties;
  ariaLabel: string;
  ariaValueNow: number;
  ariaValueText: string;
  /** Called once when a drag begins (mousedown / touchstart). */
  onDragStart: () => void;
  /** Called with viewport coordinates during drag (mouse or touch). */
  onDrag: (clientX: number, clientY: number) => void;
  /** Called on arrow-key press with a percentage step in each axis. */
  onStep: (dx: number, dy: number) => void;
  children: ReactNode;
}

/**
 * Accessible draggable area for color selection. Supports mouse, touch, and
 * keyboard (arrow keys) input.
 */
export function ColorSlider({
  areaRef,
  className,
  style,
  ariaLabel,
  ariaValueNow,
  ariaValueText,
  onDragStart,
  onDrag,
  onStep,
  children,
}: ColorSliderProps) {
  return (
    <div
      ref={areaRef}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuenow={ariaValueNow}
      aria-valuetext={ariaValueText}
      className={clsx(
        `relative focus-outline`,
        className
      )}
      style={style}
      onMouseDown={(e) => {
        onDragStart();
        onDrag(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        onDragStart();
        onDrag(touch.clientX, touch.clientY);
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        onDrag(touch.clientX, touch.clientY);
      }}
      onKeyDown={(e) => {
        let dx = 0;
        let dy = 0;
        switch (e.key) {
          case 'ArrowUp':
            dy = -KEYBOARD_STEP;
            break;
          case 'ArrowDown':
            dy = KEYBOARD_STEP;
            break;
          case 'ArrowLeft':
            dx = -KEYBOARD_STEP;
            break;
          case 'ArrowRight':
            dx = KEYBOARD_STEP;
            break;
          default:
            return;
        }
        e.preventDefault();
        onStep(dx, dy);
      }}
    >
      {children}
    </div>
  );
}
