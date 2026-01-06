import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DeviceProps } from '../../domain/model/device/device';
import { BaseEntitySchemaClass } from './base.entity';

export type DeviceSchemaDocument = HydratedDocument<DeviceSchemaClass>;
// }
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class DeviceSchemaClass
  extends BaseEntitySchemaClass
  implements DeviceProps
{
  @Prop({ type: String, required: true })
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
