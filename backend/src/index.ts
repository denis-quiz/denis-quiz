import { Hono } from 'hono'
import { sql } from 'bun';
import {drizzle, NeonHttpDatabase} from 'drizzle-orm/neon-http';

const app = new Hono()
const db = drizzle(process.env.DATABASE_URL!);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result[0]);
}

getPgVersion();

export default app
