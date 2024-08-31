import { ConnectionProviders } from "@/modules/connections/domain/ConnectionProviders";

export type Connection = {
  id: string;
  name: string;
  provider: ConnectionProviders;
};
