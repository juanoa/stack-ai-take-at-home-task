import { KnowledgeBaseResource } from "@/modules/knowledge-bases/domain/KnowledgeBaseResource";
import { Resource } from "@/modules/resources/domain/Resource";

export type KnowledgeBase = {
  id: string;
  resources: Array<KnowledgeBaseResource>;
};

export const KnowledgeBase = {
  create: (id: string, resources: Array<KnowledgeBaseResource>): KnowledgeBase => ({
    id,
    resources,
  }),
  createPending: (id: KnowledgeBase["id"], resources: Array<Resource>): KnowledgeBase => {
    const pendingResources = resources.map((resource) =>
      KnowledgeBaseResource.createPending(resource.id),
    );

    return KnowledgeBase.create(id, pendingResources);
  },
  thereArePendingResources: (knowledgeBase: KnowledgeBase): boolean =>
    knowledgeBase.resources.some(KnowledgeBaseResource.isPending),
};
