declare namespace Express {
  interface User {
    id?: number;
    convertLimit?: number;
    password: string;
    role?: string;
    username: string;
  }

  interface Request {
    user?: User;
  }
}
