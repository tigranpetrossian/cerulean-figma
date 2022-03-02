import React from 'react';
import { styled } from '@ui/stitches.config';
import { useFigmaPalettes } from 'store/useFigmaPalettes';
import Palette from 'components/Palette';

const Root = styled('div', {
  height: '100%',
  display: 'grid',
  gridAutoFlow: ' column',
  gridAutoColumns: '$sizes$72',
  gridGap: '$3',
  overflowY: 'hidden',
  overflowX: 'auto',
  padding: '0 $4 $4',
  minWidth: 0,
});

const PaletteList = (props) => {
  const { palettes } = useFigmaPalettes();

  return (
    <Root>
      {palettes.map((palette) => (
        <Palette key={palette.name} palette={palette} />
      ))}
    </Root>
  );
};

export default PaletteList;
