import { getResourcesByConnectionAndResourceFromStackAi } from "@/modules/resources/infrastructure/stack-ai/get-resources-by-connection-and-resource-from-stack-ai";

export const assembleResourcesFromStackAi = (
  resourcesDtos: Array<any>,
  connectionId: string,
) =>
  Promise.all(
    resourcesDtos.map(async (resourceDto) => {
      const isDirectory = resourceDto.inode_type === "directory";

      if (isDirectory) {
        const children = await getResourcesByConnectionAndResourceFromStackAi(
          connectionId,
          resourceDto.resource_id,
        );
        return {
          id: resourceDto.resource_id,
          name: assembleResourceName(resourceDto.inode_path.path),
          children,
          type: "directory",
        };
      }
      return {
        id: resourceDto.resource_id,
        name: assembleResourceName(resourceDto.inode_path.path),
        type: "file",
      };
    }),
  );

const assembleResourceName = (nameDto: string) => {
  if (!nameDto) {
    return "";
  }
  const name = nameDto.split("/").pop();
  return name ? name : nameDto;
};
