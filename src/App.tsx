import React from 'react';
import { Main } from 'components/Main';
import PaletteList from 'components/PaletteList';
import { globalStyles } from '@ui/stitches.config';

function App() {
  globalStyles();

  return (
    <Main>
      <PaletteList />
    </Main>
  );
}

export default App;
