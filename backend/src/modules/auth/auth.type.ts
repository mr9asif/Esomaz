export interface RegisterUserPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}