import { IEnvironment } from "@newsware/ui";
import React, { PropsWithChildren, useContext } from "react";

interface IServiceContext {
  environment: IEnvironment;
}

const ServiceContext = React.createContext<IServiceContext | null>(null);

interface IProps {
  environment: IEnvironment;
}

export const ServiceProvider = ({
  children,
  environment,
}: PropsWithChildren<IProps>) => {
  return (
    <ServiceContext.Provider
      value={{
        environment,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error(
      "useServiceContext has to be used within <ServiceProvider>"
    );
  }

  return context;
};
