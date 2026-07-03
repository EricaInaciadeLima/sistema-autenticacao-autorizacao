import request from "supertest";
import { buildTestApp, SEED_EMAIL, SEED_PASSWORD, TestContext } from "./testApp";

describe("POST /login", () => {

    beforeEach(async () => {
        ctx = await buildTestApp();
    });

    it("deve efetuar um login e retornar um token valido", async () => {
        const result = await request().post("/auth/login").send({ email: "test@gmail.com", senha: "12345" });
        expect(result.status).toBe(200);
        expect(result.body).toEqual({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
            expiresln: expect.any(String),
            usuario: {
                id: "teste-id",
                nome: "teste-nome",
                perfil: "ADMINISTRADOR",
            },
        })
    });
});