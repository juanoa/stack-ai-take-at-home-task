"use client";

import { ConnectionSelector } from "@/components/connections/ConnectionSelector";
import { useEffect, useState } from "react";
import { Connection } from "@/modules/connections/domain/Connection";
import { ResourcesTree } from "@/components/resources-tree/ResourcesTree";
import { useGetConnections } from "@/hooks/useGetConnections";

export default function Home() {
  const [selectedConnection, setSelectedConnection] = useState<Connection>();

  const { data: connections = [], isLoading } = useGetConnections();

  useEffect(() => {
    if (connections.length) {
      setSelectedConnection(connections[0]);
    }
  }, [connections]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
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
      <ResourcesTree connection={selectedConnection} />
    </div>
  );
}
