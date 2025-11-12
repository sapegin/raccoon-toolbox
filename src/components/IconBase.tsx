import type { SVGProps } from 'react';
import { css } from '../../styled-system/css';
import type { BoxProps } from '../../styled-system/jsx/box';

export type BaseIconProps = Pick<BoxProps, 'display' | 'verticalAlign'> &
  Omit<
    SVGProps<SVGSVGElement>,
    | 'aria-hidden'
    | 'fill'
    | 'height'
    | 'preserveAspectRatio'
    | 'viewBox'
    | 'width'
  > & {
    width: number;
    height: number;
    viewBox: {
      width: number;
      height: number;
    };
    fill?: string;
  };

/**
 * Base for SVG icons:
 *
 * <IconBase viewBox={{ width: 128, height: 128 }} width={24} height={24}>
 *   <path d="..." />
 * </IconBase>
 */
export function IconBase({
  viewBox,
  display = 'inline-block',
  verticalAlign = 'middle',
  children,
  ...props
}: BaseIconProps) {
  return (
    <svg
      {...props}
      className={css({
        display,
        verticalAlign,
      })}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
