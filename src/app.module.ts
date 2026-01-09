import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import path from 'path';
import { AccountModule } from './account/account.module';
import { FirebaseModule } from './account/interface/services/firebase/firebase.module';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import { AllConfigType } from './config/config.type';
import databaseConfig from './database/config/database.config';
import fileConfig from './files/config/file.config';
import mailConfig from './mailer/config/mail.config';
import { DatabaseModule } from './shared/infrastructure/DatabaseModule';
import { RequestStorageMiddleware } from './shared/middleware/RequestStorageMiddleware';

// const infrastructureDatabaseModule = MongooseModule.forRootAsync({
//   useClass: MongooseConfigService,
// });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AccountModule,
    FirebaseModule,
    // UsersModule,
    // FilesModule,
    // AuthModule,
    // SessionModule,
    // MailModule,
    // MailerModule,
    // HomeModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('*');
  }
}
