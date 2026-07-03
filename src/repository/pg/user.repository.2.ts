export interface User {
  id: string;
  nome: string;
  email: string;
  senha_hash: string;
  perfil: string;
  criado_em: Date;
}

export interface CreateUserDTO {
  nome: string;
  email: string;
  senha_hash: string;
  perfil: string;
}

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
}