import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req) {
  const path = await Deno.realPath("./${path}");

  return new Response("./${path}"`);
}

serve(handler);
