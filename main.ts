import { opine } from "https://deno.land/x/opine/mod.ts";
import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";

const app = opine();

app.use(staticFiles("./"));

app.listen(3000);
