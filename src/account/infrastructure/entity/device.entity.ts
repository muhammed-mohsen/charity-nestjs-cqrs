import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DeviceProps } from '../../domain/model/device/device';

export type DeviceSchemaDocument = HydratedDocument<DeviceSchemaClass>;
// }
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  _id: false,
})
export class DeviceSchemaClass implements DeviceProps {
  @Prop({ type: String, required: true, unique: true })
  deviceId!: string;
  @Prop({ type: String, required: true })
  deviceType!: string;

  @Prop({ type: String, required: true })
  refreshToken!: string;

  @Prop({ type: String, required: true })
  fcmToken!: string;

  @Prop({ type: Date, required: true })
  lastAccessTime!: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(DeviceSchemaClass);
