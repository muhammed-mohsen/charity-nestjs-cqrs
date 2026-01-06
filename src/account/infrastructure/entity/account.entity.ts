import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AccountProps } from '../../domain/model/account/account';
import { BaseEntitySchemaClass } from './base.entity';
import { DeviceSchemaDocument } from './device.entity';

export type AccountSchemaDocument = HydratedDocument<AccountSchemaClass>;
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class AccountSchemaClass
  extends BaseEntitySchemaClass
  implements AccountProps
{
  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ type: String, required: true })
  mobileNumber!: string;

  @Prop({ type: String, required: true })
  fullName!: string;

  @Prop({ type: String, required: true })
  photoUrl!: string;

  @Prop({ type: Boolean, required: true })
  blocked!: boolean;

  @Prop({ type: Date, required: true })
  joinedDate!: Date;

  @Prop({ type: Date, required: true })
  lastUpdated!: Date;

  @Prop({ type: [String], required: true })
  permissions!: string[];

  @Prop({ type: [], required: true })
  devices!: DeviceSchemaDocument[];
  // TODO: add columns/fields matching your persistence model
}

export const AccountSchema = SchemaFactory.createForClass(AccountSchemaClass);
