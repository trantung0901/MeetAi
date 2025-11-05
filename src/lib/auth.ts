/* eslint-disable @typescript-eslint/no-unused-vars */
import { drizzle } from "drizzle-orm/neon-http";
import { Schema } from "./../../node_modules/better-auth/node_modules/zod/src/v4/core/json-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            ...schema,
        },
    }),
});
