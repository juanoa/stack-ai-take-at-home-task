import React, { useMemo } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { Trash2 } from "lucide-react";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";
import { useQueryClient } from "@tanstack/react-query";
import { useResourcesTreeSelectableContext } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";
import { useKnowledgeBaseContext } from "@/components/knowledge-bases/KnowledgeBaseContext";
import { Badge } from "@/components/ui/badge";

interface Props {
  resource: Resource;
}

export const ResourcesTreeRowIndexingStatus: React.FC<Props> = ({ resource }) => {
  const { getIndexingStatus } = useKnowledgeBaseContext();

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

  return <Badge>Indexed</Badge>;
};
