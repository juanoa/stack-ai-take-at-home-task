import { NextResponse } from "next/server";
import { getConnectionsListFromStackAi } from "@/modules/connections/infrastructure/stack-ai/get-connections-list-from-stack-ai";
import { getResourcesByConnectionFromStackAi } from "@/modules/resources/infrastructure/stack-ai/get-resources-by-connection-from-stack-ai";

export async function GET(
  request: Request,
  { params }: { params: { connectionId: string } },
) {
  const connectionId = params.connectionId;

  const connections = await getResourcesByConnectionFromStackAi(connectionId);
  return NextResponse.json(connections);
}
