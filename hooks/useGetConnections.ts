import { useQuery } from "@tanstack/react-query";
import { getConnectionsListFromApi } from "@/modules/connections/infrastructure/api/get-connections-list-from-api";

export const useGetConnections = () => {
  return useQuery({
    queryKey: ["connections"],
    queryFn: getConnectionsListFromApi,
  });
};
