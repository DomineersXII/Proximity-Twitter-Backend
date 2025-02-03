import { Hono } from "hono"


const app = new Hono()

app.get("/sign-in", async (c) => {
    const username = c.req.param("username")
    const password = c.req.param("password")
})