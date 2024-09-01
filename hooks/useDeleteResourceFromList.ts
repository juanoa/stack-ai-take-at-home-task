import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";
import { Resource } from "@/modules/resources/domain/Resource";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteResourceFromList = () => {
  const { connection, resourcesTree } = useResourcesTreeContext();
  const queryClient = useQueryClient();

  return (resourceId: string) => {
    queryClient.setQueryData(
      ["connection", connection.id, "resources"],
      Resource.deleteResourceById(resourcesTree, resourceId),
    );
  };
};
