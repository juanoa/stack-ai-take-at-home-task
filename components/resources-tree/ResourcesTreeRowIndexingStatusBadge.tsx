import React, { useMemo } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Trash2, X } from "lucide-react";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResourcesTreeSelectableContext } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";
import { useKnowledgeBaseContext } from "@/components/knowledge-bases/KnowledgeBaseContext";
import { Badge } from "@/components/ui/badge";
import { removeKnowledgeBaseResourceFromApi } from "@/modules/knowledge-bases/infrastructure/api/remove-knowledge-base-resource-from-api";

interface Props {
  resource: Resource;
}

export const ResourcesTreeRowIndexingStatusBadge: React.FC<Props> = ({ resource }) => {
  const { getIndexingStatus, removeResource } = useKnowledgeBaseContext();

  const indexingStatus = useMemo(
    () => getIndexingStatus(resource.id),
    [getIndexingStatus, resource.id],
  );

  if (!indexingStatus) {
    return null;
  }

  if (indexingStatus === "pending") {
    return <Badge variant="outline">Indexing</Badge>;
  }

  return (
    <Badge className="flex flex-row gap-1.5">
      Indexed <X size={12} className="cursor-pointer" onClick={() => removeResource(resource.id)} />
    </Badge>
  );
};
