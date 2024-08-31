import { Connection } from "@/modules/connections/domain/Connection";
import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { Resource } from "@/modules/resources/domain/Resource";
import { getResourcesByConnectionAndResourceFromStackAi } from "@/modules/resources/infrastructure/stack-ai/get-resources-by-connection-and-resource-from-stack-ai";

const PATH = "/connections/:connectionId/resources/children";

export const getResourcesByConnectionFromStackAi = async (
  connectionId: Connection["id"],
): Promise<Array<Resource>> => {
  const path = PATH.replace(":connectionId", connectionId);

  return fetchStackAi(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get resources by connection from Stack AI");
      }
      return response.json();
    })
    .then(async (resources): Promise<Array<Resource>> => {
      const resourcesDtos = resources as Array<any>;
      return await Promise.all(
        resourcesDtos.map(async (resourceDto) => {
          const isDirectory = resourceDto.inode_type === "directory";

          if (isDirectory) {
            const children =
              await getResourcesByConnectionAndResourceFromStackAi(
                connectionId,
                resourceDto.resource_id,
              );
            return {
              id: resourceDto.resource_id,
              name: resourceDto.inode_path.path,
              children,
              type: "directory",
            };
          }
          return {
            id: resourceDto.resource_id,
            name: resourceDto.inode_path.path,
            type: "file",
          };
        }),
      );
    });
};
