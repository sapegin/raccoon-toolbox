import { useEffect, useRef, useState } from 'react';

interface MatchResult {
  index: number;
  length: number;
  groups: (string | undefined)[];
}

interface WorkerRequest {
  id: string;
  text: string;
  pattern: string;
  flags: string;
}

interface WorkerResponse {
  id: string;
  matches?: MatchResult[];
  error?: string;
}

interface UseRegExpWorkerResult {
  matches: MatchResult[];
  error: string;
  isProcessing: boolean;
}

const WORKER_TIMEOUT = 1000;

export function useRegExpWorker(
  text: string,
  pattern: string,
  flags: string
): UseRegExpWorkerResult {
  const [state, setState] = useState<{
    matches: MatchResult[];
    error: string;
    isProcessing: boolean;
  }>({ matches: [], error: '', isProcessing: false });
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (pattern === '' || text === '') {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setState({ matches: [], error: '', isProcessing: false });
      return;
    }

    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setState((prev) => ({ ...prev, isProcessing: true }));

    if (workerRef.current !== null) {
      workerRef.current.terminate();
    }

    const worker = new Worker(
      new URL('../util/regexp-worker.ts', import.meta.url),
      {
        type: 'module',
      }
    );
    workerRef.current = worker;

    const requestId = String(++requestIdRef.current);

    const handleMessage = (event: MessageEvent<WorkerResponse>) => {
      if (event.data.id !== requestId) {
        return;
      }

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (event.data.error) {
        setState({
          matches: [],
          error: event.data.error,
          isProcessing: false,
        });
      } else if (event.data.matches) {
        setState({
          matches: event.data.matches,
          error: '',
          isProcessing: false,
        });
      }
    };

    worker.addEventListener('message', handleMessage);

    timeoutRef.current = setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      setState({
        matches: [],
        error:
          'Regular expression execution timed out (possible infinite loop)',
        isProcessing: false,
      });
    }, WORKER_TIMEOUT);

    worker.postMessage({
      id: requestId,
      text,
      pattern,
      flags,
    } satisfies WorkerRequest);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      worker.removeEventListener('message', handleMessage);
      worker.terminate();
    };
  }, [text, pattern, flags]);

  return state;
}
