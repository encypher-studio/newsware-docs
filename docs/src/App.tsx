import path from "path";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import './App.css';
import Layout from "./components/layout/page";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ServiceProvider } from "./lib/context/service";
import { APP_ROUTES } from "./lib/routes/routes";
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("javsacript", js);

function App() {
  return (
    <ServiceProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Layout>
            <Routes>
              {
                Object.keys(APP_ROUTES).map((sectionPath) => {
                  const section = APP_ROUTES[sectionPath]
                  console.log("section", section)
                  return (
                    <>
                      {
                        section.component && <Route key={sectionPath} path={sectionPath} element={section.component} />
                      }
                      {
                        section.options && Object.keys(section.options).map((optionPath) => {
                          const option = section.options!![optionPath]
                          return (
                            <>
                              <Route key={path.join(sectionPath, optionPath)} path={path.join(sectionPath, optionPath)} element={option.component} />
                              {
                                option.options && Object.keys(option.options).map((subOptionPath) => {
                                  const subOption = option.options!![subOptionPath]
                                  return (
                                    <Route key={path.join(sectionPath, optionPath, subOptionPath)} path={path.join(sectionPath, optionPath, subOptionPath)} element={subOption.component} />
                                  )
                                })

                              }
                            </>
                          )
                        })
                      }
                    </>
                  )
                })
              }
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ServiceProvider>
  )
}

export default App
