  import { cors } from "https://deno.land/x/abc@v1.2.4/middleware/cors.ts";
  import { Application } from "https://deno.land/x/abc@v1.2.4/mod.ts";

  const APP_PORT = 8080;

  const app = new Application();

  app.static("/", "build", cors())
    .start({ port: APP_PORT });

  console.log(`Server listening on http://localhost:${APP_PORT}`);
