import {ensureSchema, pool} from "../db";
import {env} from "../env";
import bcrypt from "bcrypt";

export async function createUser(): Promise<void> {
    await ensureSchema();
    const existingUserAdmin = await pool.query(
        "SELECT id FROM usuarios WHERE email = $1",
        [env.userAdmin]
    );
    if ((existingUserAdmin.rowCount ?? 0) > 0) {
        return;
    }

    const senhaHash = await bcrypt.hash(env.userPassword, 10);
    await pool.query(
        "INSERT INTO usuarios (nome, email, senha_hash,perfil) VALUES($1, $2, $3, $4)",
        [env.userName, env.userAdmin, senhaHash, "ADMINISTRATOR"],
    )
}
createUser().catch(console.error).finally(()=> {pool.end()});