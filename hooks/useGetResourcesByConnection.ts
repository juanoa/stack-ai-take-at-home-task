import { useQuery } from "@tanstack/react-query";
import { getResourcesByConnectionFromApi } from "@/modules/resources/infrastructure/api/get-resources-by-connection-from-api";
import { Connection } from "@/modules/connections/domain/Connection";

export const useGetResourcesByConnection = (connection?: Connection) => {
  return useQuery({
    queryKey: ["connection", connection?.id, "resources"],
    queryFn: () => getResourcesByConnectionFromApi(connection?.id ?? ""),
    enabled: !!connection,
  });
};
