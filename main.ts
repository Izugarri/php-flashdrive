// deno run --allow-net --allow-read --allow-write

import { serve } from "https://deno.land/std/http/server.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";

const port = 8080;
const server = serve({ port: port });
const serverURL = `http://127.0.0.1:${port}`;
console.log(serverURL);

const te = new TextEncoder();
for await (const req of server) {
    const hostname = (req.conn.remoteAddr as Deno.NetAddr).hostname;
    console.log(hostname, req.method, req.url);
    if (hostname != "127.0.0.1") {
        req.respond({ status: 403 });
        continue;
    }
    let res: any = {};
    res.headers = new Headers();
    const origin = req.headers.get("origin");
    const acrm   = req.headers.get("access-control-request-method");
    const acrh   = req.headers.get("access-control-request-headers");
    if (origin) res.headers.set("Access-Control-Allow-Origin" , origin);
    if (acrm  ) res.headers.set("Access-Control-Allow-Methods", acrm);
    if (acrh  ) res.headers.set("Access-Control-Allow-Headers", acrh);
    switch (req.method) {
        case "GET":
            let url = req.url;
            if (url == "/end") {
                res.body = te.encode("<m>bye!</m>");
                await req.respond(res);
                server.close();
                continue;
            }
            if (url == "/") url = "/index.html";
            try {
                res = await serveFile(req, url.substring(1));
            } catch (e) {
                console.log(e);
                res.status = 404;
            }
            break;
        case "POST":
            let name = req.url.substring(1);
            try {
                Deno.statSync(name);
                console.log(name, req.contentLength, "denied");
                res.status = 403;
                break;
            } catch {}
            try {
                Deno.writeFile(name, await Deno.readAll(req.body));
                console.log(name, req.contentLength, "created");
                res.body = te.encode("<m>created</m>");
            } catch (e) {
                console.log(e);
                console.log(name, req.contentLength, "failed");
                res.status = 403;
            }
            break;
        case "OPTIONS":
            break;
        default:
            res.status = 403;
            break;
    }
    req.respond(res);
}
