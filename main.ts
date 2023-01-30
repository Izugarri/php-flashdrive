import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req) {
  const path = await Deno.realPath("./");

  return new Response(`The fully resolved path for ./ ${path}`);
}

serve(handler);
