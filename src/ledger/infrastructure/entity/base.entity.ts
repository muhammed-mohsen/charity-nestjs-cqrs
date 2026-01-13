import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BaseEntitySchemaDocument = HydratedDocument<BaseEntitySchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class BaseEntitySchemaClass {
  @Prop()
  deletedAt: Date;
}
