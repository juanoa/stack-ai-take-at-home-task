"use client";

import { ConnectionSelector } from "@/components/connections/ConnectionSelector";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getConnectionsListFromApi } from "@/modules/connections/infrastructure/api/get-connections-list-from-api";
import { Connection } from "@/modules/connections/domain/Connection";

export default function Home() {
  const [selectedConnection, setSelectedConnection] = useState<Connection>();

  const { data: connections = [], isLoading } = useQuery({
    queryKey: ["connections"],
    queryFn: getConnectionsListFromApi,
  });

  useEffect(() => {
    if (connections.length) {
      setSelectedConnection(connections[0]);
    }
  }, [connections]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">File Picker</h1>
        <span>Select and index files</span>
      </div>
      <ConnectionSelector
        options={connections}
        value={selectedConnection}
        isLoading={isLoading}
      />
    </div>
  );
}
