import { Connection } from "@/modules/connections/domain/Connection";
import { Resource } from "@/modules/resources/domain/Resource";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";

const PATH = "/api/connections/:connectionId/resources/index";

export const createAndSyncKnowledgeBaseFromApi = async (
  connection: Connection,
  resources: Array<Resource>,
): Promise<KnowledgeBase["id"]> => {
  const resourceIds = resources.map((resource) => resource.id);

  const response = await fetch(PATH.replace(":connectionId", connection.id), {
    method: "POST",
    body: JSON.stringify(resourceIds),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create knowledge base");
  }

  return (await response.json()).knowledgeBase.id;
};
