import React from 'react';
import { HSV } from 'types';
import { Box } from '@ui/Box';
import { ColorAttributeInput } from './ColorAttributeInput';

type Props = {
  value: HSV;
  onChange: (value: HSV) => void;
};

export const HSVInput = (props: Props) => {
  const { value: valueProp, onChange } = props;
  const { h, s, v } = valueProp;

  const handleChange = (attributeName: string, value: number) => {
    onChange({
      ...valueProp,
      [attributeName]: value,
    });
  };

  return (
    <Box
      css={{
        display: 'flex',
        borderRadius: '$sm',

        '&:focus-within': {
          '& input': {
            borderColor: '$focusRing',
          },

          '& input:not(:last-child)': {
            borderRightColor: '$neutral-300',
          },
        },
      }}
    >
      <ColorAttributeInput attributeName="h" onChange={handleChange} maxValue={360} value={h} />
      <ColorAttributeInput attributeName="s" onChange={handleChange} maxValue={100} value={s} />
      <ColorAttributeInput attributeName="v" onChange={handleChange} maxValue={100} value={v} />
    </Box>
  );
};
