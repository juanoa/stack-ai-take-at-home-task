import { Connection } from "@/modules/connections/domain/Connection";
import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { Resource } from "@/modules/resources/domain/Resource";

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
    .then((resources): Array<Resource> => {
      const resourcesDtos = resources as Array<any>;
      return resourcesDtos.map((resourceDto) => {
        const isDirectory = resourceDto.inode_type === "directory";

        if (isDirectory) {
          return {
            id: resourceDto.resource_id,
            name: resourceDto.inode_path.path,
            children: [],
            type: "directory",
          };
        }
        return {
          id: resourceDto.resource_id,
          name: resourceDto.inode_path.path,
          type: "file",
        };
      });
    });
};
