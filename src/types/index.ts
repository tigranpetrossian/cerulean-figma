export type HSV = { h: number; s: number; v: number };

export type InvalidColor = {
  id: string;
  name: string;
  error: 'MISSING_COLOR' | 'NOT_SOLID';
  value: null;
  alpha: null;
};

export type ValidColor = {
  id: string;
  name: string;
  error: null;
  value: HSV;
  alpha: number;
};

export type Color = InvalidColor | ValidColor;

export type Palette = {
  name: string;
  colors: Color[];
};

export type $fixMe = any;
export type $notWorthIt = any;
