import { Connection } from "@/modules/connections/domain/Connection";
import { Resource } from "@/modules/resources/domain/Resource";

const PATH = "/api/connections/:connectionId/resources";

export const getResourcesByConnectionFromApi = async (
  connectionId: Connection["id"],
): Promise<Array<Resource>> => {
  const path = PATH.replace(":connectionId", connectionId);

  return fetch(path).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to get resources");
    }
    return response.json();
  });
};
