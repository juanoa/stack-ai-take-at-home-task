import { getKnowledgeBaseResourcesFromStackAi } from "@/modules/knowledge-bases/infrastructure/stack-ai/get-knowledge-base-resources-from-stack-ai";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { knowledgeBaseId: string } }) {
  const knowledgeBaseId = params.knowledgeBaseId;

  const knowledgeBaseResources = await getKnowledgeBaseResourcesFromStackAi(knowledgeBaseId);

  return NextResponse.json(KnowledgeBase.create(knowledgeBaseId, knowledgeBaseResources));
}
