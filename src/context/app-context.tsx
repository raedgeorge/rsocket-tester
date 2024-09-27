import { ReactNode, createContext, useState } from "react";

const ApplicationContext = createContext({
  routesHistory: [""],
  addRouteToHistory: (_route: string) => {},
});

interface Props {
  children: ReactNode;
}

const ApplicationContextProvider = ({ children }: Props) => {
  const [routes, setRoutes] = useState<string[]>([]);

  const addRouteToHistory = (route: string) => {
    setRoutes([...routes, route]);
  };

  const value = {
    routesHistory: routes,
    addRouteToHistory,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
