import React, { useEffect, useState } from 'react';
import { Main } from 'components/Main';
import { useFigmaPalettes } from 'store/useFigmaPalettes';

function sendMessage(msg: any) {
  parent.postMessage({ pluginMessage: msg }, '*');
}

function App() {
  useFigmaPalettes();

  return <Main>App</Main>;
}

export default App;
