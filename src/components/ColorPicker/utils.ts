import { HSV } from 'types';
import chroma from 'chroma-js';

export function hsvToHex(hsv: HSV): string {
  const { h, s, v } = hsv;
  return chroma.hsv(h, s / 100, v / 100).hex();
}

export function hexToHsv(hex: string): HSV {
  const [h, s, v] = chroma.hex(hex).hsv();

  return {
    h: isNaN(h) ? 0 : Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}
