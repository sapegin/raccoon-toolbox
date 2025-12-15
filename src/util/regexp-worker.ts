interface WorkerRequest {
  id: string;
  text: string;
  pattern: string;
  flags: string;
}

interface MatchResult {
  index: number;
  length: number;
  groups: (string | undefined)[];
}

interface WorkerResponse {
  id: string;
  matches?: MatchResult[];
  error?: string;
}

const MAX_ITERATIONS = 10_000;

self.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  const { id, text, pattern, flags } = event.data;

  try {
    const regexp = new RegExp(pattern, flags);
    const matches: MatchResult[] = [];

    let match: RegExpExecArray | null;
    let iterations = 0;

    while ((match = regexp.exec(text)) !== null) {
      iterations++;

      if (iterations > MAX_ITERATIONS) {
        self.postMessage({
          id,
          error: 'Too many matches (possible infinite loop)',
        } satisfies WorkerResponse);
        return;
      }

      if (match[0].length === 0) {
        self.postMessage({
          id,
          error: 'Regular expression matches empty string',
        } satisfies WorkerResponse);
        return;
      }

      matches.push({
        index: match.index,
        length: match[0].length,
        groups: Array.from(match),
      });

      if (regexp.global === false) {
        break;
      }
    }

    self.postMessage({
      id,
      matches,
    } satisfies WorkerResponse);
  } catch (error) {
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : 'Unknown error',
    } satisfies WorkerResponse);
  }
});
