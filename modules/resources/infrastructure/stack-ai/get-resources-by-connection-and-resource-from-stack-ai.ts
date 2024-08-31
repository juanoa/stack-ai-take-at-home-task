import { Connection } from "@/modules/connections/domain/Connection";
import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { Resource } from "@/modules/resources/domain/Resource";

const PATH =
  "/connections/:connectionId/resources/children?resource_id=:resourceId";

export const getResourcesByConnectionAndResourceFromStackAi = async (
  connectionId: Connection["id"],
  resourceId: Resource["id"],
): Promise<Array<Resource>> => {
  const path = PATH.replace(":connectionId", connectionId).replace(
    ":resourceId",
    resourceId,
  );

  return fetchStackAi(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get resources by connection and resource");
      }
      return response.json();
    })
    .then(async (resources) => {
      // TODO: Extract
      const resourcesDtos = resources as Array<any>;
      if (!resourcesDtos.length) {
        return [];
      }
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
