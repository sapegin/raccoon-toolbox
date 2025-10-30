import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { tools } from '../tools';
import { usePersistentState } from '../hooks/usePersistentState';

export function Router() {
  const location = useLocation();
  const [lastToolId, setLastToolId] = usePersistentState(
    'app.lastToolId',
    tools[0].id
  );

  useEffect(() => {
    const currentPath = location.pathname.slice(1);
    if (currentPath && tools.some((tool) => tool.id === currentPath)) {
      setLastToolId(currentPath);
    }
  }, [location.pathname, setLastToolId]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lastToolId}`} replace />} />
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
