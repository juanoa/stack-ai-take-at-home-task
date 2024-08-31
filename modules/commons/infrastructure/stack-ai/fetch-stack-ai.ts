import { getStackAiAuthHeaders } from "./get-stack-ai-auth-headers";
import * as process from "node:process";

export const fetchStackAi = async (
  path: string,
  options: RequestInit = {},
): Promise<Response> => {
  const headers = await getStackAiAuthHeaders();

  if (!process.env.BACKEND_URL) {
    throw new Error("Missing API_URL environment variable");
  }

  const url = process.env.BACKEND_URL + path;

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...headers,
    },
  });
};
