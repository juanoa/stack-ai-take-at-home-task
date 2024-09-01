import { removeKnowledgeBaseResourceFromStackAi } from "@/modules/knowledge-bases/infrastructure/stack-ai/remove-knowledge-base-resource-from-stack-ai";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { knowledgeBaseId: string } },
) {
  const knowledgeBaseId = params.knowledgeBaseId;
  const { resourcePath } = (await request.json()) as { resourcePath: string };

  await removeKnowledgeBaseResourceFromStackAi(knowledgeBaseId, resourcePath);

  return NextResponse.json({});
}
