import React from 'react';
import { CSS, styled } from '@ui/stitches.config';
import * as Editable from '@ui/Editable';

const nameStyles: CSS = {
  paddingX: '$2',
  paddingY: '$1_5',
  fontWeight: '$medium',
  lineHeight: '$sizes$4',
};

const Display = styled(Editable.Display, {
  ...nameStyles,
  cursor: 'text',
});

const Composer = styled(Editable.Composer, {
  ...nameStyles,
  border: '0',
});

type Props = {
  name: string;
  onSave: (value: string) => void;
};

export const PaletteName = (props: Props) => {
  const { name, onSave } = props;

  return (
    <Editable.Root value={name} onSave={onSave}>
      <Display />
      <Composer />
    </Editable.Root>
  );
};
