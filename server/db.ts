import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const databaseUrl = process.env.DATABASE_URL;

export const pool = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : undefined;

export const db = databaseUrl
  ? drizzle({ client: pool!, schema })
  : new Proxy(
      {},
      {
        get() {
          throw new Error(
            "DATABASE_URL must be set before using database storage.",
          );
        },
      },
    ) as ReturnType<typeof drizzle>;
