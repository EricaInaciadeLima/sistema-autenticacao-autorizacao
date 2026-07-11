import express, { Express } from "express";
import { AuthController } from "./controller/auth.controller";
import { PostgresRefreshTokenRepository } from "./repository/pg/refresh.token.repository";
import { PostgresUserRepository } from "./repository/pg/user.repository.impl";
import { AuthService } from "./service/auth.service";

export function createApp(authService?: AuthService): Express {
    const app = express();
    const service = authService ?? createAuthService();
    const authController = new AuthController(service);

    app.use(express.json());
    app.post("/auth/login", (req, res) => authController.login(req, res));

    return app;
}

function createAuthService(): AuthService {
    const userRepository = new PostgresUserRepository();
    const refreshTokenRepository = new PostgresRefreshTokenRepository();

    return new AuthService(userRepository, refreshTokenRepository);
}
