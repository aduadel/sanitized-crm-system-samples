import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      id?: string;
      role?: string | string[];
      roles?: string[];
      "cognito:groups"?: string[];
    }

    interface Request {
      user?: UserPayload;
      role?: string;
    }
  }
}

export {};
