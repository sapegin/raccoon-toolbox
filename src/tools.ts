import { lazy, ComponentType } from 'react';

export interface Tool {
  id: string;
  name: string;
  component: ComponentType;
}

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    component: lazy(() =>
      import('./tools/JsonFormatter').then((m) => ({
        default: m.JsonFormatter,
      }))
    ),
  },
  {
    id: 'text-diff',
    name: 'Text Diff',
    component: lazy(() =>
      import('./tools/TextDiff').then((m) => ({
        default: m.TextDiff,
      }))
    ),
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    component: lazy(() =>
      import('./tools/Base64').then((m) => ({
        default: m.Base64,
      }))
    ),
  },
];
