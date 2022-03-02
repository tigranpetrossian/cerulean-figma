import { useEffect, useState } from 'react';
import { figmaAction } from 'helpers/figmaAction';
import { HSV, Palette } from 'types';

type Store = {
  palettes: Palette[];
  addPalette: () => void;
  renamePalette: (id: string, name: string) => void;
  addColor: (paletteId: string) => void;
  changeColor: (id: string, paletteId: string, hsv: HSV) => void;
};

export function useFigmaPalettes(): Store {
  const [palettes, setPalettes] = useState<Palette[]>([]);

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    figmaAction('GET_STYLES');
  }, []);

  const onMessage = (event) => {
    if (event.data?.pluginMessage?.name !== 'styles') {
      return;
    }

    setPalettes(event.data.pluginMessage.styles);
  };

  return {
    palettes,
    addPalette: () => undefined,
    renamePalette: (id: string, name: string) => undefined,
    addColor: (paletteId: string) => undefined,
    changeColor: (id: string, paletteId: string, hsv: HSV) => undefined,
  };
}
