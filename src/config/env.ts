import dotenv from "dotenv";

dotenv.config({ quiet: true });

function numberFromEnv(name: string, fallback: number): number {
  const value = process.env[name];

  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Variavel de ambiente invalida: ${name}`);
  }

  return parsed;
}
console.log("DATABASE_URL =", process.env.DATABASE_URL);
export const env = {
  databaseUrl: process.env.DATABASE_URL,
  port: numberFromEnv("PORT", 3001),
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? "dev-access-secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret",
  jwtAccessExpiresInSeconds: numberFromEnv("JWT_ACCESS_EXPIRES_IN_SECONDS", 900),
  jwtRefreshExpiresInSeconds: numberFromEnv(
    "JWT_REFRESH_EXPIRES_IN_SECONDS",
    60 * 60 * 24 * 7
  ),
};
