import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { MongoClient } from "mongodb"
import { nextCookies } from "better-auth/next-js"

const client = new MongoClient(process.env.MONGO_URI!)

export const auth = betterAuth({
  database: mongodbAdapter(client.db(process.env.MONGO_DB!)),
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
})