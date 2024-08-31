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
  isFile(resource: Resource): resource is ResourceFile {
    return (resource as ResourceFile).type === "file";
  },
  isDirectory(resource: Resource): resource is ResourceDirectory {
    return (resource as ResourceDirectory).type === "directory";
  },
};
