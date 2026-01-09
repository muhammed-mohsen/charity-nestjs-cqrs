import { Inject, Injectable } from '@nestjs/common';
import { FIREBASE_PROVIDER } from './firebase-tokens';

// very simple validator like your MobileNumber.create(...)
function normalizePhoneOrThrow(value: string): string {
  const v = (value ?? '').replace('+', '').trim();
  // adjust rules to match your domain MobileNumber rules
  if (!/^\d{10,15}$/.test(v)) throw new Error('Invalid phone');
  return v;
}

@Injectable()
export class FirebaseAuthProviderStub {
  constructor(
    @Inject(FIREBASE_PROVIDER)
    private readonly firebaseAuthProvider: {
      getVerifiedMobileNumber(idToken: string): Promise<string>;
    },
  ) {}

  async getVerifiedMobileNumber(idToken: string): Promise<string> {
    try {
      // DEV shortcut: treat idToken as phone number
      return normalizePhoneOrThrow(idToken);
    } catch {
      // fallback to real Firebase verification
      return this.firebaseAuthProvider.getVerifiedMobileNumber(idToken);
    }
  }
}
