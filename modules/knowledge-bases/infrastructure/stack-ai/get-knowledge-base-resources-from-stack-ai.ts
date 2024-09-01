import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";
import { KnowledgeBaseResource } from "@/modules/knowledge-bases/domain/KnowledgeBaseResource";

const PATH = "/knowledge_bases/:knowledgeBaseId/resources/children";

export const getKnowledgeBaseResourcesFromStackAi = async (
  knowledgeBase: KnowledgeBase["id"],
  resourcePath: string = "/",
): Promise<Array<KnowledgeBaseResource>> => {
  const path = `${PATH.replace(":knowledgeBaseId", knowledgeBase)}?resource_path=${resourcePath}`;

  return fetchStackAi(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} -> Failed to get the knowledge base`);
      }
      return response.json();
    })
    .then(async (resources): Promise<Array<KnowledgeBaseResource>> => {
      const resourceDtos = resources as Array<any>;
      const result = await Promise.all(
        resourceDtos.map(async (resourceDto) => {
          const isDirectory = resourceDto.inode_type === "directory";
          if (!isDirectory) {
            return {
              id: resourceDto.resource_id as string,
              status: mapStatus(resourceDto.status),
              path: resourceDto.inode_path.path,
            } as KnowledgeBaseResource;
          }
          return await getKnowledgeBaseResourcesFromStackAi(
            knowledgeBase,
            resourceDto.inode_path.path,
          );
        }),
      );
      return result.flat();
    });
};

const mapStatus = (status: string): KnowledgeBaseResourceStatuses => {
  switch (status) {
    case "indexed":
      return KnowledgeBaseResourceStatuses.INDEXED;
    default:
      return KnowledgeBaseResourceStatuses.PENDING;
  }
};
