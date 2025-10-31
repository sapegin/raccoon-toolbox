import { lazy, ComponentType } from 'react';

export interface Tool {
  id: string;
  name: string;
  component: ComponentType;
}

export const tools: Tool[] = [
  {
    id: 'base64-encoder',
    name: 'Base64 encoder/decoder',
    component: lazy(() =>
      import('./tools/Base64Encoder').then((m) => ({
        default: m.Base64Encoder,
      }))
    ),
  },
  {
    id: 'json-formatter',
    name: 'JSON formatter',
    component: lazy(() =>
      import('./tools/JsonFormatter').then((m) => ({
        default: m.JsonFormatter,
      }))
    ),
  },
  {
    id: 'text-diff',
    name: 'Text diff',
    component: lazy(() =>
      import('./tools/TextDiff').then((m) => ({
        default: m.TextDiff,
      }))
    ),
  },
  {
    id: 'url-encoder',
    name: 'URL encoder/decoder',
    component: lazy(() =>
      import('./tools/UrlEncoder').then((m) => ({
        default: m.UrlEncoder,
      }))
    ),
  },
];
