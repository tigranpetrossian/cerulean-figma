import React from 'react';
import { Icon, IconProps } from './Icon';

/**
 * @typedef {Object} options
 * @property {JSX.Element} path
 * @property {string} displayName
 * @property {string} viewBox
 *
 * */

/**
 * @param {options|JSX.Element}  options SVG path or options object
 * @returns {Function} React Component
 * */

interface Options {
  path: JSX.Element;
  displayName?: string;
  viewBox?: string;
}

type SvgPath = SVGPathElement;

export function createIcon(options: Options | SvgPath) {
  const { viewBox, path, displayName } = (
    React.isValidElement(options) ? { path: options } : options
  ) as Options;

  const Component = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icon ref={ref} viewBox={viewBox} {...props}>
        {path}
      </Icon>
    );
  });

  Component.displayName = displayName || 'CustomIcon';

  return Component;
}
