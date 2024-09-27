import { ReactNode, createContext, useState } from "react";

export const ApplicationContext = createContext({
  routesHistory: [""],
  addRouteToHistory: (_route: string) => {},
});

interface Props {
  children: ReactNode;
}

const ApplicationContextProvider = ({ children }: Props) => {
  const [routes, setRoutes] = useState<string[]>([]);

  const addRouteToHistory = (route: string) => {
    const isRouteExisted = routes.find((r) => r === route);
    if (!isRouteExisted) setRoutes([...routes, route]);
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
