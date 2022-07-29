// Aquí se realizaron las interfaces de usuario
export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface User {
  username: string;
  email: string;
  password: string;
  oldpassword: string;
  newpassword: string;
}

export interface UserResponse extends User {
  message: string;
  token: string;
  userId: number;
  role: Roles;
}