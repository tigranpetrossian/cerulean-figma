import { styled } from '../stitches.config';

export const BaseButton = styled('button', {
  margin: 0,
  padding: 0,
  fontFamily: '$base',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  verticalAlign: 'middle',
  color: 'inherit',
  border: 0,
  borderRadius: 0,
  backgroundColor: 'transparent',
  userSelect: 'none',
  appearance: 'none',
  textDecoration: 'none',

  '&::-moz-focus-inner': {
    borderStyle: 'none',
  },
});
