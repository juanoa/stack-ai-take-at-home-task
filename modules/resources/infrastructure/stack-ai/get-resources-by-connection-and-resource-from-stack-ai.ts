import { Connection } from "@/modules/connections/domain/Connection";
import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { Resource } from "@/modules/resources/domain/Resource";

const PATH =
  "https://api.stack-ai.com/connections/:connectionId/resources?resource_id=:resourceId";

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
    .then((connections) => {
      const connectionDtos = connections as Array<any>;
      return connectionDtos.map((connectionDto) => {
        return {
          id: connectionDto.connection_id,
          name: connectionDto.name,
          provider: connectionDto.connection_provider,
        };
      });
    });
};
