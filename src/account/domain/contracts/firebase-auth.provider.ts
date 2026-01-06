export interface FirebaseAuthProvider {
  getVerifiedMobileNumber(idToken: string): Promise<string>;
}
