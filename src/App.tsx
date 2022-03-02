import React, { useEffect, useState } from 'react';
import { Main } from 'components/Main';
import { useFigmaPalettes } from 'store/useFigmaPalettes';
import PaletteList from 'components/PaletteList';
import { globalStyles } from '@ui/stitches.config';

function sendMessage(msg: any) {
  parent.postMessage({ pluginMessage: msg }, '*');
}

function App() {
  globalStyles();

  return (
    <Main>
      <PaletteList />
    </Main>
  );
}

export default App;
