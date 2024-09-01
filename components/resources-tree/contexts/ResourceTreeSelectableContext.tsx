import { Resource, ResourceFile } from "@/modules/resources/domain/Resource";
import React, { PropsWithChildren, useCallback, useState } from "react";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";

interface ResourcesTreeSelectableContextValue {
  onToggleResource: (resource: Resource) => void;
  isResourceSelected: (resource: Resource) => boolean | "indeterminate";
}

export const ResourcesTreeSelectableContext = React.createContext<
  ResourcesTreeSelectableContextValue | undefined
>(undefined);

export const useResourcesTreeSelectableContext = () => {
  const context = React.useContext(ResourcesTreeSelectableContext);
  if (context === undefined) {
    throw new Error(
      "useResourcesTreeSelectableContext must be used within a ResourcesTreeSelectableProvider",
    );
  }
  return context;
};

export const ResourcesTreeSelectableContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedResources, setSelectedResources] = useState<Array<ResourceFile>>([]);

  const { resourcesTree } = useResourcesTreeContext();

  const onToggleFiles = useCallback(
    (files: Array<ResourceFile>) => {
      const allFilesWasSelected = files.every((file) => selectedResources.includes(file));
      if (allFilesWasSelected) {
        setSelectedResources(selectedResources.filter((file) => !files.includes(file)));
      } else {
        setSelectedResources([...selectedResources, ...files]);
      }
    },
    [selectedResources],
  );

  const onToggleResource = useCallback(
    (resource: Resource) => {
      if (Resource.isFile(resource)) {
        onToggleFiles([resource]);
      }
      if (Resource.isDirectory(resource)) {
        onToggleFiles(Resource.getAllSubFiles(resource));
      }
    },
    [onToggleFiles],
  );

  const isResourceSelected = useCallback(
    (resource: Resource): boolean | "indeterminate" => {
      if (Resource.isFile(resource)) {
        return selectedResources.includes(resource);
      }
      if (Resource.isDirectory(resource)) {
        const belongStatus = Resource.filesBelongToDirectory(resource, selectedResources);
        if (belongStatus === "every") {
          return true;
        }
        if (belongStatus === "some") {
          return "indeterminate";
        }
      }
      return false;
    },
    [selectedResources],
  );

  return (
    <ResourcesTreeSelectableContext.Provider value={{ onToggleResource, isResourceSelected }}>
      {children}
    </ResourcesTreeSelectableContext.Provider>
  );
};
