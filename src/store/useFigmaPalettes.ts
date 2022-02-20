import { useEffect } from 'react';
import { figmaAction } from 'helpers/figmaAction';
import { figmaStylesToPalette } from 'store/helpers/figmaStylesToPalette';

export function useFigmaPalettes() {
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

    console.log(figmaStylesToPalette(event.data.pluginMessage.styles));
  };

  return {
    palettes: [],
  };
}
