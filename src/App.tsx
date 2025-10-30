import { Editor } from './components/Editor';
import './App.css';

const code = `// Press Cmd+F (Mac) or Ctrl+F (Windows) to search

const greeting = 'Hello, world!';
console.log(greeting);
`;

function App() {
  return (
    <main className="container">
      <h1>Code Editor</h1>
      <Editor language="javascript" defaultValue={code} />
    </main>
  );
}

export default App;
