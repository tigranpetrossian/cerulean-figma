import React from 'react';
import { css, styled } from '@ui/stitches.config';
import type Radix from '@radix-ui/react-primitive';

export const inputBaseStyles = css({
  all: 'unset',
  boxSizing: 'border-box',

  $$height: '$sizes$8',
  $$lineHeight: '$sizes$5',
  $$borderWidth: '1px',

  display: 'block',
  width: '100%',
  // Perfect vertical centering of text inside an input across browsers only works by setting
  // vertical padding and omitting the height. Hence derive the necessary padding from height:
  paddingY: 'calc(($$height - $$lineHeight - $$borderWidth * 2) / 2)',
  paddingX: '$2',
  lineHeight: '$sizes$5',
  fontFamily: '$base',
  bgc: '$white',
  border: '1px solid $neutral-300',
  borderRadius: '$base',

  '&:focus': {
    borderColor: '$focusRing',
  },
});

const StyledInput = styled('input', inputBaseStyles);

type InputElement = React.ElementRef<typeof StyledInput>;
export type InputProps = Radix.ComponentPropsWithoutRef<typeof StyledInput>;

export const Input = React.forwardRef<InputElement, InputProps>((props, ref) => {
  const { type = 'text', ...other } = props;

  return <StyledInput ref={ref} type={type} {...other} />;
});
