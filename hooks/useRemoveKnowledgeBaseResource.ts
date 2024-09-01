import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Resource } from "@/modules/resources/domain/Resource";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { removeKnowledgeBaseResourceFromApi } from "@/modules/knowledge-bases/infrastructure/api/remove-knowledge-base-resource-from-api";
import { useToast } from "@/components/ui/toast/use-toast";

export const useRemoveKnowledgeBaseResource = (knowledgeBase?: KnowledgeBase) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const queryKey = ["knowledgeBase", knowledgeBase?.id];

  return useMutation({
    mutationFn: (resourceId: Resource["id"]) => {
      if (!knowledgeBase) return Promise.reject("Knowledge base doesn't exist");
      const resourcePath = KnowledgeBase.getResourcePathByResourceId(knowledgeBase, resourceId);
      if (!resourcePath) return Promise.reject("Resource doesn't have a path");
      return removeKnowledgeBaseResourceFromApi(knowledgeBase.id, resourcePath);
    },
    onMutate: async (resourceId: Resource["id"]) => {
      const queryKey = ["knowledgeBase", knowledgeBase?.id];

      await queryClient.cancelQueries({ queryKey });

      const previousKnowledgeBase = queryClient.getQueryData(queryKey) as KnowledgeBase;

      queryClient.setQueryData(queryKey, (prev: KnowledgeBase) =>
        KnowledgeBase.deleteResourceById(prev, resourceId),
      );

      return { previousKnowledgeBase };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.previousKnowledgeBase);
      toast({
        title: "Failed to remove resource",
        description: "An error occurred while removing the resource",
        variant: "destructive",
      });
    },
  });
};
