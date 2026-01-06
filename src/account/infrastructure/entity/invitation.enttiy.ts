import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntitySchemaClass } from './base.entity';
export type InvitationSchemaDocument = HydratedDocument<InvitationSchemaClass>;
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class InvitationSchemaClass extends BaseEntitySchemaClass {
  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ type: String, required: true })
  mobileNumber!: string;

  @Prop({ type: String, required: true })
  inviterId!: string;
}
export const InvitationSchema = SchemaFactory.createForClass(
  InvitationSchemaClass,
);
