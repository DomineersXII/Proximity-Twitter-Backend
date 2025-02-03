import { Hono } from "hono"
import { signUp, signIn } from "./index.ts"

const app = new Hono()

app.get("/sign-in", async (c) => {
    const username = c.req.param("username")
    const password = c.req.param("password")
})