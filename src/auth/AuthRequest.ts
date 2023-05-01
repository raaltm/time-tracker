
export class AuthRequest extends Request {
  user: {
    username: string;
    sub: number;
    iat: number;
    exp: number;
  };
}
