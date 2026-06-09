// api/save.js  — Vercel serverless function
// POST /api/save  { data: <portfolioData> }  →  upserts into MongoDB
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  if (!URI) return res.status(500).json({ error: "MONGODB_URI not set" });

  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Missing data field" });

    const client = await getClient();
    const col    = client.db(DB_NAME).collection(COLLECTION);

    await col.updateOne(
      { _id: DOC_ID },
      { $set: { _id: DOC_ID, portfolioData: data, updatedAt: new Date() } },
      { upsert: true }
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[api/save]", err.message);
    return res.status(500).json({ error: err.message });
  }
}
