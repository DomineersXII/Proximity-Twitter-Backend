import "dotenv/config"
import { drizzle } from "drizzle-orm/libsql"
import { usersTable } from "./db/schema"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"

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
    Check if the inputted username is already in use. If not, save the inputted username and password (hashed) to the database.
*/
async function signUp(username: string, password: string): Promise<boolean> {
    const foundUser = await db.select().from(usersTable).where(eq(usersTable.username, username))

    if (foundUser.length !== 0) {
        return false
    }
    
    const hashedPassword = hashPassword(password)
    const user: typeof usersTable.$inferInsert = {
        username: username,
        password: hashedPassword
    }

    await db.insert(usersTable).values(user)
    
    return true
}

/* 
    Check if the inputted username is stored in the database. If true then attempt to sign in.
*/
async function signIn(username: string, password: string) {
    const foundUser = await db.select().from(usersTable).where(eq(usersTable.username, username))

    if (foundUser.length === 0) {
        throw new Error("User doesn't exist")
    }

    return await bcrypt.compare(password, foundUser[0].password);
}