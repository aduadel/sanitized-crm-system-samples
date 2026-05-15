import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
  redirectUri:
    process.env.AUTH_REDIRECT_URI ?? "http://localhost:3000/login",
  jwtSecret: process.env.JWT_SECRET ?? "development-secret",
  authClientId: process.env.AUTH_CLIENT_ID ?? "YOUR_CLIENT_ID",
  authDomain:
    process.env.AUTH_DOMAIN ??
    "https://YOUR_AUTH_DOMAIN.auth.region.amazoncognito.com",
  whatsappApiToken: process.env.WHATSAPP_API_TOKEN ?? "",
  whatsappApiUrl: process.env.WHATSAPP_API_URL ?? "",
};
