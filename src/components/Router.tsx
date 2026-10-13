import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { usePersistentState } from '../hooks/usePersistentState';
import { tools } from '../tools';
import { getToolIdFromPath } from '../util/getToolIdFromPath';

function getHomeRedirectToolId(
  isServerSide: boolean,
  lastToolId: string
): string {
  return isServerSide ? tools[0].id : lastToolId;
}

export function Router() {
  const location = useLocation();
  const [lastToolId, setLastToolId] = usePersistentState(
    'app.lastToolId',
    tools[0].id
  );

  useEffect(() => {
    const currentToolId = getToolIdFromPath(location.pathname);
    if (currentToolId && tools.some((tool) => tool.id === currentToolId)) {
      setLastToolId(currentToolId);
    }
  }, [location.pathname, setLastToolId]);

  // Determine the initial route
  const isServerSide = 'window' in globalThis === false;
  const initialRoute =
    location.pathname === '/'
      ? getHomeRedirectToolId(isServerSide, lastToolId)
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
