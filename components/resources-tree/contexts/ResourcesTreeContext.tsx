import { Connection } from "@/modules/connections/domain/Connection";
import { Resource, ResourceFile } from "@/modules/resources/domain/Resource";
import React from "react";

interface ResourcesTreeContextValue {
  connection: Connection;
  resourcesTree: Array<Resource>;
  getFileById: (id: ResourceFile["id"]) => ResourceFile | undefined;
}

export const ResourcesTreeContext = React.createContext<ResourcesTreeContextValue | undefined>(
  undefined,
);

export const useResourcesTreeContext = () => {
  const context = React.useContext(ResourcesTreeContext);
  if (context === undefined) {
    throw new Error("useResourcesTreeContext must be used within a ResourcesTreeProvider");
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
  const getFileById = React.useCallback(
    (id: ResourceFile["id"]) => {
      const allSubFiles = resources.filter(Resource.isDirectory).flatMap(Resource.getAllSubFiles);
      const allFilesAndSubFiles = resources.filter(Resource.isFile).concat(allSubFiles);
      return allFilesAndSubFiles.find((file) => file.id === id);
    },
    [resources],
  );

  return (
    <ResourcesTreeContext.Provider value={{ connection, resourcesTree: resources, getFileById }}>
      {children}
    </ResourcesTreeContext.Provider>
  );
};
