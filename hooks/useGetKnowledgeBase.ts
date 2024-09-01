import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { useQuery } from "@tanstack/react-query";
import { getKnowledgeBaseFromApi } from "@/modules/knowledge-bases/infrastructure/api/get-knowledge-base-from-api";

export const useGetKnowledgeBase = (knowledgeBaseId?: KnowledgeBase["id"]) => {
  return useQuery({
    queryKey: ["knowledgeBase", knowledgeBaseId],
    queryFn: () => getKnowledgeBaseFromApi(knowledgeBaseId as string),
    enabled: !!knowledgeBaseId,
  });
};
