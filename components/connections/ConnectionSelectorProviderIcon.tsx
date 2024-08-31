import React from "react";
import { Connection } from "@/modules/connections/domain/Connection";
import { ConnectionProviders } from "@/modules/connections/domain/ConnectionProviders";
import { GoogleDriveIcon } from "@/components/ui/icons/GoogleDriveIcon";

interface Props {
  connection: Connection;
}

export const ConnectionSelectorProviderIcon: React.FC<Props> = ({
  connection,
}) => {
  if (connection.provider === ConnectionProviders.GoogleDrive) {
    return <GoogleDriveIcon />;
  }
  return null;
};
