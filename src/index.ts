import "dotenv/config"
import { drizzle } from "drizzle-orm/libsql"
import { usersTable } from "./db/schema"
import bcrypt from "bcrypt"
import { ne } from "drizzle-orm"

function hashPassword(password: string) {
    const HASH_TIMES = 5

    return bcrypt.hashSync(password, HASH_TIMES)
}


const db = drizzle({
    connection: {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!
    }
})

/* 
    Save the inputted username and password to the database.
*/
async function signUp(username: string, password: string) {
    const users = await db.select().from(usersTable)
    for (let i = 0; i < users.length; i++) {
        if (users[i]["username"] !== username) continue

        throw new Error("Username is already in use")
    }
    
    const hashedPassword = hashPassword(password)
    console.log("Saving username and password to database...")

    const user: typeof usersTable.$inferInsert = {
        username: username,
        password: hashedPassword
    }

    await db.insert(usersTable).values(user)
    console.log("User successfully saved!")
}

/* 
    Check if the inputted username is stored in the database. If true then attempt to sign in.
*/
async function signIn(username: string, password: string) {
    const users = await db.select().from(usersTable)

    for (let i = 0; i < users.length; i++) {
        if (users[i]["username"] !== username) continue

        console.log("User exists")
        //sign in here
        return
    }

   throw new Error("User doesn't exist.")
}


signIn("me3", "mypassword123")