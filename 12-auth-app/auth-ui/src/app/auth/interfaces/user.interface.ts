export interface User {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  roles: string[];
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
