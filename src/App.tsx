import { Grid } from './components/Grid';
import { Stack } from './components/Stack';
import { Box } from './components/Box';
import { tools } from './tools';
import './App.css';
import { NavigationButton } from './components/NavigationButton';
import { Flex, VisuallyHidden } from '../styled-system/jsx';
import { Router } from './components/Router';
import { Suspense } from 'react';
import { Spinner } from './components/Spinner';

export function App() {
  return (
    <>
      <VisuallyHidden as="h1">Raccoon Toolbox</VisuallyHidden>
      <Grid gridTemplateColumns="16rem auto" gap="m" px="s" height="100vh">
        <Stack
          as="ul"
          gap="xs"
          padding="s"
          borderRight="1px solid"
          borderColor="lightBorder"
          overflowY="auto"
          backgroundColor="uiBackground"
        >
          {tools.map((tool) => (
            <li key={tool.id}>
              <NavigationButton to={`/${tool.id}`}>
                {tool.name}
              </NavigationButton>
            </li>
          ))}
        </Stack>
        <Suspense
          fallback={
            <Flex height="100vh" alignItems="center" justifyContent="center">
              <Spinner />
            </Flex>
          }
        >
          <Router />
        </Suspense>
      </Grid>
    </>
  );
}
