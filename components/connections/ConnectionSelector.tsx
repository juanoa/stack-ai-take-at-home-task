import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Connection } from "@/modules/connections/domain/Connection";
import { Skeleton } from "@/components/ui/loading";
import { GoogleDriveIcon } from "@/components/ui/icons/GoogleDriveIcon";
import { ConnectionSelectorProviderIcon } from "@/components/connections/ConnectionSelectorProviderIcon";

interface Props {
  options: Array<Connection>;
  value?: Connection;
  isLoading?: boolean;
}

export const ConnectionSelector: React.FC<Props> = ({
  options,
  value,
  isLoading,
}) => {
  const connectionsByProvider = Connection.groupByProvider(options);

  if (isLoading) {
    return <Skeleton className="h-[40px] w-[180px]" />;
  }

  return (
    <Select value={value?.id}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select a connection" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(connectionsByProvider).map((provider) => {
          const connections = connectionsByProvider[provider];
          return (
            <SelectGroup key={provider}>
              <SelectLabel>{provider}</SelectLabel>
              {connections.map((connection) => (
                <SelectItem value={connection.id} key={connection.id}>
                  <div className="flex items-center gap-3">
                    <ConnectionSelectorProviderIcon connection={connection} />
                    {connection.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
};
