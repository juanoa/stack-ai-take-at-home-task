import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";

const PATH = "/knowledge_bases/:knowledgeBaseId/resources/children";

export const getKnowledgeBaseFromStackAi = async (
  knowledgeBase: KnowledgeBase["id"],
): Promise<any> => {
  const data = {
    resource_path: "/",
  };

  const path = `${PATH.replace(":knowledgeBaseId", knowledgeBase)}?${encodeURI(JSON.stringify(data))}`;

  // FIXME: Error

  console.log(path);

  return fetchStackAi(path).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} -> Failed to get the knowledge base`);
    }
    return response.json();
  });
};
