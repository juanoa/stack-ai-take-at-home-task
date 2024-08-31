import { NextResponse } from "next/server";
import { getConnectionsListFromStackAI } from "@/modules/connections/infrastructure/stack-ai/get-connections-list-from-stack-a-i";

export async function GET() {
  const connections = await getConnectionsListFromStackAI();
  return NextResponse.json(connections);
}
