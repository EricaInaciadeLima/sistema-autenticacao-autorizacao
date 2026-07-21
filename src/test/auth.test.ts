 import request from "supertest";
import { buildTestApp, SEED_EMAIL, SEED_PASSWORD, TestContext } from "./test.app";

describe("POST /login", () => {
    let ctx: TestContext;

    beforeEach(async () => {
        ctx = buildTestApp();
    });

    it("deve efetuar um login e retornar um token valido", async () => {
        const result = await request(ctx.app)
            .post("/auth/login")
            .send({ email: SEED_EMAIL, senha: SEED_PASSWORD });
        expect(result.status).toBe(200);
        console.log(JSON.stringify(result.body));
        expect(result.body).toEqual({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
            expiresIn: expect.any(Number),
            usuario: {
                id: "teste-id",
                nome: "teste-nome",
                perfil: "ADMINISTRADOR",
            },
        });
    });
});
