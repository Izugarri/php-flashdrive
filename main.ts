import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

serve((_req) => {
  return new Response("Hello Worldssxxs!", {
    headers: { "content-type": "text/plain" },
  });
});
