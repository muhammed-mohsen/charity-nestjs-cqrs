import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type * as adminType from 'firebase-admin';
import { FirebaseAuthProvider } from '../../../domain/contracts/firebase-auth.provider';
import { FIREBASE_ADMIN } from './firebase-tokens';

@Injectable()
export class FirebaseAuthProviderImpl implements FirebaseAuthProvider {
  constructor(
    @Inject(FIREBASE_ADMIN) private readonly admin: typeof adminType,
  ) {}

  async getVerifiedMobileNumber(idToken: string): Promise<string> {
    try {
      const decoded = await this.admin.auth().verifyIdToken(idToken);
      const user = await this.admin.auth().getUser(decoded.uid);

      const phone = user.phoneNumber?.replace('+', '');
      if (!phone) throw new UnauthorizedException('Phone number not verified');

      return phone;
    } catch (e) {
      console.log(
        '🚀 ~ FirebaseAuthProviderImpl ~ getVerifiedMobileNumber ~ e:',
        e,
      );
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}
