import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Resource } from "@/modules/resources/domain/Resource";
import { createAndSyncKnowledgeBaseFromApi } from "@/modules/knowledge-bases/infrastructure/api/crate-and-sync-knowledge-base-from-api";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";

interface Params {
  onSuccess?: (knowledgeBaseId: KnowledgeBase["id"]) => void;
}

export const useCreateAndSyncKnowledgeBase = ({ onSuccess }: Params) => {
  const { connection } = useResourcesTreeContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resources: Array<Resource>) =>
      createAndSyncKnowledgeBaseFromApi(connection, resources),
    onSuccess: (knowledgeBaseId, resources) => {
      onSuccess?.(knowledgeBaseId);
      const emptyKnowledgeBase = KnowledgeBase.createPending(knowledgeBaseId, resources);
      queryClient.setQueryData(["knowledgeBase", knowledgeBaseId], emptyKnowledgeBase);
    },
  });
};
