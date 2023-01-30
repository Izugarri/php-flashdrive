import { serve } from "https://deno.land/std/http/mod.ts";
const BASE_PATH = './public';
const reqHandler = async (req: Request) => {
  const filePath = BASE_PATH + new URL(req.url).pathname;
  return new Response(filePath);
};
serve(reqHandler, { port: 8080 });
