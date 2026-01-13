import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AccountQuery } from "../account.query";
import { GetConnectionsQuery } from "./get-connections.query";
import { GetConnectionsResult } from "./get-connections.result";
@QueryHandler(GetConnectionsQuery)
export class GetConnectionsHandler implements IQueryHandler<GetConnectionsQuery, GetConnectionsResult> {
  constructor(private readonly accountQuery: AccountQuery) {}

  async execute(query: GetConnectionsQuery): Promise<GetConnectionsResult> {
    const accounts = await this.accountQuery.getConnections(query.userId);
    return accounts;
  }
}