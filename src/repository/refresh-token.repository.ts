export interface RefreshToken {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Date;
}

export interface CreateRefreshTokenDTO {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
}

export interface IRefreshTokenRepository {
  findById(id: string): Promise<RefreshToken | null>;
  create(data: CreateRefreshTokenDTO): Promise<RefreshToken>;
  revoke(id: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
