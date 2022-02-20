import { $fixMe } from 'types';

export function figmaAction(msg: $fixMe) {
  parent.postMessage({ pluginMessage: msg }, '*');
}
