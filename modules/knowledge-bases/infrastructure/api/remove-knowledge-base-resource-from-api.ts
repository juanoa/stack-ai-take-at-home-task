import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";

const PATH = "/api/knowledge-bases/:knowledgeBaseId/resources";

export const removeKnowledgeBaseResourceFromApi = async (
  knowledgeBase: KnowledgeBase["id"],
  resourcePath: string,
): Promise<void> => {
  const path = `${PATH.replace(":knowledgeBaseId", knowledgeBase)}`;

  const response = await fetch(path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resourcePath }),
  });

  if (!response.ok) {
    throw new Error("Failed to get knowledge base");
  }

  return Promise.resolve();
};
