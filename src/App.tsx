// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";

import { system } from "./theme/theme";
import MainLayout from "./components/templates/MainLayout";
import NonHeaderLayout from "./components/templates/NonHeaderLayout";

import Top from "./components/pages/Top";
import PortfolioDetail from "./components/pages/PortfolioDetail";
import NotFound from "./components/pages/NotFound";

import { CursorProvider } from "./contexts/CursorContext";
import { AnimationStateProvider } from "./contexts/AnimationStateContext";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Top /> },
    ],
  },
  {
    element: <NonHeaderLayout />,
    children: [
      { path: "portfolio/:id", element: <PortfolioDetail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider value={system}>
      <AnimationStateProvider>
        <CursorProvider>
          <Global
            styles={{
              "html, body": {
                backgroundColor: "#FFFFFF !important",
                color: "#2D3748",
                margin: 0,
                padding: 0,
                height: "100%",
                width: "100%",
              },
            }}
          />
          <RouterProvider router={router} />
        </CursorProvider>
      </AnimationStateProvider>
    </ChakraProvider>
  );
}

export default App;