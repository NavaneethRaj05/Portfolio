// api/_db.js — Shared MongoDB Connection Helper
import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

/**
 * Connects to MongoDB and caches the client & db instances.
 * If connection is lost or cached, the driver handles auto-reconnection.
 */
export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  const dbName = process.env.MONGODB_DB || "portfolio";

  // If cached client is already available, return it immediately
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Set up connection options
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

  // Connect client and select database
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

/**
 * Resets the cached connection. Use this when a database operation fails
 * to ensure the next request attempts a fresh connection.
 */
export function resetDbConnection() {
  cachedClient = null;
  cachedDb = null;
}
