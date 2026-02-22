import { pgTable, text, serial, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === CORPORATE CONTENT SCHEMA ===
export const corporateContent = pgTable("corporate_content", {
  id: serial("id").primaryKey(),
  sectionKey: text("section_key").notNull().unique(),
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === SITE CONTENT SCHEMA (generic content for all pages) ===
export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  sectionKey: text("section_key").notNull().unique(),
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === SITE IMAGES SCHEMA ===
export const siteImages = pgTable("site_images", {
  id: serial("id").primaryKey(),
  imageKey: text("image_key").notNull().unique(),
  url: text("url").notNull(),
  originalName: text("original_name"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === TABLE DEFINITIONS ===
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  eventType: text("event_type").notNull(),
  location: text("location").notNull(),
  date: text("date").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true });
export const insertCorporateContentSchema = createInsertSchema(corporateContent).omit({ id: true, updatedAt: true });
export const updateCorporateContentSchema = z.object({
  sectionKey: z.string(),
  content: z.record(z.any()),
});
export const insertSiteContentSchema = createInsertSchema(siteContent).omit({ id: true, updatedAt: true });
export const updateSiteContentSchema = z.object({
  sectionKey: z.string(),
  content: z.record(z.any()),
});
export const insertSiteImageSchema = createInsertSchema(siteImages).omit({ id: true, updatedAt: true });

// === TYPES ===
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type CorporateContent = typeof corporateContent.$inferSelect;
export type InsertCorporateContent = z.infer<typeof insertCorporateContentSchema>;
export type UpdateCorporateContent = z.infer<typeof updateCorporateContentSchema>;

export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type UpdateSiteContent = z.infer<typeof updateSiteContentSchema>;

export type SiteImage = typeof siteImages.$inferSelect;
export type InsertSiteImage = z.infer<typeof insertSiteImageSchema>;
