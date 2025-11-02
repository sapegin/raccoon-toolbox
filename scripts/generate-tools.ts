import fs from 'node:fs';

interface ToolDefinition {
  id: string;
  name: string;
  module: string;
}

const tools = JSON.parse(
  fs.readFileSync('tools.json', 'utf8')
) as ToolDefinition[];

// Generate src/tools.ts
const tsCode = `// Auto-generated file. Do not edit manually.
// Generated from tools.json by scripts/generate-tools.ts

import { lazy, ComponentType } from 'react';

export interface Tool {
  id: string;
  name: string;
  component: ComponentType;
}

export const tools: Tool[] = [
${tools
  .map(
    (tool) => `  {
    id: '${tool.id}',
    name: '${tool.name}',
    component: lazy(() =>
      import('./tools/${tool.module}').then((m) => ({
        default: m.${tool.module},
      }))
    ),
  },`
  )
  .join('\n')}
];
`;

fs.writeFileSync('src/tools.ts', tsCode);

console.log('Generated src/tools.ts');

// Generate src-tauri/src/tools.rs
const rsCode = `// Auto-generated file. Do not edit manually.
// Generated from tools.json by scripts/generate-tools.ts

pub struct Tool {
    pub id: &'static str,
    pub name: &'static str,
}

pub const TOOLS: &[Tool] = &[
${tools
  .map(
    (tool) => `    Tool {
        id: "${tool.id}",
        name: "${tool.name}",
    },`
  )
  .join('\n')}
];
`;

fs.writeFileSync('src-tauri/src/tools.rs', rsCode);

console.log('Generated src-tauri/src/tools.rs');
