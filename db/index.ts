import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { events, subscriptions, members, projects, blogPosts, walkSubmissions } from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { 
  schema: { events, subscriptions, members, projects, blogPosts, walkSubmissions } 
}); 