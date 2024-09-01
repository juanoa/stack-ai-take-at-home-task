import { KnowledgeBaseResource } from "@/modules/knowledge-bases/domain/KnowledgeBaseResource";

export type KnowledgeBase = {
  id: string;
  resources: Array<KnowledgeBaseResource>;
};
