/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />
import chroma from 'chroma-js';

const PREVIEW_ENV = process.env.PREVIEW_ENV;

figma.showUI(__html__);

if (PREVIEW_ENV === 'figma') {
  figma.ui.resize(300, 200);
} else {
  figma.ui.resize(750, 500);
}

function convertFigmaRgbToHex(r: number, g: number, b: number) {
  return chroma.rgb(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)).hex();
}

figma.ui.onmessage = async (msg) => {
  if (msg === 'GET_STYLES') {
    const colorStyles = figma.getLocalPaintStyles().filter((style) => style.name.startsWith('$'));
    console.log(
      colorStyles.map((style) => {
        const { r, g, b } = (style.paints[0] as SolidPaint).color;

        return {
          name: style.name,
          color: convertFigmaRgbToHex(r, g, b),
        };
      })
    );

    figma.ui.postMessage(
      colorStyles.map((style) => {
        const { r, g, b } = (style.paints[0] as SolidPaint).color;

        return {
          name: style.name,
          color: convertFigmaRgbToHex(r, g, b),
        };
      })
    );
  }
};

(figma.getLocalPaintStyles()[0].paints[0] as SolidPaint).color;

// TODO:
// filter the ones starting with one $ ($$neutral, or $$-neutral, use regex), group by prefix
// Add type guard for isSolid(paint): paint is SolidPaint
// If doesn't have paint at index 0, mark as invalid
