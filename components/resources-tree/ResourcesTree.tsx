import { Connection } from "@/modules/connections/domain/Connection";
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getResourcesByConnectionFromApi } from "@/modules/resources/infrastructure/api/get-resources-by-connection-from-api";
import { ResourcesTreeRow } from "@/components/resources-tree/ResourcesTreeRow";
import { Skeleton } from "@/components/ui/loading";
import { ResourcesTreeContextProvider } from "@/components/resources-tree/contexts/ResourcesTreeContext";
import { ResourcesTreeSelectableContextProvider } from "@/components/resources-tree/contexts/ResourceTreeSelectableContext";
import { Separator } from "@/components/ui/separator";
import { IndexButton } from "@/components/index-button/IndexButton";
import { KnowledgeBaseContextProvider } from "@/components/knowledge-bases/KnowledgeBaseContext";
import { ResourcesTreeSearcher } from "@/components/resources-tree/ResourcesTreeSearcher";
import { Resource } from "@/modules/resources/domain/Resource";
import { useGetResourcesByConnection } from "@/hooks/useGetResourcesByConnection";

interface Props {
  connection?: Connection;
}

export const ResourcesTree: React.FC<Props> = ({ connection }) => {
  const [search, setSearch] = useState<string>("");

  const { data: resources = [], isLoading } = useGetResourcesByConnection(connection);

  const filteredResources = useMemo(
    () => Resource.searchByName(resources, search),
    [resources, search],
  );

  if (!connection) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-[24px] w-[580px]" />
        <Skeleton className="h-[24px] w-[380px]" />
        <Skeleton className="h-[24px] w-[480px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <ResourcesTreeContextProvider connection={connection} resources={resources}>
        <ResourcesTreeSelectableContextProvider>
          <KnowledgeBaseContextProvider>
            <ResourcesTreeSearcher value={search} onChange={setSearch} />
            <div className="w-full">
              <Separator />
              {filteredResources.map((resource) => (
                <ResourcesTreeRow key={resource.id} resource={resource} level={0} search={search} />
              ))}
            </div>
            <IndexButton />
          </KnowledgeBaseContextProvider>
        </ResourcesTreeSelectableContextProvider>
      </ResourcesTreeContextProvider>
    </div>
  );
};
