import { CSS, styled } from '@ui/stitches.config';
import { Input } from '@ui/Input';
import React, { useEffect, useRef, useState } from 'react';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { useSelectOnClick } from './hooks';
import { selectInputContents } from '../../@utils/dom';
import { clamp } from '../../@utils/number';

const StyledColorAttributeInput = styled(Input, {
  $$height: 'calc($sizes$7 - 1px)',
  width: '3ch',
  paddingX: '$2 !important',
  fontFamily: '$mono !important',
  fontWeight: '$medium !important',
  fontSize: '$xs',
  boxSizing: 'content-box !important',
  borderRadius: 0,

  '&:first-child': {
    borderRadius: '$base 0 0 $base',
  },

  '&:last-child': {
    borderRadius: '0 $base $base 0',
  },

  '& + &': {
    borderLeft: 0,
  },
});

type Props = {
  attributeName: string;
  maxValue: number;
  value: number;
  onChange: (attributeName: string, value: number) => void;
  css?: CSS;
};

export const ColorAttributeInput = React.forwardRef<HTMLInputElement, Props>(
  (props, forwardedRef) => {
    const { attributeName, value: valueProp, onChange, maxValue, ...other } = props;
    const [value, setValue] = useState(() => valueProp);
    const inputRef = useRef(null);
    const { onMouseDown, onMouseUp } = useSelectOnClick(inputRef);

    useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!/\d+/.test(e.target.value)) {
        return;
      }

      setValue(parseInt(e.target.value, 10));
    };

    // TODO: Fix losing selection because of rerender
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const increment = {
          ArrowUp: e.shiftKey ? 10 : 1,
          ArrowDown: e.shiftKey ? -10 : -1,
        };
        onChange(attributeName, clamp(value + increment[e.key], 0, maxValue));
        window.requestAnimationFrame(() => {
          selectInputContents(inputRef.current);
        });
      }
    };

    return (
      <StyledColorAttributeInput
        ref={composeRefs(forwardedRef, inputRef)}
        autoComplete="off"
        spellCheck="false"
        maxLength={3}
        value={value}
        onChange={handleChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onKeyDown={handleKeyDown}
        {...other}
      />
    );
  }
);
