import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AccountSchemaClass } from './account.entity';
import { BaseEntitySchemaClass } from './base.entity';

export type SessionSchemaDocument = HydratedDocument<SessionSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class SessionSchemaClass extends BaseEntitySchemaClass {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AccountSchemaClass' })
  account: AccountSchemaClass;

  @Prop()
  hash: string;
}

export const SessionSchema = SchemaFactory.createForClass(SessionSchemaClass);

SessionSchema.index({ account: 1 });
