import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";
import { KnowledgeBaseResource } from "@/modules/knowledge-bases/domain/KnowledgeBaseResource";

const PATH = "/knowledge_bases/:knowledgeBaseId/resources";

export const removeKnowledgeBaseResourceFromStackAi = async (
  knowledgeBase: KnowledgeBase["id"],
  resourcePath: string,
): Promise<void> => {
  const path = `${PATH.replace(":knowledgeBaseId", knowledgeBase)}?resource_path=${resourcePath}`;

  return fetchStackAi(path, { method: "DELETE" }).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} -> Failed to delete the resource`);
    }
    return Promise.resolve();
  });
};
