import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NullableType } from '../../../shared/types/nullable.type';
import { InvitationRepository } from '../../domain/contracts/invitation.repository';
import { Invitation } from '../../domain/model/invitation/invitation';
import {
  InvitationSchemaClass,
  InvitationSchemaDocument,
} from '../entity/invitation.enttiy';
import { DomainInvitationMapper } from '../mappers/domain-invitation.mapper';

@Injectable()
export class InvitationRepositoryImpl implements InvitationRepository {
  constructor(
    @InjectModel(InvitationSchemaClass.name, 'write')
    private readonly writeInvitationModel: Model<InvitationSchemaDocument>,
    private readonly mapper: DomainInvitationMapper,
  ) {}
  async findByEmail(email: string): Promise<NullableType<Invitation>> {
    const doc = await this.writeInvitationModel
      .findOne({ email: email })
      .exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }
  async save(invitation: Invitation): Promise<void> {
    const raw = this.mapper.toPersistence(invitation);
    await this.writeInvitationModel
      .updateOne(
        { mobileNumber: raw.mobileNumber, inviterId: raw.inviterId },
        { $set: raw },
        { upsert: true },
      )
      .exec();
  }
  async hasInvitation(
    invitedEmail: string,
    inviterId: string,
  ): Promise<boolean> {
    return (
      (await this.writeInvitationModel
        .exists({ email: invitedEmail, inviterId })
        .exec()) !== null
    );
  }
}
