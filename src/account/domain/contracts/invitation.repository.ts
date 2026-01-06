import { Invitation } from '../model/invitation/invitation';

export abstract class InvitationRepository {
  abstract findByEmail(email: string): Promise<Invitation | null>;
  abstract save(invitation: Invitation): Promise<void>;
  abstract hasInvitation(
    invitedEmail: string,
    inviterId: string,
  ): Promise<boolean>;
}
