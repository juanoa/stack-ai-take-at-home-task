import { fetchStackAi } from "@/modules/commons/infrastructure/stack-ai/fetch-stack-ai";

const PATH = "/organizations/me/current";

export const getOrganizationIdFromStackAi = async (): Promise<string> => {
  return fetchStackAi(PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get organization ID");
      }
      return response.json();
    })
    .then((response): string => response.org_id as string);
};
