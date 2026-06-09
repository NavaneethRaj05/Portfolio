// api/load.js  — Vercel serverless function
// GET /api/load  →  returns saved portfolio data from MongoDB
import { MongoClient } from "mongodb";

const DOC_ID = "portfolio_singleton";
let cachedClient = null;

async function getClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set");

  if (cachedClient) {
    try {
      // Verify the cached client is still alive
      await cachedClient.db("admin").command({ ping: 1 });
      return cachedClient;
    } catch {
      // Cached client is dead, reconnect
      cachedClient = null;
    }
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  await client.connect();
  cachedClient = client;
  return cachedClient;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const uri = process.env.MONGODB_URI;
  if (!uri) return res.status(500).json({ error: "MONGODB_URI not set" });

  const DB_NAME    = process.env.MONGODB_DB  || "portfolio";
  const COLLECTION = process.env.MONGODB_COL || "Nav";

  // Show masked URI for debugging (first 30 chars + ...)
  const maskedUri = uri.substring(0, 30) + "...";

  try {
    const client = await getClient();
    const col    = client.db(DB_NAME).collection(COLLECTION);
    const doc    = await col.findOne({ _id: DOC_ID });
    return res.status(200).json({ data: doc?.portfolioData ?? null });
  } catch (err) {
    // Reset cached client on error so next request retries fresh
    cachedClient = null;
    console.error("[api/load]", err.message);
    return res.status(500).json({
      error: err.message,
      debug: { maskedUri, db: DB_NAME, col: COLLECTION },
    });
  }
}
