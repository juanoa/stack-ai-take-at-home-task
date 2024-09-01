import React, { PropsWithChildren, useCallback, useState } from "react";
import { KnowledgeBase } from "@/modules/knowledge-bases/domain/KnowledgeBase";
import { Resource } from "@/modules/resources/domain/Resource";
import { useMutation } from "@tanstack/react-query";
import { createAndSyncKnowledgeBaseFromApi } from "@/modules/knowledge-bases/infrastructure/api/crate-and-sync-knowledge-base-from-api";
import { useResourcesTreeContext } from "@/components/resources-tree/contexts/ResourcesTreeContext";

interface KnowledgeBaseContextValue {
  knowledgeBase?: KnowledgeBase;
  indexResources: (resources: Array<Resource>) => Promise<void>;
  isPendingCreateKnowledgeBase: boolean;
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

  const { connection } = useResourcesTreeContext();

  const { mutateAsync: triggerCreateAndSyncKnowledgeBae, isPending: isPendingCreateKnowledgeBase } =
    useMutation({
      mutationFn: (resources: Array<Resource>) =>
        createAndSyncKnowledgeBaseFromApi(connection, resources),
    });

  const indexResources = useCallback(
    async (resources: Array<Resource>) => {
      const knowledgeBaseId = await triggerCreateAndSyncKnowledgeBae(resources);
      setCurrentKnowledgeBaseId(knowledgeBaseId);
    },
    [triggerCreateAndSyncKnowledgeBae],
  );

  return (
    <KnowledgeBaseContext.Provider value={{ indexResources, isPendingCreateKnowledgeBase }}>
      {children}
    </KnowledgeBaseContext.Provider>
  );
};
