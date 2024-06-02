import path from "path";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import './App.css';
import Layout from "./components/layout/page";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ServiceProvider } from "./lib/context/service";
import { APP_ROUTES, RouteOption } from "./lib/routes/routes";
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import Docs from "./components/docs/page";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("javsacript", js);
SyntaxHighlighter.registerLanguage("typescript", ts);

function App() {

  const getRoutes = (routes: { [path: string]: RouteOption }, prefixPath: string): React.ReactNode[] => {
    const nodes = []
    for (const routePath in routes) {
      const route = routes[routePath]
      if (route.component) {
        nodes.push(<Route key={path.join(prefixPath, routePath)} path={path.join(prefixPath, routePath)} element={route.component} />)
      }

      if (route.options) {
        nodes.push(...getRoutes(route.options, path.join(prefixPath, routePath)))
      }
    }

    return nodes
  }

  return (
    <ServiceProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Docs />} />
              {
                getRoutes(APP_ROUTES, "").map((route) => route)
              }
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ServiceProvider>
  )
}

export default App
