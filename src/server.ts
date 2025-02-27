import { Hono } from "hono"
import { cors } from "hono/cors"
import { serve } from '@hono/node-server'
import { signUp, signIn, post, getAllMessages } from "./functions.ts"

const app = new Hono()
const port = 3000

app.use('/*', cors())

app.post("/sign-in", async (c) => {
    const body = await c.req.json()

    if (body == undefined || body.username == undefined || body.password == undefined) {
        return c.text("false")
    }

    if (body.username.includes(" ") || body.password.includes(" ")) {
        return c.text("false")
    }

    if (body.username.length === 0) return c.text("false")
    if (body.password.length === 0) return c.text("false")

    const success = await signIn(body.username, body.password)
    return c.text(success.toString())
})

app.post("/sign-up", async (c) => {
    const body = await c.req.json()

    if (body == undefined || body.username == undefined || body.password == undefined) {
        return c.text("false")
    }

    if (body.username.includes(" ") || body.password.includes(" ")) {
        return c.text("false")
    }

    if (body.username.length === 0) return c.text("false")
    if (body.password.length === 0) return c.text("false")

    const success = await signUp(body.username, body.password)
    return c.text(success.toString())
})

app.post("/post-message", async (c) => {
    const body = await c.req.json()
    if (body == undefined || body.username == undefined || body.message == undefined || body.location == undefined) {
        return c.text("false")
    }

    if (body.username.includes(" ")) {
        return c.text("false")
    }

    if (body.username.length === 0) return c.text("false")
    if (body.message.length === 0) return c.text("false")

    const success = await post(body.username, body.message, body.location)

    return c.text(success.toString())
})


app.get("/get-all-messages", async (c) => {
    return c.json(await getAllMessages())
})

console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port: port
})