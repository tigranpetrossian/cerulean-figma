// Importants are there because of the following bug:
// https://github.com/modulz/stitches/issues/671
import { styled } from '@ui/stitches.config';
import { HexColorInput } from 'react-colorful';
import { inputBaseStyles } from '@ui/Input';
import React from 'react';

const StyledHexInput = styled(HexColorInput, inputBaseStyles, {
  width: '6ch !important',
  $$height: 'calc($sizes$7 - 1px)',
  paddingX: '$2 !important',
  textTransform: 'uppercase',
  fontFamily: '$mono !important',
  fontWeight: '$medium !important',
  fontSize: '$xs',
  boxSizing: 'content-box !important',
});

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const HexInput = (props: Props) => {
  const { value, onChange } = props;

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).select();
  };

  return (
    <StyledHexInput autoComplete="off" onClick={handleClick} color={value} onChange={onChange} />
  );
};
