import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseModule } from '../firebase/firebase.module';
import { MailModule } from '../mail/mail.module';
import { DatabaseModule } from '../utils/DatabaseModule';
import { AuthenticateHandler } from './application/command/authenticate/authenticate.handler';
import { InvitationAccountHandler } from './application/command/invite-account/invite-account.handler';
import { InjectionToken } from './application/injection-token';
import { AccountFactory } from './domain/account.factory';
import { InvitationRepository } from './domain/contracts/invitation.repository';
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
import { InvitationRepositoryImpl } from './infrastructure/repository/invitation.repository';
import { AccountController } from './interface/controller/account.controller';
import { AuthController } from './interface/controller/auth.controller';
import { JwtGeneratorImpl } from './interface/services/jwt/jwt-generator.impl';

const domain = [AccountFactory];
const infrastructure = [
  AccountRepositoryImpl,
  DomainAccountMapper,
  InvitationRepositoryImpl,
  DomainInvitationMapper,
];
const application = [InvitationAccountHandler, AuthenticateHandler];

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
  controllers: [AccountController, AuthController],
  providers: [
    ...domain,
    ...infrastructure,
    ...application,
    {
      provide: InjectionToken.ACCOUNT_REPOSITORY,
      useClass: AccountRepositoryImpl,
    },
    {
      provide: InjectionToken.ACCOUNT_QUERY,
      useClass: AccountRepositoryImpl,
    },
    {
      provide: InvitationRepository,
      useClass: InvitationRepositoryImpl,
    },

    {
      provide: InjectionToken.JWT_GENERATOR,
      useClass: JwtGeneratorImpl,
    },
  ],
  exports: [
    InjectionToken.ACCOUNT_REPOSITORY,
    InjectionToken.ACCOUNT_QUERY,
    InjectionToken.JWT_GENERATOR,
  ],
})
export class AccountModule {}
