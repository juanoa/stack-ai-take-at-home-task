import React, { useMemo } from "react";
import { Resource } from "@/modules/resources/domain/Resource";
import { X } from "lucide-react";
import { useKnowledgeBaseContext } from "@/components/knowledge-bases/KnowledgeBaseContext";
import { Badge } from "@/components/ui/badge";
import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";

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

  if (indexingStatus === KnowledgeBaseResourceStatuses.PENDING) {
    return <Badge variant="outline">Indexing</Badge>;
  }

  if (indexingStatus === KnowledgeBaseResourceStatuses.ERROR) {
    return <Badge variant="destructive">Error</Badge>;
  }

  return (
    <Badge className="flex flex-row gap-1.5">
      Indexed <X size={12} className="cursor-pointer" onClick={() => removeResource(resource.id)} />
    </Badge>
  );
};
