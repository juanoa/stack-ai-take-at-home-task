import { Connection } from "@/modules/connections/domain/Connection";
import { Resource } from "@/modules/resources/domain/Resource";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";

const PATH = "/api/knowledge-bases/:knowledgeBaseId";

export const getKnowledgeBaseFromApi = async (
  knowledgeBaseId: KnowledgeBase["id"],
): Promise<KnowledgeBase> => {
  const response = await fetch(PATH.replace(":knowledgeBaseId", knowledgeBaseId));

  if (!response.ok) {
    throw new Error("Failed to get knowledge base");
  }

  return (await response.json()) as Promise<KnowledgeBase>;
};
