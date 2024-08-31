import React from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Trash2 } from "lucide-react";
import { useResourcesTreeContext } from "@/components/resources-tree/ResourcesTreeContext";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  resource: Resource;
}

export const ResourcesTreeRowRemoveButton: React.FC<Props> = ({ resource }) => {
  const queryClient = useQueryClient();
  const { connection, resourcesTree } = useResourcesTreeContext();

  const handleOnDeleteResource = () =>
    queryClient.setQueryData(
      ["connection", connection.id, "resources"],
      Resource.deleteResourceById(resourcesTree, resource.id),
    );

  return (
    <Trash2
      className="cursor-pointer opacity-0 transition-all hover:text-red-500 group-hover/icons:opacity-100"
      size={18}
      onClick={handleOnDeleteResource}
    />
  );
};
