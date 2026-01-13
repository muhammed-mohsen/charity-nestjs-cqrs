import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthRequest } from "../../../shared/types/auth-request";
import { GetConnectionsQuery } from "../../application/query/connections/get-connections.query";

@Controller({
  path: 'accounts',
  version: '1',
})
export class GetConnectionsController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/connections')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getConnections(@Request() req: AuthRequest) {
    return this.queryBus.execute(new GetConnectionsQuery(req.user.id));
  }
}