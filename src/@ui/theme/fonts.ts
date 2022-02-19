const fallback = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
];

const base = [
  'Inter',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
];

export const fonts: Record<string, string> = {
  fallback: fallback.join(','),
  base: base.join(','),
  mono: ['IBM Plex Mono', 'Monaco', 'Consolas', 'Courier New', 'monospace'].join(','),
};
