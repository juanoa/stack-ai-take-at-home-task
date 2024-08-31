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
      <SelectTrigger className="w-[180px]">
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
                  {connection.name}
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
};
