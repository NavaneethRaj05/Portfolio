// api/load.js  — Vercel serverless function
// GET /api/load  →  returns saved portfolio data from MongoDB
import { MongoClient } from "mongodb";

const URI        = process.env.MONGODB_URI;
const DB_NAME    = process.env.MONGODB_DB    || "portfolio";
const COLLECTION = process.env.MONGODB_COL   || "Nav";
const DOC_ID     = "portfolio_singleton";

let cachedClient = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  cachedClient = new MongoClient(URI, { serverSelectionTimeoutMS: 5000 });
  await cachedClient.connect();
  return cachedClient;
}

export default async function handler(req, res) {
  // CORS — allow your Vercel domain + localhost dev
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")    return res.status(405).json({ error: "Method not allowed" });

  if (!URI) return res.status(500).json({ error: "MONGODB_URI not set" });

  try {
    const client = await getClient();
    const col    = client.db(DB_NAME).collection(COLLECTION);
    const doc    = await col.findOne({ _id: DOC_ID });
    return res.status(200).json({ data: doc?.portfolioData ?? null });
  } catch (err) {
    console.error("[api/load]", err.message);
    return res.status(500).json({ error: err.message });
  }
}
