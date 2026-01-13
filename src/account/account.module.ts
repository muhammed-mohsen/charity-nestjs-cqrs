import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { DatabaseModule } from '../shared/infrastructure/DatabaseModule';
import { AccountController } from './api/controller/account.controller';
import { AuthController } from './api/controller/auth.controller';
import { InviterUserController } from './api/controller/inviter-user.controller';
import { RefreshTokenController } from './api/controller/refresh-token.controller';
import { RegisterFCMTokenController } from './api/controller/register-fcm-token.controller';
import { FirebaseModule } from './api/services/firebase/firebase.module';
import { JwtGeneratorImpl } from './api/services/jwt/jwt-generator.impl';
import { AuthenticateHandler } from './application/command/authenticate/authenticate.handler';
import { InvitationAccountHandler } from './application/command/invite-account/invite-account.handler';
import { RefreshTokenHandler } from './application/command/refresh-token/refresh-token.handler';
import { RegisterFCMTokenHandler } from './application/command/register-fcm-token/register-fcm-token.handler';
import { InjectionToken } from './application/injection-token';
import { AccountFactory } from './domain/account.factory';
import {
  AccountSchema,
  AccountSchemaClass,
} from './infrastructure/entity/account.entity';
import {
  InvitationSchema,
  InvitationSchemaClass,
} from './infrastructure/entity/invitation.enttiy';
import { DomainAccountMapper } from './infrastructure/mappers/domain-account.mapper';
import { DomainInvitationMapper } from './infrastructure/mappers/domain-invitation.mapper';
import { AccountRepositoryImpl } from './infrastructure/repository/account.repository.impl';
import { InvitationRepositoryImpl } from './infrastructure/repository/invitation.repository.impl';
import { JwtRefreshStrategy } from './infrastructure/strategies/jwt-refresh.strategy';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AccountQueryImpl } from './infrastructure/query/account.query.impl';

const domain = [AccountFactory];
const infrastructure = [
  DomainAccountMapper,
  DomainInvitationMapper,
  {
    provide: InjectionToken.ACCOUNT_REPOSITORY,
    useClass: AccountRepositoryImpl,
  },
  {
    provide: InjectionToken.ACCOUNT_QUERY,
    useClass: AccountQueryImpl,
  },
  {
    provide: InjectionToken.INVITATION_REPOSITORY,
    useClass: InvitationRepositoryImpl,
  },
];
const application = [
  InvitationAccountHandler,
  AuthenticateHandler,
  RefreshTokenHandler,
  RegisterFCMTokenHandler,
];
const interfaces = [
  {
    provide: InjectionToken.JWT_GENERATOR,
    useClass: JwtGeneratorImpl,
  },
  JwtStrategy,
  JwtRefreshStrategy,
];

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: AccountSchemaClass.name, schema: AccountSchema },
      { name: InvitationSchemaClass.name, schema: InvitationSchema },
    ]),
    JwtModule.register({}),
    MailModule,
    ConfigModule,
    CqrsModule,
    FirebaseModule,
  ],
  controllers: [
    AccountController,
    AuthController,
    RefreshTokenController,
    InviterUserController,
    RegisterFCMTokenController,
  ],
  providers: [...domain, ...infrastructure, ...application, ...interfaces],
  exports: [
    InjectionToken.ACCOUNT_REPOSITORY,
    InjectionToken.ACCOUNT_QUERY,
    InjectionToken.JWT_GENERATOR,
  ],
})
export class AccountModule {}
