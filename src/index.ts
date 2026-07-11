import { createApp } from "./app";
import { env } from "./config/env";
import { ensureSchema } from "./config/db";

async function main() {
    await ensureSchema();
    const app = createApp();
    app.listen(env.port);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
