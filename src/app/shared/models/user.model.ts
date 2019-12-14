export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  createdDate?: Date;
  isAdmin?: boolean;
  gender?: string;

  // private
  age?: number;
  status?: string;
  accomplice?: string;
  interest?: string;
  destination?: string;
}
