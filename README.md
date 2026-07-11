# Sistema de Autenticacao e Autorizacao

API em Node.js, Express, TypeScript e PostgreSQL para autenticar usuarios e emitir tokens JWT.

## Requisitos

- Node.js 20+
- npm
- Docker e Docker Compose, para rodar com banco em container

## Rodando com Docker

Suba a API e o PostgreSQL:

```bash
docker compose up --build
```

A API ficara disponivel em:

```text
http://localhost:3001
```

O PostgreSQL ficara disponivel em:

```text
localhost:5432
```

Credenciais configuradas no `docker-compose.yml`:

```text
POSTGRES_DB=auth_db
POSTGRES_USER=auth_user
POSTGRES_PASSWORD=auth_password
DATABASE_URL=postgres://auth_user:auth_password@db:5432/auth_db
```

Para parar os containers:

```bash
docker compose down
```

Para remover tambem o volume do banco:

```bash
docker compose down -v
```

## Rodando localmente

Instale as dependencias:

```bash
npm install
```

Configure as variaveis de ambiente:

```bash
DATABASE_URL=postgres://auth_user:auth_password@localhost:5432/auth_db
PORT=3001
JWT_ACCESS_SECRET=local-access-secret
JWT_REFRESH_SECRET=local-refresh-secret
JWT_ACCESS_EXPIRES_IN_SECONDS=900
JWT_REFRESH_EXPIRES_IN_SECONDS=604800
```

Execute em modo desenvolvimento:

```bash
npm run dev
```

## Scripts

```bash
npm run build
npm start
npm test
```

## Endpoints

### POST `/auth/login`

Corpo da requisicao:

```json
{
  "email": "usuario@email.com",
  "senha": "senha"
}
```

Resposta de sucesso:

```json
{
  "accessToken": "jwt",
  "refreshToken": "jwt",
  "expiresIn": 900,
  "usuario": {
    "id": "uuid",
    "nome": "Nome",
    "perfil": "ADMINISTRADOR"
  }
}
```

## Banco de dados

Ao iniciar a aplicacao, o schema e criado automaticamente com as tabelas:

- `usuarios`
- `refresh_tokens`
