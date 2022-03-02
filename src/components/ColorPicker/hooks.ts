import React, { useState } from 'react';

export function useSelectOnClick(ref: React.RefObject<HTMLInputElement>) {
  const [cursorX, setCursorX] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setCursorX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!ref.current) {
      return;
    }

    if (cursorX === null || Math.abs(e.clientX - cursorX) < 5) {
      ref.current.select();
      setCursorX(null);
    }
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
}
