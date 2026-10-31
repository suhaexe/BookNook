import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI in .env.local");

const globalForMongo = globalThis as unknown as {
  _mongo?: { client: MongoClient; db: Db };
};

if (!globalForMongo._mongo) {
  const client = new MongoClient(uri);
  globalForMongo._mongo = {
    client,
    db: client.db("booknook"),
  };
}

export const db = globalForMongo._mongo.db;