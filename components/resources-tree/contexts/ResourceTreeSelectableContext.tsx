import { Resource, ResourceFile } from "@/modules/resources/domain/Resource";
import React, { PropsWithChildren, useCallback, useState } from "react";

interface ResourcesTreeSelectableContextValue {
  selectedFiles: Array<ResourceFile>;
  onToggleResource: (resource: Resource) => void;
  onUnselectResource: (resource: Resource) => void;
  isResourceSelected: (resource: Resource) => boolean | "indeterminate";
  clearSelection: () => void;
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
  const [selectedFiles, setSelectedFiles] = useState<Array<ResourceFile>>([]);

  const onToggleFiles = useCallback(
    (files: Array<ResourceFile>) => {
      const allFilesWasSelected = files.every((file) => selectedFiles.includes(file));
      if (allFilesWasSelected) {
        setSelectedFiles(selectedFiles.filter((file) => !files.includes(file)));
      } else {
        setSelectedFiles([...selectedFiles, ...files]);
      }
    },
    [selectedFiles],
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
        return selectedFiles.includes(resource);
      }
      if (Resource.isDirectory(resource)) {
        const belongStatus = Resource.filesBelongToDirectory(resource, selectedFiles);
        if (belongStatus === "every") {
          return true;
        }
        if (belongStatus === "some") {
          return "indeterminate";
        }
      }
      return false;
    },
    [selectedFiles],
  );

  const onUnselectResource = useCallback(
    (resource: Resource) => {
      if (Resource.isFile(resource)) {
        setSelectedFiles(selectedFiles.filter((file) => file.id !== resource.id));
      }
      if (Resource.isDirectory(resource)) {
        setSelectedFiles(
          selectedFiles.filter((file) => !Resource.getAllSubFiles(resource).includes(file)),
        );
      }
    },
    [selectedFiles],
  );

  const clearSelection = useCallback(() => {
    setSelectedFiles([]);
  }, []);

  return (
    <ResourcesTreeSelectableContext.Provider
      value={{
        selectedFiles,
        onToggleResource,
        isResourceSelected,
        onUnselectResource,
        clearSelection,
      }}
    >
      {children}
    </ResourcesTreeSelectableContext.Provider>
  );
};
