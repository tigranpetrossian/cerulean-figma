import React from 'react';
import { styled } from '@ui/stitches.config';
import { Palette } from 'types';
import { PaletteName } from 'components/Palette/PaletteName';
import Swatch from 'components/Swatch';

const Root = styled('div', {
  bgc: '$neutral-100',
  borderRadius: '$sm',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const Header = styled('header', {
  padding: '$1_5 $2',
});

const SwatchList = styled('div', {
  padding: '0 $3',
  overflowY: 'auto',
});

type Props = {
  palette: Palette;
};

const Palette = (props: Props) => {
  const { palette } = props;

  const handleNameSave = (name: string) => {};

  return (
    <Root>
      <Header>
        <PaletteName name={palette.name} onSave={handleNameSave} />
      </Header>
      <SwatchList>
        {palette.colors.map((color) => (
          <Swatch key={color.id} paletteName={palette.name} color={color} />
        ))}
      </SwatchList>
    </Root>
  );
};

export default Palette;
