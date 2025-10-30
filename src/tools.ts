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
];
