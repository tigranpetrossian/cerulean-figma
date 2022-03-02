import * as RadixSlider from '@radix-ui/react-slider';
import { styled } from '@ui/stitches.config';

export const Root = styled(RadixSlider.Root, {
  display: 'flex',
  height: '$5',
  alignItems: 'center',
  width: '100%',
});

export const Thumb = styled(RadixSlider.Thumb, {
  display: 'block',
  width: '$2',
  height: '$2',
  backgroundColor: '$neutral-800',
  borderRadius: '$full',
  transition: 'transform 0.2s',

  '&:hover': {
    transform: 'scale(1.24)',
  },
  '&:focus': {
    outline: 0,
    transform: 'scale(1.24)',
  },
});
