import Markdown from 'markdown-to-jsx';
import { useCallback } from 'react';
import { Button } from '../components/Button';
import { Editor } from '../components/Editor';
import { Panel } from '../components/Panel';
import { Screen } from '../components/Screen';
import { usePersistentState } from '../hooks/usePersistentState';

export function MarkdownPreview() {
  const [input, setInput] = usePersistentState('markdownPreview.input', '');

  const handleClear = useCallback(() => {
    setInput('');
  }, [setInput]);

  return (
    <Screen className="grid-cols-2">
      <Panel
        fullHeight
        label="Markdown"
        actions={
          <Button onClick={handleClear} disabled={input === ''}>
            Clear
          </Button>
        }
      >
        <Editor
          label="Markdown"
          value={input}
          language="markdown"
          onChange={setInput}
        />
      </Panel>
      <Panel fullHeight label="Preview">
        <div className="prose">
          <Markdown>{input}</Markdown>
        </div>
      </Panel>
    </Screen>
  );
}
