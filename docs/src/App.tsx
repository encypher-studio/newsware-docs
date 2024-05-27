import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import CategoryCodes from "./components/category-codes/page";
import Layout from "./components/layout/page";
import { ThemeProvider } from "./components/theme/theme-provider";
import { ServiceProvider } from "./lib/context/service";

function App() {
  return (
    <ServiceProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Router>
            <Routes>
              <Route path="/category-codes" element={<CategoryCodes />} />
            </Routes>
          </Router>
        </Layout>
      </ThemeProvider>
    </ServiceProvider>
  )
}

export default App
