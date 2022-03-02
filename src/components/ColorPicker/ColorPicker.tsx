import React from 'react';
import { HsvColorPicker } from 'react-colorful';
import { Box } from '@ui/Box';
import { styled } from '@ui/stitches.config';
import { HSV } from 'types';
import { HexInput } from 'components/ColorPicker/HexInput';
import { hexToHsv, hsvToHex } from 'components/ColorPicker/utils';
import { HSVInput } from 'components/ColorPicker/HSVInput';

const Picker = styled(HsvColorPicker, {
  '&.react-colorful': {
    width: '100%',
    height: '180px',
  },

  '& > .react-colorful__saturation': {
    borderRadius: '$sm $sm 0 0',
  },

  '& .react-colorful__pointer': {
    width: '$4',
    height: '$4',
  },

  '& .react-colorful__hue': {
    margin: '$2',
    height: '$2',
    borderRadius: '$full',

    '.react-colorful__interactive': {
      top: '-$2',
      bottom: '-$2',
    },
  },
});

type Props = {
  value: HSV;
  onChange: (value: HSV) => void;
};

export const ColorPicker = (props: Props) => {
  const { value, onChange } = props;
  const { h, s, v } = value;
  const hexValue = hsvToHex(value);

  const handleChange = (hsv: HSV) => {
    onChange(hsv);
  };

  const handleHexChange = (hex: string) => {
    onChange(hexToHsv(hex));
  };

  const handleHsvChange = (value: HSV) => {
    onChange(value);
  };

  return (
    <Box>
      <Picker color={{ h, s, v }} onChange={handleChange} />
      <Box css={{ display: 'flex', justifyContent: 'space-between', padding: '$2' }}>
        <HexInput value={hexValue} onChange={handleHexChange} />
        <HSVInput value={value} onChange={handleHsvChange} />
      </Box>
    </Box>
  );
};
