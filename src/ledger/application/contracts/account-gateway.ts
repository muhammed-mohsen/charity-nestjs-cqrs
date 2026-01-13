import { AccountDTO } from "../../../account/shared/account.dto";
import { InvitationResponse } from "../models/invitation-response";

export interface AccountGateway {   

    getInvitationByMobileNumber(mobileNumber: string): Promise<InvitationResponse|null>;
    getAccounts(ids: string[]): Promise<AccountDTO[]>;
}