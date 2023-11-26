export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  token: string;
  role: 'ADMIN' | 'TEACHER';
}
