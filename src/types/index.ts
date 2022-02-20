export type HSV = { h: number; s: number; v: number };

export type Color = {
  id: string;
  name: string;
  value: HSV | null;
  errors: string[];
};

export type Palette = {
  name: string;
  colors: Color[];
};

export type $fixMe = any;
export type $notWorthIt = any;
