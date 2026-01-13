import { IQueryResult } from "@nestjs/cqrs";

export interface GetConnectionResult extends IQueryResult {
  id: string;
  fullName: string;
  photoUrl: string;
  permissions: string[];
}
export type GetConnectionsResult = GetConnectionResult[];