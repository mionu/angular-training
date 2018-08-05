export interface User {
  id: number;
  fakeToken: string;
  name: {
    first: string;
    last: string;
  }
  password: string;
  login: string;
}
