import React, { useMemo } from "react";
import { KnowledgeBaseResource } from "@/modules/knowledge-bases/domain/KnowledgeBaseResource";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";
import { ResourceFile } from "@/modules/resources/domain/Resource";
import { Check, LoaderCircle, X } from "lucide-react";
import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";

interface Props {
  knowledgeBaseResource: KnowledgeBaseResource;
}
export const KnowledgeBaseStatusResource: React.FC<Props> = ({ knowledgeBaseResource }) => {
  const { getFileById } = useResourcesTreeContext();

  const file: ResourceFile | undefined = useMemo(
    () => getFileById(knowledgeBaseResource.id),
    [getFileById, knowledgeBaseResource.id],
  );

  return (
    <div className="flex items-center justify-between rounded px-2 py-1.5 hover:bg-gray-50">
      <div>{file?.name}</div>
      {knowledgeBaseResource.status === KnowledgeBaseResourceStatuses.PENDING && (
        <LoaderCircle size={18} className="animate-spin text-gray-500" />
      )}
      {knowledgeBaseResource.status === KnowledgeBaseResourceStatuses.INDEXED && (
        <Check size={18} className="text-green-600" />
      )}
      {knowledgeBaseResource.status === KnowledgeBaseResourceStatuses.ERROR && (
        <X size={18} className="text-red-600" />
      )}
    </div>
  );
};
