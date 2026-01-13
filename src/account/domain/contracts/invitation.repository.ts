import { Invitation } from '../model/invitation/invitation';

export abstract class InvitationRepository {
  abstract findByMobileNumber(mobileNumber: string): Promise<Invitation | null>;
  abstract save(invitation: Invitation): Promise<void>;
  abstract hasInvitation(
    invitedMobileNumber: string,
    inviterId: string,
  ): Promise<boolean>;
}
