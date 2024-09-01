import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";

export type KnowledgeBaseResource = {
  id: string;
  status: KnowledgeBaseResourceStatuses;
};
