import type { SetStateAction } from "react";

export interface AuthStates {
  signedUpUsers: User[];
  setsignedUpUsers:React.Dispatch<SetStateAction<User[]>>;
  loggedInUsers: User | null;
  setLoggedInUsers: React.Dispatch<SetStateAction<User|null>>;
}
export interface User {
  email: string;
  password: string;
}
