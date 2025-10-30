import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Grid } from './components/Grid';
import { Stack } from './components/Stack';
import { Box } from './components/Box';
import { tools } from './tools';
import './App.css';
import { NavigationButton } from './components/NavigationButton';

export function App() {
  return (
    <Grid gridTemplateColumns="16rem auto" gap="m" height="100vh">
      <Stack
        as="ul"
        padding="s"
        borderRight="1px solid"
        borderColor="lightBorder"
        overflowY="auto"
        backgroundColor="uiBackground"
      >
        {tools.map((tool) => (
          <Box key={tool.id} as="li">
            <NavigationButton to={`/${tool.id}`}>{tool.name}</NavigationButton>
          </Box>
        ))}
      </Stack>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/${tools[0].id}`} replace />}
          />
          {tools.map((tool) => (
            <Route
              key={tool.id}
              path={`/${tool.id}`}
              element={<tool.component />}
            />
          ))}
        </Routes>
      </Suspense>
    </Grid>
  );
}
