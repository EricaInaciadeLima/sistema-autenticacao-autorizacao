import { pool } from "../../config/db";
import {
  CreateRefreshTokenDTO,
  IRefreshTokenRepository,
  RefreshToken,
} from "../pg/refresh.token.repository.2";


export class PostgresRefreshTokenRepository
  implements IRefreshTokenRepository
{
  async findById(id: string): Promise<RefreshToken | null> {
    const { rows } = await pool.query<RefreshToken>(
      `
      SELECT
        id,
        user_id,
        token_hash,
        expires_at,
        revoked_at,
        created_at
      FROM refresh_tokens
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    return rows[0] ?? null;
  }

  async create(
    data: CreateRefreshTokenDTO
  ): Promise<RefreshToken> {
    const { rows } = await pool.query<RefreshToken>(
      `
      INSERT INTO refresh_tokens (
        id,
        user_id,
        token_hash,
        expires_at
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        user_id,
        token_hash,
        expires_at,
        revoked_at,
        created_at
      `,
      [
        data.id,
        data.user_id,
        data.token_hash,
        data.expires_at,
      ]
    );

    return rows[0];
  }

  async revoke(id: string): Promise<void> {
    await pool.query(
      `
      UPDATE refresh_tokens
      SET revoked_at = NOW()
      WHERE id = $1
      `,
      [id]
    );
  }

  async deleteByUserId(userId: string): Promise<void> {
    await pool.query(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = $1
      `,
      [userId]
    );
  }
}