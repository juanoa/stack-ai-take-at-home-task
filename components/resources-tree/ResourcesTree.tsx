import { Connection } from "@/modules/connections/domain/Connection";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getResourcesByConnectionFromApi } from "@/modules/resources/infrastructure/api/get-resources-by-connection-from-api";
import { ResourcesTreeRow } from "@/components/resources-tree/ResourcesTreeRow";
import { Skeleton } from "@/components/ui/loading";

interface Props {
  connection?: Connection;
}

export const ResourcesTree: React.FC<Props> = ({ connection }) => {
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["connection", "resources", connection?.id],
    queryFn: () => getResourcesByConnectionFromApi(connection?.id ?? ""),
    enabled: !!connection,
  });

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
    <div>
      {resources.map((resource) => (
        <ResourcesTreeRow key={resource.id} resource={resource} />
      ))}
    </div>
  );
};
