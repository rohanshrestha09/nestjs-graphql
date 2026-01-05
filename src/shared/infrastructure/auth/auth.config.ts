import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

console.log(process.env.MONGODB_URI);

const client = new MongoClient(process.env.MONGODB_URI!);

export const auth = betterAuth({
  database: mongodbAdapter(client.db(), {
    client,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
