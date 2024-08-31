import { NextResponse } from "next/server";
import { getConnectionsListFromStackAi } from "@/modules/connections/infrastructure/stack-ai/get-connections-list-from-stack-ai";

export async function GET() {
  const connections = await getConnectionsListFromStackAi();
  return NextResponse.json(connections);
}
