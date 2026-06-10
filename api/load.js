// api/load.js  — Vercel serverless function
// GET /api/load  →  returns saved portfolio data from MongoDB
import { connectToDatabase, resetDbConnection } from "./_db.js";

const DOC_ID = "portfolio_singleton";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const COLLECTION = process.env.MONGODB_COL || "Nav";
  const uri = process.env.MONGODB_URI;
  const maskedUri = uri ? uri.substring(0, 30) + "..." : "not-set";

  try {
    const { db } = await connectToDatabase();
    const col    = db.collection(COLLECTION);
    const doc    = await col.findOne({ _id: DOC_ID });
    return res.status(200).json({ data: doc?.portfolioData ?? null });
  } catch (err) {
    // Reset cached connection on error so next request retries fresh
    resetDbConnection();
    console.error("[api/load]", err.message);
    return res.status(500).json({
      error: err.message,
      debug: { maskedUri, col: COLLECTION },
    });
  }
}
