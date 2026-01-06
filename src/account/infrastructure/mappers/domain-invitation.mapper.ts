import { Invitation } from '../../domain/model/invitation/invitation';
import { InvitationSchemaClass } from '../entity/invitation.enttiy';

export class DomainInvitationMapper {
  toDomain(doc: InvitationSchemaClass): Invitation {
    return Invitation.create(doc.mobileNumber, doc.inviterId);
  }
  toPersistence(model: Invitation): Partial<InvitationSchemaClass> {
    return {
      mobileNumber: model.invitedMobileNumber.value,
      inviterId: model.inviterId,
    };
  }
}
