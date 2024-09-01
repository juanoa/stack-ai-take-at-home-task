import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { getOrganizationIdFromStackAi } from "@/modules/commons/infrastructure/stack-ai/get-organization-id-from-stack-ai";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";

const PATH = "/knowledge_bases/sync/trigger/:knowledgeBaseId/:orgId";

export const syncKnowledgeBaseFromStackAi = async (
  knowledgeBaseId: KnowledgeBase["id"],
): Promise<Response> => {
  const orgId = await getOrganizationIdFromStackAi();

  const path = PATH.replace(":knowledgeBaseId", knowledgeBaseId).replace(":orgId", orgId);

  return fetchStackAi(path).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to sync the knowledge base");
    }
    return response.json();
  });
};
