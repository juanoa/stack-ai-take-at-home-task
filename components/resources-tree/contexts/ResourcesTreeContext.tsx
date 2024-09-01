import { Connection } from "@/modules/connections/domain/Connection";
import { Resource } from "@/modules/resources/domain/Resource";
import React from "react";

interface ResourcesTreeContextValue {
  connection: Connection;
  resourcesTree: Array<Resource>;
}

export const ResourcesTreeContext = React.createContext<
  ResourcesTreeContextValue | undefined
>(undefined);

export const useResourcesTreeContext = () => {
  const context = React.useContext(ResourcesTreeContext);
  if (context === undefined) {
    throw new Error(
      "useResourcesTreeContext must be used within a ResourcesTreeProvider",
    );
  }
  return context;
};

interface Props {
  children: React.ReactNode;
  connection: Connection;
  resources: Array<Resource>;
}

export const ResourcesTreeContextProvider: React.FC<Props> = ({
  children,
  connection,
  resources,
}) => {
  return (
    <ResourcesTreeContext.Provider
      value={{ connection, resourcesTree: resources }}
    >
      {children}
    </ResourcesTreeContext.Provider>
  );
};
