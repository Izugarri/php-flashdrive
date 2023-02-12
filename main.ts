import { listenAndServe } from "https://deno.land/std/http/server.ts";
 2
 3listenAndServe({ port: 3000 }, async (req) => {
 4  if (req.method === "GET" && req.url === "/") {
 5    req.respond({
 6      status: 200,
 7      headers: new Headers({
 8        "content-type": "text/html",
 9      }),
10      body: await Deno.open("./index.html"),
11    });
12  }
13});
