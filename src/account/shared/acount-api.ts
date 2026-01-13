import { AccountDTO } from "./account.dto";
import { InvitationResponse } from "./invitation.response";

export interface AccountApi {
  getInvitationByMobileNumber(mobileNumber: string): Promise<InvitationResponse|null>;
  getById(id: string): Promise<AccountDTO|null>;
  getAccountsByIds(ids: string[]): Promise<AccountDTO[]>;
}