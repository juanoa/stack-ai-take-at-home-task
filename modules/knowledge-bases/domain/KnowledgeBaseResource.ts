import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";

export type KnowledgeBaseResource = {
  id: string;
  status: KnowledgeBaseResourceStatuses;
};

export const KnowledgeBaseResource = {
  createPending: (id: string): KnowledgeBaseResource => ({
    id,
    status: KnowledgeBaseResourceStatuses.PENDING,
  }),
  isPending: (resource: KnowledgeBaseResource): boolean =>
    resource.status === KnowledgeBaseResourceStatuses.PENDING,
  sortById: (a: KnowledgeBaseResource, b: KnowledgeBaseResource): number =>
    a.id.localeCompare(b.id),
};
