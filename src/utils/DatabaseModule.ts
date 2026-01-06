// src/utils/DatabaseModule.ts
import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { Connection, Schema } from 'mongoose';

export let writeConnection: Connection;
export let readConnection: Connection;

@Module({
  imports: [
    // WRITE connection – prefer PRIMARY
    MongooseModule.forRootAsync({
      connectionName: 'write',
      useFactory: (config: ConfigService) => {
        const baseUrl =
          config.get<string>('DATABASE_URL') ??
          `mongodb://${config.get<string>('DATABASE_HOST') ?? 'mongo-primary'}:${config.get<number>('DATABASE_PORT') ?? 27017}/${config.get<string>('DATABASE_NAME') ?? 'api'}?replicaSet=rs0`;

        // force primary for writes
        const uri = baseUrl.includes('readPreference=')
          ? baseUrl.replace(/readPreference=[^&]+/, 'readPreference=primary')
          : `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}readPreference=primary`;

        return { uri };
      },
      inject: [ConfigService],
    }),

    // READ connection – prefer SECONDARY (fallback to primary)
    MongooseModule.forRootAsync({
      connectionName: 'read',
      useFactory: (config: ConfigService) => {
        const baseUrl =
          config.get<string>('DATABASE_URL') ??
          `mongodb://${config.get<string>('DATABASE_HOST') ?? 'mongo-primary'}:${config.get<number>('DATABASE_PORT') ?? 27017}/${config.get<string>('DATABASE_NAME') ?? 'api'}?replicaSet=rs0`;

        const uri = baseUrl.includes('readPreference=')
          ? baseUrl.replace(
              /readPreference=[^&]+/,
              'readPreference=secondaryPreferred',
            )
          : `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}readPreference=secondaryPreferred`;

        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule implements OnModuleInit {
  static forFeature(
    entities: { name: string; schema: Schema }[],
  ): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forFeature(entities, 'write'),
        MongooseModule.forFeature(entities, 'read'),
      ],
    };
  }

  constructor(
    @InjectConnection('write') private readonly writeConn: Connection,
    @InjectConnection('read') private readonly readConn: Connection,
  ) {}

  onModuleInit() {
    writeConnection = this.writeConn;
    readConnection = this.readConn;
  }
}
