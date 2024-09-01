import { Connection } from "@/modules/connections/domain/Connection";
import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { Resource } from "@/modules/resources/domain/Resource";
import { assembleResourcesFromStackAi } from "@/modules/resources/infrastructure/stack-ai/assemble-resources-from-stack-ai";
import { getOrganizationIdFromStackAi } from "@/modules/commons/infrastructure/stack-ai/get-organization-id-from-stack-ai";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";

const PATH = "/knowledge_bases";

export const createKnowledgeBaseFromStackAi = async (
  connectionId: Connection["id"],
  resourceIds: Array<Resource["id"]>,
): Promise<KnowledgeBase["id"]> => {
  const body = {
    connection_id: connectionId,
    connection_source_ids: resourceIds,
    name: "Test Knowledge Base",
    description: "This is a test knowledge base",
    indexing_params: {
      ocr: false,
      unstructured: true,
      embedding_params: { embedding_model: "text-embedding-ada-002" },
      chunker_params: { chunk_size: 1500, chunk_overlap: 500, chunker: "sentence" },
    },
  };

  return fetchStackAi(PATH, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} -> Failed create a knowledge base`);
      }
      return response.json();
    })
    .then((response): KnowledgeBase["id"] => response.knowledge_base_id as KnowledgeBase["id"]);
};
