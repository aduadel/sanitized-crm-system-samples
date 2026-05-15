import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, env.jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }

    req.user = decoded as Express.UserPayload;
    next();
  });
}

export function checkRole(allowedRoles: string[] = []): RequestHandler {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const userRoles =
      req.user.roles ?? req.user.role ?? req.user["cognito:groups"] ?? [];
    const roleList = Array.isArray(userRoles) ? userRoles : [userRoles];
    const hasAccess = allowedRoles.some((role) => roleList.includes(role));

    if (!hasAccess) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden",
      });
    }

    next();
  };
}

export function addRole(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    next();
    return;
  }

  const userRoles =
    req.user.roles ?? req.user.role ?? req.user["cognito:groups"] ?? [];
  req.role = Array.isArray(userRoles) ? userRoles[0] : userRoles;
  next();
}
