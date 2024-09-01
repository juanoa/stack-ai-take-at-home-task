import { NextResponse } from "next/server";
import { getResourcesByConnectionFromStackAi } from "@/modules/resources/infrastructure/stack-ai/get-resources-by-connection-from-stack-ai";

export async function GET(
  request: Request,
  { params }: { params: { connectionId: string } },
) {
  const connectionId = params.connectionId;

  const connections = await getResourcesByConnectionFromStackAi(connectionId);
  return NextResponse.json(connections);
}
