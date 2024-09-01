const path = "/auth/v1/token?grant_type=password";

type AuthHeaders = {
  value: string;
  maxAge: number;
};

export const getStackAiAuthHeaders = async (): Promise<AuthHeaders> => {
  console.warn("Getting new token...");
  if (
    !process.env.AUTH_URL ||
    !process.env.AUTH_API_KEY ||
    !process.env.AUTH_EMAIL ||
    !process.env.AUTH_PASSWORD
  ) {
    throw new Error("Missing AUTH_URL environment variable");
  }

  const url = process.env.AUTH_URL + path;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ApiKey: process.env.AUTH_API_KEY,
    },
    body: JSON.stringify({
      email: process.env.AUTH_EMAIL,
      password: process.env.AUTH_PASSWORD,
      gotrue_meta_security: {},
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get Stack AI auth headers");
  }

  const { access_token, expires_in } = await response.json();

  return {
    value: access_token,
    maxAge: expires_in,
  };
};
