import React from 'react';
import { styled } from '@ui/stitches.config';
import { Palette } from 'types';
import { PaletteName } from 'components/Palette/PaletteName';

const Root = styled('div', {
  bgc: '$neutral-100',
  borderRadius: '$sm',
});

export const Header = styled('header', {
  padding: '$1_5 $2',
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
    </Root>
  );
};

export default Palette;
