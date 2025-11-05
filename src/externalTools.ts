import externalToolsData from '../external-tools.json';

interface ExternalTool {
  name: string;
  url: string;
  keywords: string[];
}

export const externalTools = externalToolsData as ExternalTool[];
