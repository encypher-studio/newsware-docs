import { IEnvironment } from "@newsware/ui";
import { Api } from "newsware";
import React, { PropsWithChildren, useContext } from "react";

interface IServiceContext {
  api: Api;
}

const ServiceContext = React.createContext<IServiceContext | null>(null);

interface IProps {
  environment: IEnvironment;
}

export const ServiceProvider = ({
  children,
  environment,
}: PropsWithChildren<IProps>) => {
  const api = new Api("", environment.apiEndpointDescription);

  return (
    <ServiceContext.Provider
      value={{
        api,
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
