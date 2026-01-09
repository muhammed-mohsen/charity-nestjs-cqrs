import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { InjectionToken } from '../../../application/injection-token';
import { FirebaseAuthProviderImpl } from './firebase-auth.provider';
import { FirebaseAuthProviderStub } from './firebase-auth.provider.stub';
import { FIREBASE_ADMIN, FIREBASE_PROVIDER } from './firebase-tokens';

@Global()
@Module({
  providers: [
    {
      provide: FIREBASE_ADMIN,
      useFactory: () => {
        if (admin.apps.length === 0) {
          admin.initializeApp({
            credential: admin.credential.applicationDefault(),
          });
        }
        return admin;
      },
    },
    {
      provide: FIREBASE_PROVIDER,
      useClass: FirebaseAuthProviderImpl,
    },
    FirebaseAuthProviderStub,
    {
      provide: InjectionToken.FIREBASE_AUTH_PROVIDER,
      useFactory: (
        cfg: ConfigService,
        stub: FirebaseAuthProviderStub,
        real: FirebaseAuthProviderImpl, // now available because we also add it below OR avoid class injection (see note)
      ) => {
        const testMode = cfg.get<string>('FIREBASE_TEST_MODE') === 'true';
        return testMode ? stub : real;
      },
      inject: [
        ConfigService,
        FirebaseAuthProviderStub,
        FirebaseAuthProviderImpl,
      ],
    },
    FirebaseAuthProviderImpl,
  ],
  exports: [FIREBASE_ADMIN, InjectionToken.FIREBASE_AUTH_PROVIDER],
})
export class FirebaseModule {}
