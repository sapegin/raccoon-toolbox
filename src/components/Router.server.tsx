import { Routes, Route } from 'react-router-dom';
import { tools } from '../tools-server';

export function Router() {
  // Server renders nothing for home route, client will handle redirect
  return (
    <Routes>
      <Route path="/" element={null} />
      {tools.map((tool) => (
        <Route
          key={tool.id}
          path={`/${tool.id}`}
          element={<tool.component />}
        />
      ))}
    </Routes>
  );
}
