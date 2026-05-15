import { Router } from "express";
import { env } from "../config/env.js";

export const authRouter = Router();

authRouter.get("/redirect-uri", (_req, res) => {
  res.json({ redirectUri: env.redirectUri });
});

authRouter.get("/exchange-code", (req, res) => {
  const state = typeof req.query.state === "string" ? req.query.state : undefined;
  const decodedState = state ? decodeURIComponent(state) : "/dashboard";

  res.json({
    message: "Authorization code accepted in sample mode.",
    code: req.query.code ?? null,
    target: decodedState,
  });
});
