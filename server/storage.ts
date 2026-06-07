import { db } from "./db.js";
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
} from "../shared/schema.js";
import { eq } from "drizzle-orm";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  deleteInquiry(id: number): Promise<void>;
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

  async deleteInquiry(id: number): Promise<void> {
    await db.delete(inquiries).where(eq(inquiries.id, id));
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

export class MemoryStorage implements IStorage {
  private inquiryId = 1;
  private postId = 1;
  private corporateContentId = 1;
  private siteContentId = 1;
  private siteImageId = 1;

  private inquiries: Inquiry[] = [];
  private posts: Post[] = [];
  private corporateContent: CorporateContent[] = [];
  private siteContent: SiteContent[] = [];
  private siteImages: SiteImage[] = [];

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: this.inquiryId++,
      eventType: insertInquiry.eventType,
      location: insertInquiry.location,
      date: insertInquiry.date,
      name: insertInquiry.name,
      email: insertInquiry.email ?? null,
      phone: insertInquiry.phone ?? null,
      createdAt: new Date(),
    };
    this.inquiries.push(inquiry);
    return inquiry;
  }

  async deleteInquiry(id: number): Promise<void> {
    this.inquiries = this.inquiries.filter((inquiry) => inquiry.id !== id);
  }

  async getInquiries(): Promise<Inquiry[]> {
    return [...this.inquiries].sort((a, b) => {
      return (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0);
    });
  }

  async getPosts(): Promise<Post[]> {
    return [...this.posts];
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const post: Post = {
      id: this.postId++,
      location: insertPost.location,
      title: insertPost.title,
      category: insertPost.category,
      imageUrl: insertPost.imageUrl ?? null,
      content: insertPost.content ?? null,
      createdAt: new Date(),
    };
    this.posts.push(post);
    return post;
  }

  async getCorporateContent(): Promise<CorporateContent[]> {
    return [...this.corporateContent];
  }

  async getCorporateContentByKey(sectionKey: string): Promise<CorporateContent | undefined> {
    return this.corporateContent.find((content) => content.sectionKey === sectionKey);
  }

  async upsertCorporateContent(data: InsertCorporateContent): Promise<CorporateContent> {
    const existing = await this.getCorporateContentByKey(data.sectionKey);
    if (existing) {
      existing.content = data.content;
      existing.updatedAt = new Date();
      return existing;
    }

    const content: CorporateContent = {
      id: this.corporateContentId++,
      sectionKey: data.sectionKey,
      content: data.content,
      updatedAt: new Date(),
    };
    this.corporateContent.push(content);
    return content;
  }

  async getSiteContent(): Promise<SiteContent[]> {
    return [...this.siteContent];
  }

  async getSiteContentByKey(sectionKey: string): Promise<SiteContent | undefined> {
    return this.siteContent.find((content) => content.sectionKey === sectionKey);
  }

  async upsertSiteContent(data: InsertSiteContent): Promise<SiteContent> {
    const existing = await this.getSiteContentByKey(data.sectionKey);
    if (existing) {
      existing.content = data.content;
      existing.updatedAt = new Date();
      return existing;
    }

    const content: SiteContent = {
      id: this.siteContentId++,
      sectionKey: data.sectionKey,
      content: data.content,
      updatedAt: new Date(),
    };
    this.siteContent.push(content);
    return content;
  }

  async getSiteImages(): Promise<SiteImage[]> {
    return [...this.siteImages];
  }

  async getSiteImageByKey(imageKey: string): Promise<SiteImage | undefined> {
    return this.siteImages.find((image) => image.imageKey === imageKey);
  }

  async upsertSiteImage(data: InsertSiteImage): Promise<SiteImage> {
    const existing = await this.getSiteImageByKey(data.imageKey);
    if (existing) {
      existing.url = data.url;
      existing.originalName = data.originalName ?? null;
      existing.updatedAt = new Date();
      return existing;
    }

    const image: SiteImage = {
      id: this.siteImageId++,
      imageKey: data.imageKey,
      url: data.url,
      originalName: data.originalName ?? null,
      updatedAt: new Date(),
    };
    this.siteImages.push(image);
    return image;
  }

  async deleteSiteImage(imageKey: string): Promise<void> {
    this.siteImages = this.siteImages.filter((image) => image.imageKey !== imageKey);
  }
}

export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemoryStorage();
