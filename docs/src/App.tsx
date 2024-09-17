import { appRoutes } from "@/core";
import { AppRouter, environment, IEnvironment } from "@newsware/ui";
import { useMemo } from "react";
import "./App.css";

function App() {
  const environmentValue = useMemo<IEnvironment>(() => {
    return environment(import.meta.env.VITE_ENV);
  }, []);

  return (
    <AppRouter
      routes={appRoutes(environmentValue)}
      environment={environmentValue}
      skipAuth
    />
  );
}

export default App;
