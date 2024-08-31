import { Connection } from "@/modules/connections/domain/Connection";
import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";

const PATH = "/connections?connection_provider=gdrive&limit=1";

export const getConnectionsListFromStackAI = async (): Promise<
  Array<Connection>
> => {
  return fetchStackAi(PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get connections list");
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
