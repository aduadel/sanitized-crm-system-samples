import jwt from "jsonwebtoken";

/**
 * Verify JWT access token.
 *
 * Expects a Bearer token in the Authorization header:
 *   Authorization: Bearer <token>
 *
 * If the token is valid, attaches the decoded payload to `req.user`.
 * Otherwise responds with 401 Unauthorized.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  const secretOrPublicKey = process.env.JWT_SECRET;

  jwt.verify(token, secretOrPublicKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }

    req.user = decoded;
    next();
  });
};

/**
 * Factory for role-based authorization middleware.
 *
 * Usage:
 *   app.get("/admin", verifyToken, checkRole(["admin"]), handler);
 *
 * @param {string[]} allowedRoles - List of roles allowed to access the route.
 * @returns {import("express").RequestHandler}
 */
export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const userRoles =
      req.user.roles || req.user.role || req.user["cognito:groups"] || [];

    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasAccess) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden",
      });
    }

    next();
  };
};

/**
 * Middleware that attaches a primary role to `req.role`.
 *
 * Useful for quickly checking the current user's main role
 * inside controllers or other middlewares.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const addRole = (req, res, next) => {
  if (!req.user) {
    return next();
  }

  const userRoles =
    req.user.roles || req.user.role || req.user["cognito:groups"] || [];

  req.role = Array.isArray(userRoles) ? userRoles[0] : userRoles;

  next();
};
