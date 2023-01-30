import { serve } from "https://deno.land/std/http/mod.ts";
const reqHandler = async (req: Request) => {
  const filePath = new URL(req.url).pathname;
  return new Response(filePath);
};
serve(reqHandler, { port: 8080 });
