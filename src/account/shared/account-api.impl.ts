import { Inject } from "@nestjs/common";
import { InjectionToken } from "../application/injection-token";
import { AccountQuery } from "../application/query/account.query";
import { InvitationRepository } from "../domain/contracts/invitation.repository";
import { AccountDTO } from "./account.dto";
import { AccountApi } from "./acount-api";
import { DTOAccountMapper } from "./dto-account.mapper";
import { InvitationResponse } from "./invitation.response";

export class AccountApiImpl implements AccountApi {
  constructor(

    @Inject(InjectionToken.INVITATION_REPOSITORY)
    private readonly invitationRepository: InvitationRepository,
    @Inject(InjectionToken.ACCOUNT_QUERY)
    private readonly accountQuery: AccountQuery,
    private readonly dtoAccountMapper: DTOAccountMapper,
  ) {}

  async getById(id: string): Promise<AccountDTO|null> {
    return this.accountQuery.findById(id).then(this.dtoAccountMapper.toDTO)
  }
  async getAccountsByIds(ids: string[]): Promise<AccountDTO[]> {
    const accounts = await this.accountQuery.findByIds(ids);
    return (accounts.map(this.dtoAccountMapper.toDTO)||[]) as AccountDTO[]
  }
  async getInvitationByMobileNumber(mobileNumber: string): Promise<InvitationResponse|null> {
    const invitation = await this.invitationRepository.findByMobileNumber(mobileNumber);
    if(!invitation)
        return null;
    return {
      invitedMobileNumber: invitation.invitedMobileNumber.value,
      inviterId: invitation.inviterId,
    }
  }

}