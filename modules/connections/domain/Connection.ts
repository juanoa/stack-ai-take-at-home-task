import { ConnectionProviders } from "@/modules/connections/domain/ConnectionProviders";

export type Connection = {
  id: string;
  name: string;
  provider: ConnectionProviders;
};

export const Connection = {
  groupByProvider(
    connections: Array<Connection>,
  ): Record<string, Array<Connection>> {
    return connections.reduce(
      (acc, connection) => {
        if (!acc[connection.provider]) {
          acc[connection.provider] = [];
        }
        acc[connection.provider].push(connection);
        return acc;
      },
      {} as Record<string, Array<Connection>>,
    );
  },
};
