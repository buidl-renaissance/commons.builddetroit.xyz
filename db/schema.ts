import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  date: text("date").notNull(),
  location: text("location"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const members = sqliteTable("members", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bio: text("bio"),
  skills: text("skills"), // JSON array as string
  profilePicture: text("profile_picture"), // URL to profile picture
  website: text("website"), // Personal website URL
  linkedin: text("linkedin"), // LinkedIn profile URL
  github: text("github"), // GitHub profile URL
  twitter: text("twitter"), // Twitter/X profile URL
  other_links: text("other_links"), // JSON array of other links
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  roadmapLink: text("roadmap_link"),
  homepageLink: text("homepage_link"),
  additionalResources: text("additional_resources"), // JSON array as string
  leadName: text("lead_name").notNull(),
  leadEmail: text("lead_email").notNull(),
  teamMembers: text("team_members"), // JSON array as string
  status: text("status").default("pending"), // pending, approved, rejected
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  slug: text("slug").notNull().unique(),
  published: integer("published", { mode: "boolean" }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const openOctoberRegistrations = sqliteTable("open_october_registrations", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
