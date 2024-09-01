import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { Resource } from "@/modules/resources/domain/Resource";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAndSyncKnowledgeBaseFromApi } from "@/modules/knowledge-bases/infrastructure/api/crate-and-sync-knowledge-base-from-api";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";
import { getKnowledgeBaseFromApi } from "@/modules/knowledge-bases/infrastructure/api/get-knowledge-base-from-api";
import { KnowledgeBaseStatusModal } from "@/components/knowledge-bases/KnowledgeBaseStatusModal";
import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";

interface KnowledgeBaseContextValue {
  knowledgeBase?: KnowledgeBase;
  indexResources: (resources: Array<Resource>) => Promise<void>;
  isPendingCreateKnowledgeBase: boolean;
  getIndexingStatus: (resourceId: Resource["id"]) => KnowledgeBaseResourceStatuses | undefined;
}

export const KnowledgeBaseContext = React.createContext<KnowledgeBaseContextValue | undefined>(
  undefined,
);

export const useKnowledgeBaseContext = () => {
  const context = React.useContext(KnowledgeBaseContext);
  if (context === undefined) {
    throw new Error("useKnowledgeBaseContext must be used within a KnowledgeBaseProvider");
  }
  return context;
};

export const KnowledgeBaseContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentKnowledgeBaseId, setCurrentKnowledgeBaseId] = useState<KnowledgeBase["id"]>();

  const queryClient = useQueryClient();
  const { connection } = useResourcesTreeContext();

  const {
    data: knowledgeBase,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["knowledgeBase", currentKnowledgeBaseId],
    queryFn: () => getKnowledgeBaseFromApi(currentKnowledgeBaseId as string),
    enabled: !!currentKnowledgeBaseId,
  });

  const {
    mutateAsync: triggerCreateAndSyncKnowledgeBase,
    isPending: isPendingCreateKnowledgeBase,
  } = useMutation({
    mutationFn: (resources: Array<Resource>) =>
      createAndSyncKnowledgeBaseFromApi(connection, resources),
    onSuccess: (knowledgeBaseId, resources) => {
      setCurrentKnowledgeBaseId(knowledgeBaseId);
      const emptyKnowledgeBase = KnowledgeBase.createPending(knowledgeBaseId, resources);
      queryClient.setQueryData(["knowledgeBase", knowledgeBaseId], emptyKnowledgeBase);
    },
  });

  /// Refetch if there are pending resources
  useEffect(() => {
    if (!isFetching && knowledgeBase && KnowledgeBase.thereArePendingResources(knowledgeBase)) {
      const interval = setInterval(() => {
        refetch();
      }, 500);

      return () => clearInterval(interval);
    }
  }, [knowledgeBase, refetch, isFetching]);

  const indexResources = useCallback(
    async (resources: Array<Resource>) => {
      await triggerCreateAndSyncKnowledgeBase(resources);
    },
    [triggerCreateAndSyncKnowledgeBase],
  );

  const getIndexingStatus = useCallback(
    (resourceId: Resource["id"]) => {
      if (!knowledgeBase) return;
      return KnowledgeBase.getStatusByResourceId(knowledgeBase, resourceId);
    },
    [knowledgeBase],
  );

  return (
    <KnowledgeBaseContext.Provider
      value={{ indexResources, isPendingCreateKnowledgeBase, knowledgeBase, getIndexingStatus }}
    >
      {children}
      <KnowledgeBaseStatusModal knowledgeBase={knowledgeBase} />
    </KnowledgeBaseContext.Provider>
  );
};
