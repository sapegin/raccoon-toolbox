import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { usePersistentState } from '../hooks/usePersistentState';
import { tools } from '../tools';

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

  // Determine the initial route
  const isServerSide = typeof window === 'undefined';
  const initialRoute =
    location.pathname === '/'
      ? isServerSide
        ? tools[0].id
        : lastToolId
      : location.pathname.slice(1);

  return (
    <Routes>
      {isServerSide ? (
        // Server: render nothing for home route, client will handle redirect
        <Route path="/" element={null} />
      ) : (
        // Client: use Navigate for the home route
        <Route
          path="/"
          element={<Navigate to={`/${initialRoute}/`} replace />}
        />
      )}
      {tools.map((tool) => (
        <Route
          key={tool.id}
          path={`/${tool.id}/`}
          element={<tool.component />}
        />
      ))}
    </Routes>
  );
}
