import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
    database: new Database("./auth.db"),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            enabled: true,
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
        google: {
            enabled: true,
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
            },
        },
    },
});
