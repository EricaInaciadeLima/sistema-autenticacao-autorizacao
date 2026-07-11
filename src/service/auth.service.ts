import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { IUserRepository } from "../repository/user.repository";
import { IRefreshTokenRepository } from "../repository/refresh-token.repository";

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  usuario: UsuarioResponse;
}

export interface UsuarioResponse {
  id: string;
  nome: string;
  perfil: string;
}

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async login(email: string, senha: string): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const passwordValid = await bcrypt.compare(
      senha,
      user.senha_hash
    );

    if (!passwordValid) {
      throw new Error("Credenciais inválidas");
    }

    return this.issueTokenPair(user);
  }

  private async issueTokenPair(user: {
    id: string;
    nome: string;
    perfil: string;
  }): Promise<LoginResult> {
    const accessToken = jwt.sign(
      {
        sub: user.id,
        nome: user.nome,
        perfil: user.perfil,
      },
      env.jwtAccessSecret,
      {
        expiresIn: env.jwtAccessExpiresInSeconds,
        algorithm: "HS256",
      }
    );

    // id do refresh token
    const refreshTokenId = crypto.randomUUID();

    const refreshToken = jwt.sign(
      {
        sub: user.id,
        jti: refreshTokenId,
      },
      env.jwtRefreshSecret,
      {
        expiresIn: env.jwtRefreshExpiresInSeconds,
        algorithm: "HS256",
      }
    );

    // salva apenas o hash do refresh token
    const tokenHash = await bcrypt.hash(refreshToken, 10);

    await this.refreshTokenRepository.create({
      id: refreshTokenId,
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: new Date(
        Date.now() + env.jwtRefreshExpiresInSeconds * 1000
      ),
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: env.jwtAccessExpiresInSeconds,
      usuario: {
        id: user.id,
        nome: user.nome,
        perfil: user.perfil,
      },
    };
  }
}
