import { NextResponse } from "next/server";
import { getResourcesByConnectionFromStackAi } from "@/modules/resources/infrastructure/stack-ai/get-resources-by-connection-from-stack-ai";
import { Resource } from "@/modules/resources/domain/Resource";
import { createKnowledgeBaseFromStackAi } from "@/modules/knowledge-bases/infrastructure/stack-ai/create-knowledge-base-from-stack-ai";
import { syncKnowledgeBaseFromStackAi } from "@/modules/knowledge-bases/infrastructure/stack-ai/sync-knowledge-base-from-stack-ai";
import { getKnowledgeBaseResourcesFromStackAi } from "@/modules/knowledge-bases/infrastructure/stack-ai/get-knowledge-base-resources-from-stack-ai";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";

export async function GET(request: Request, { params }: { params: { knowledgeBaseId: string } }) {
  const knowledgeBaseId = params.knowledgeBaseId;

  const knowledgeBaseResources = await getKnowledgeBaseResourcesFromStackAi(knowledgeBaseId);

  return NextResponse.json(KnowledgeBase.create(knowledgeBaseId, knowledgeBaseResources));
}
