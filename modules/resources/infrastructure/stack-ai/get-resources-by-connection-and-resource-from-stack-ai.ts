import { Connection } from "@/modules/connections/domain/Connection";
import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { Resource } from "@/modules/resources/domain/Resource";
import { assembleResourcesFromStackAi } from "@/modules/resources/infrastructure/stack-ai/assemble-resources-from-stack-ai";

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
      const resourcesDtos = resources as Array<any>;
      return assembleResourcesFromStackAi(resourcesDtos, connectionId);
    });
};
