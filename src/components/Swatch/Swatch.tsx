import React, { memo } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { styled } from '@ui/stitches.config';
import { Color, HSV } from 'types';
import { ColorPicker } from 'components/ColorPicker';
import { hsvToHex } from 'components/ColorPicker/utils';
import { useFigmaPalettes } from 'store/useFigmaPalettes';

const Root = RadixPopover.Root;

const Trigger = styled(RadixPopover.Trigger, {
  all: 'unset',
  display: 'block',
  width: '100%',
  position: 'relative',
  height: '$15',

  '&:focus': {
    // TODO:
  },

  '&[data-state="open"]': {
    transform: 'scale(1.01)',
    boxShadow: '0 0 1px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .08)',
    zIndex: 10,
  },
});

const Content = styled(RadixPopover.Content, {
  width: '$60',
  bgc: '$white',
  borderRadius: '$sm',
  boxShadow:
    '0 1px 2px 0 rgba(0, 0,0 , .06), 0 2px 8px 0 rgba(0, 0, 0 , .08), 0 2px 24px 0 rgba(0, 0, 0 , .12)',
});

type Props = {
  color: Color;
  paletteName: string;
};

const Swatch = (props: Props) => {
  const { paletteName, color } = props;
  const { value: hsv } = color;

  if (!hsv) {
    return <div>Bad color</div>;
  }

  const hexColor = hsvToHex(hsv);

  const handleChange = (hsv: HSV) => {
    //changeColor(color.id, paletteName, hsv);
  };

  return (
    <Root>
      <Trigger css={{ bgc: hexColor }} />
      <Content side="right" sideOffset={4} align="start">
        <ColorPicker value={hsv} onChange={handleChange} />
      </Content>
    </Root>
  );
};

export default memo(Swatch);
