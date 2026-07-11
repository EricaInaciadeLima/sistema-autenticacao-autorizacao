import { createApp } from "../app";
import { Express } from "express";
import { AuthService } from "../service/auth.service";

export const SEED_EMAIL = "test@gmail.com";
export const SEED_PASSWORD = "12345";

export interface TestContext {
    app: Express;
}

export function buildTestApp(): TestContext {
    const authService = {
        login: jest.fn().mockResolvedValue({
            accessToken: "access-token",
            refreshToken: "refresh-token",
            expiresIn: 900,
            usuario: {
                id: "teste-id",
                nome: "teste-nome",
                perfil: "ADMINISTRADOR",
            },
        }),
    } as unknown as AuthService;

    const app = createApp(authService);

    return { app };
}
