import { Connection } from "@/modules/connections/domain/Connection";

const PATH = "/api/connections";

export const getConnectionsListFromApi = async (): Promise<
  Array<Connection>
> => {
  return fetch(PATH).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to get connections list");
    }
    return response.json();
  });
};
