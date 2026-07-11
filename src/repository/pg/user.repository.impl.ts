import { pool } from "../../config/db";
import {
  IUserRepository,
  User,
  CreateUserDTO,
} from "../user.repository";

export class PostgresUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query<User>(
      `
      SELECT
        id,
        nome,
        email,
        senha_hash,
        perfil,
        criado_em
      FROM usuarios
      WHERE email = $1
      LIMIT 1
      `,
      [email]
    );

    return rows[0] ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const { rows } = await pool.query<User>(
      `
      SELECT
        id,
        nome,
        email,
        senha_hash,
        perfil,
        criado_em
      FROM usuarios
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    return rows[0] ?? null;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const { rows } = await pool.query<User>(
      `
      INSERT INTO usuarios (
        nome,
        email,
        senha_hash,
        perfil
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        nome,
        email,
        senha_hash,
        perfil,
        criado_em
      `,
      [
        data.nome,
        data.email,
        data.senha_hash,
        data.perfil,
      ]
    );

    const user = rows[0];

    if (!user) {
      throw new Error("Usuario nao foi criado");
    }

    return user;
  }
}
