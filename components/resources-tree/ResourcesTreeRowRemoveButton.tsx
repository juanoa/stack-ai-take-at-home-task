import React from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Trash2 } from "lucide-react";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";
import { useQueryClient } from "@tanstack/react-query";
import { useResourcesTreeSelectableContext } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";
import { useDeleteResourceFromList } from "@/hooks/useDeleteResourceFromList";

interface Props {
  resource: Resource;
}

export const ResourcesTreeRowRemoveButton: React.FC<Props> = ({ resource }) => {
  const { onUnselectResource } = useResourcesTreeSelectableContext();

  const deleteResourceFromList = useDeleteResourceFromList();

  const handleOnDeleteResource = () => {
    deleteResourceFromList(resource.id);
    onUnselectResource(resource);
  };

  return (
    <Trash2
      className="cursor-pointer opacity-0 transition-all hover:text-red-500 group-hover/icons:opacity-100"
      size={18}
      onClick={handleOnDeleteResource}
    />
  );
};
