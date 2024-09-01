import { NextResponse } from "next/server";
import { getResourcesByConnectionFromStackAi } from "@/modules/resources/infrastructure/stack-ai/get-resources-by-connection-from-stack-ai";
import { Resource } from "@/modules/resources/domain/Resource";
import { createKnowledgeBaseFromStackAi } from "@/modules/knowledge-bases/infrastructure/stack-ai/create-knowledge-base-from-stack-ai";
import { syncKnowledgeBaseFromStackAi } from "@/modules/knowledge-bases/infrastructure/stack-ai/sync-knowledge-base-from-stack-ai";

export async function POST(request: Request, { params }: { params: { connectionId: string } }) {
  const connectionId = params.connectionId;
  const body = (await request.json()) as Array<Resource["id"]>;

  const knowledgeBaseId = await createKnowledgeBaseFromStackAi(connectionId, body);
  await syncKnowledgeBaseFromStackAi(knowledgeBaseId);

  return NextResponse.json({ knowledgeBase: { id: knowledgeBaseId } });
}
