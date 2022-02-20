/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />

export {};

const PREVIEW_ENV = process.env.PREVIEW_ENV;

figma.showUI(__html__);

if (PREVIEW_ENV === 'figma') {
  figma.ui.resize(300, 200);
} else {
  figma.ui.resize(750, 500);
}

figma.ui.onmessage = async (msg) => {
  if (msg === 'GET_STYLES') {
    const colorStyles = figma.getLocalPaintStyles();

    figma.ui.postMessage({
      name: 'styles',
      styles: colorStyles.map((style) => ({
        id: style.id,
        name: style.name,
        paints: style.paints,
      })),
    });
  }
};
