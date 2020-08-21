export class User {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  refreshToken: string;
}
