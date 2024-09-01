import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { Resource } from "@/modules/resources/domain/Resource";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAndSyncKnowledgeBaseFromApi } from "@/modules/knowledge-bases/infrastructure/api/crate-and-sync-knowledge-base-from-api";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";
import { getKnowledgeBaseFromApi } from "@/modules/knowledge-bases/infrastructure/api/get-knowledge-base-from-api";
import { KnowledgeBaseStatusModal } from "@/components/knowledge-bases/KnowledgeBaseStatusModal";
import { KnowledgeBaseResourceStatuses } from "@/modules/knowledge-bases/domain/KnowledgeBaseResourceStatuses";
import { useToast } from "@/components/ui/toast/use-toast";
import { removeKnowledgeBaseResourceFromApi } from "@/modules/knowledge-bases/infrastructure/api/remove-knowledge-base-resource-from-api";
import { useRemoveKnowledgeBaseResource } from "@/hooks/useRemoveKnowledgeBaseResource";
import { useCreateAndSyncKnowledgeBase } from "@/hooks/useCreateAndSyncKnowledgeBase";
import { useGetKnowledgeBase } from "@/hooks/useGetKnowledgeBase";

interface KnowledgeBaseContextValue {
  knowledgeBase?: KnowledgeBase;
  indexResources: (resources: Array<Resource>) => Promise<void>;
  isPendingCreateKnowledgeBase: boolean;
  getIndexingStatus: (resourceId: Resource["id"]) => KnowledgeBaseResourceStatuses | undefined;
  removeResource: (resourceId: Resource["id"]) => Promise<void>;
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    data: knowledgeBase,
    refetch: refetchKnowledgeBase,
    isFetching: isFetchingKnowledgeBase,
  } = useGetKnowledgeBase(currentKnowledgeBaseId);

  const {
    mutateAsync: triggerCreateAndSyncKnowledgeBase,
    isPending: isPendingCreateKnowledgeBase,
  } = useCreateAndSyncKnowledgeBase({ onSuccess: setCurrentKnowledgeBaseId });

  // Refetch if there are pending resources
  useEffect(() => {
    if (
      !isFetchingKnowledgeBase &&
      knowledgeBase &&
      KnowledgeBase.thereArePendingResources(knowledgeBase)
    ) {
      setIsModalVisible(true);
      const interval = setInterval(() => {
        refetchKnowledgeBase();
      }, 500);

      return () => clearInterval(interval);
    }
  }, [knowledgeBase, refetchKnowledgeBase, isFetchingKnowledgeBase]);

  const { mutate: triggerRemoveElements } = useRemoveKnowledgeBaseResource(knowledgeBase);

  const removeResource = useCallback(
    async (resourceId: Resource["id"]) => {
      triggerRemoveElements(resourceId);
    },
    [triggerRemoveElements],
  );

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
      value={{
        indexResources,
        isPendingCreateKnowledgeBase,
        knowledgeBase,
        getIndexingStatus,
        removeResource,
      }}
    >
      {children}
      <KnowledgeBaseStatusModal
        knowledgeBase={knowledgeBase}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </KnowledgeBaseContext.Provider>
  );
};
