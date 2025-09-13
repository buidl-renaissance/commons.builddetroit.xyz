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
  instagram: text("instagram"), // Instagram profile URL
  other_links: text("other_links"), // JSON array of other links
  modificationKey: text("modification_key").notNull().unique(), // For email-based modifications
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
  status: text("status").default("draft"), // draft, submitted, approved, rejected, in_review
  modificationKey: text("modification_key").notNull().unique(), // For email-based modifications
  submittedAt: text("submitted_at"), // When project was submitted for review
  reviewedAt: text("reviewed_at"), // When project was reviewed
  reviewedBy: text("reviewed_by"), // Email of reviewer
  reviewNotes: text("review_notes"), // Notes from reviewer
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
  name: text("name").notNull(),
  message: text("message"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const builderInvitations = sqliteTable("builder_invitations", {
  id: integer("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"), // Pre-filled name if provided
  bio: text("bio"), // Pre-filled bio if provided
  skills: text("skills"), // JSON array as string
  profilePicture: text("profile_picture"), // Pre-filled profile picture URL if provided
  website: text("website"), // Pre-filled website if provided
  linkedin: text("linkedin"), // Pre-filled LinkedIn if provided
  github: text("github"), // Pre-filled GitHub if provided
  twitter: text("twitter"), // Pre-filled Twitter if provided
  instagram: text("instagram"), // Pre-filled Instagram if provided
  other_links: text("other_links"), // JSON array of other links
  invitationToken: text("invitation_token").notNull().unique(), // Unique token for invitation link
  status: text("status").default("pending"), // pending, accepted, expired
  invitedBy: text("invited_by"), // Email of person who sent invitation
  invitedByName: text("invited_by_name"), // Name of person who sent invitation
  invitedByMemberId: integer("invited_by_member_id"), // ID of the member who sent invitation
  expiresAt: text("expires_at"), // Expiration date for invitation
  acceptedAt: text("accepted_at"), // When invitation was accepted
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
