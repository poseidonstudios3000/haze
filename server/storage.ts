import { db } from "./db";
import {
  inquiries,
  posts,
  corporateContent,
  siteContent,
  siteImages,
  type InsertInquiry,
  type Inquiry,
  type Post,
  type InsertPost,
  type CorporateContent,
  type InsertCorporateContent,
  type SiteContent,
  type InsertSiteContent,
  type SiteImage,
  type InsertSiteImage,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  getCorporateContent(): Promise<CorporateContent[]>;
  getCorporateContentByKey(sectionKey: string): Promise<CorporateContent | undefined>;
  upsertCorporateContent(data: InsertCorporateContent): Promise<CorporateContent>;
  getSiteContent(): Promise<SiteContent[]>;
  getSiteContentByKey(sectionKey: string): Promise<SiteContent | undefined>;
  upsertSiteContent(data: InsertSiteContent): Promise<SiteContent>;
  getSiteImages(): Promise<SiteImage[]>;
  getSiteImageByKey(imageKey: string): Promise<SiteImage | undefined>;
  upsertSiteImage(data: InsertSiteImage): Promise<SiteImage>;
  deleteSiteImage(imageKey: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(inquiries.createdAt);
  }

  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }

  async getCorporateContent(): Promise<CorporateContent[]> {
    return await db.select().from(corporateContent);
  }

  async getCorporateContentByKey(sectionKey: string): Promise<CorporateContent | undefined> {
    const [content] = await db.select().from(corporateContent).where(eq(corporateContent.sectionKey, sectionKey));
    return content;
  }

  async upsertCorporateContent(data: InsertCorporateContent): Promise<CorporateContent> {
    const existing = await this.getCorporateContentByKey(data.sectionKey);
    if (existing) {
      const [updated] = await db
        .update(corporateContent)
        .set({ content: data.content, updatedAt: new Date() })
        .where(eq(corporateContent.sectionKey, data.sectionKey))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(corporateContent).values(data).returning();
      return created;
    }
  }

  async getSiteContent(): Promise<SiteContent[]> {
    return await db.select().from(siteContent);
  }

  async getSiteContentByKey(sectionKey: string): Promise<SiteContent | undefined> {
    const [content] = await db.select().from(siteContent).where(eq(siteContent.sectionKey, sectionKey));
    return content;
  }

  async upsertSiteContent(data: InsertSiteContent): Promise<SiteContent> {
    const existing = await this.getSiteContentByKey(data.sectionKey);
    if (existing) {
      const [updated] = await db
        .update(siteContent)
        .set({ content: data.content, updatedAt: new Date() })
        .where(eq(siteContent.sectionKey, data.sectionKey))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(siteContent).values(data).returning();
      return created;
    }
  }

  async getSiteImages(): Promise<SiteImage[]> {
    return await db.select().from(siteImages);
  }

  async getSiteImageByKey(imageKey: string): Promise<SiteImage | undefined> {
    const [image] = await db.select().from(siteImages).where(eq(siteImages.imageKey, imageKey));
    return image;
  }

  async upsertSiteImage(data: InsertSiteImage): Promise<SiteImage> {
    const existing = await this.getSiteImageByKey(data.imageKey);
    if (existing) {
      const [updated] = await db
        .update(siteImages)
        .set({ url: data.url, originalName: data.originalName, updatedAt: new Date() })
        .where(eq(siteImages.imageKey, data.imageKey))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(siteImages).values(data).returning();
      return created;
    }
  }

  async deleteSiteImage(imageKey: string): Promise<void> {
    await db.delete(siteImages).where(eq(siteImages.imageKey, imageKey));
  }
}

export const storage = new DatabaseStorage();
