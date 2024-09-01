export type Resource = {
  id: string;
  name: string;
};

export type ResourceFile = Resource & {
  type: "file";
};

export type ResourceDirectory = Resource & {
  type: "directory";
  children: Array<Resource>;
};

export const Resource = {
  isFile: (resource: Resource): resource is ResourceFile => {
    return (resource as ResourceFile).type === "file";
  },
  isDirectory: (resource: Resource): resource is ResourceDirectory => {
    return (resource as ResourceDirectory).type === "directory";
  },
  deleteResourceById: (resources: Array<Resource>, resourceId: string): Array<Resource> =>
    resources.reduce((acc, resource) => {
      if (resource.id === resourceId) {
        return acc;
      }

      if (Resource.isDirectory(resource)) {
        return [
          ...acc,
          {
            ...resource,
            children: Resource.deleteResourceById(resource.children, resourceId),
          },
        ];
      }

      return [...acc, resource];
    }, [] as Array<Resource>),
  getAllSubFiles: (resource: ResourceDirectory): Array<ResourceFile> =>
    resource.children.reduce<Array<ResourceFile>>((acc, child) => {
      if (Resource.isFile(child)) {
        return [...acc, child];
      }

      if (Resource.isDirectory(child)) {
        return [...acc, ...Resource.getAllSubFiles(child)];
      }

      return acc;
    }, []),
  filesBelongToDirectory: (
    directory: ResourceDirectory,
    files: Array<ResourceFile>,
  ): "none" | "some" | "every" => {
    const subFiles = Resource.getAllSubFiles(directory);
    if (subFiles.length === 0) {
      return "none";
    }
    if (subFiles.every((file) => files.includes(file))) {
      return "every";
    }
    if (subFiles.some((file) => files.includes(file))) {
      return "some";
    }
    return "none";
  },
};
