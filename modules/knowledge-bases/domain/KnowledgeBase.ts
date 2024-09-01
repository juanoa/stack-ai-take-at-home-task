import { KnowledgeBaseResource } from "@/modules/knowledge-bases/domain/KnowledgeBaseResource";
import { Resource } from "@/modules/resources/domain/Resource";
import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";

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
  getStatusByResourceId: (
    knowledgeBase: KnowledgeBase,
    resourceId: Resource["id"],
  ): KnowledgeBaseResourceStatuses | undefined =>
    knowledgeBase.resources.find((resource) => resource.id === resourceId)?.status,
  getResourcePathByResourceId: (
    knowledgeBase: KnowledgeBase,
    resourceId: Resource["id"],
  ): string | undefined =>
    knowledgeBase.resources.find((resource) => resource.id === resourceId)?.path,
  deleteResourceById: (knowledgeBase: KnowledgeBase, resourceId: Resource["id"]): KnowledgeBase => {
    const resources = knowledgeBase.resources.filter((resource) => resource.id !== resourceId);
    return KnowledgeBase.create(knowledgeBase.id, resources);
  },
};
