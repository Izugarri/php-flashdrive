import { serve } from "https://deno.land/std@0.116.0/http/server.ts";
import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";

function setHeaders(headers: Headers, path: string, stats?: Deno.FileInfo) {
    headers.set("Content-disposition", "attachment; filename=" + path);
}
const serveFiles = (req: Request) => staticFiles('./')({ 
    request: req, 
    respondWith: (r: Response) => r 
})
serve((req) => serveFiles(req), { addr: ':3000' });
