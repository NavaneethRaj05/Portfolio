// api/save.js  — Vercel serverless function
// POST /api/save  { data: <portfolioData> }  →  upserts into MongoDB
import { connectToDatabase, resetDbConnection } from "./_db.js";

const DOC_ID = "portfolio_singleton";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const COLLECTION = process.env.MONGODB_COL || "Nav";

  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Missing data field" });

    const { db } = await connectToDatabase();
    const col    = db.collection(COLLECTION);

    await col.updateOne(
      { _id: DOC_ID },
      { $set: { _id: DOC_ID, portfolioData: data, updatedAt: new Date() } },
      { upsert: true }
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    resetDbConnection();
    console.error("[api/save]", err.message);
    return res.status(500).json({ error: err.message });
  }
}
