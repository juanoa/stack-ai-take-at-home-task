import { getStackAiAuthHeaders } from "./get-stack-ai-auth-headers";
import { cookies } from "next/headers";

const HEADER_NAME = "token";

export const fetchStackAi = async (
  path: string,
  options: RequestInit = {},
): Promise<Response> => {
  // Get the user cookie for avoiding getting a new token
  // This code avoids getting a new token every time the API makes a request to the backend
  const userCookies = cookies();
  const userToken = userCookies.get(HEADER_NAME);
  let userTokenOrNewOne = userToken?.value;
  if (!userTokenOrNewOne) {
    const newToken = await getStackAiAuthHeaders();
    userCookies.set(HEADER_NAME, newToken.value, { maxAge: newToken.maxAge });
    userTokenOrNewOne = newToken.value;
  }

  if (!process.env.BACKEND_URL) {
    throw new Error("Missing API_URL environment variable");
  }

  const url = process.env.BACKEND_URL + path;

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${userTokenOrNewOne}`,
    },
  });
};
