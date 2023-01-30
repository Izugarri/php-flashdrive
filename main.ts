import { Application } from 'https://deno.land/x/abc@v1.0.2/mod.ts'

const app = new Application()

var localPort = 80
if (Deno.args.length > 0) {
  localPort = parseInt(Deno.args[0])
}
app.static('/', '.').file('/', 'index.html').start({ port: localPort })
