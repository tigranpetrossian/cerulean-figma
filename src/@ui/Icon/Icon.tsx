import React from 'react';
import { CSS, styled } from '../stitches.config';

const Svg = styled('svg', {
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0,
  display: 'inline-flex',
  fill: 'currentColor',
  flexShrink: 0,
});

export type IconProps = {
  title?: string;
  size?: CSS['width'];
  viewBox?: string;
  color?: CSS['color'];
  children?: React.ReactNode;
} & { css?: CSS };

export const Icon = React.forwardRef<React.ElementRef<typeof Svg>, IconProps>((props, ref) => {
  const { viewBox = '0 0 20 20', color, size = '$5', title, children, css, ...other } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      aria-hidden={title ? 'false' : 'true'}
      focusable="false"
      css={{ color, width: size, height: size, ...css }}
      ref={ref}
      {...other}
    >
      {title && <title>{title}</title>}
      {children}
    </Svg>
  );
});

Icon.displayName = 'Icon';
