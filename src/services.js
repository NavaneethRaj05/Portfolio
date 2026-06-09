// ============================================================
// services.js  —  MongoDB Atlas Data API  +  Gmail Contact
// ============================================================
//
// ── MongoDB Atlas Data API ────────────────────────────────
//  Your database:  portfolio
//  Your collection: Nav
//
//  Setup steps:
//  1. Atlas dashboard → App Services (top nav)
//  2. Click "Create a New App"  (or use existing if you have one)
//  3. In the App, go to  HTTPS Endpoints → Data API
//  4. Enable the Data API → copy the App URL
//     (looks like https://data.mongodb-api.com/app/data-xxxxx/endpoint/data/v1)
//  5. Go to  App Access → API Keys → Create API Key → copy it
//  6. Paste both into .env as VITE_MONGO_API_URL and VITE_MONGO_API_KEY
//  7. VITE_MONGO_DATASOURCE = Cluster1   (your cluster name)
//
// ── Admin Email ───────────────────────────────────────────
//  Set VITE_ADMIN_EMAIL to your Gmail address in .env
//  When a visitor submits the contact form it will open Gmail
//  compose in a new tab with ALL their details pre-filled
//  (name, email, message) — you just hit Send in Gmail.
// ============================================================

const MONGO_URL  = import.meta.env.VITE_MONGO_API_URL    || "";
const MONGO_KEY  = import.meta.env.VITE_MONGO_API_KEY    || "";
const MONGO_DB   = import.meta.env.VITE_MONGO_DB         || "portfolio";
const DATASOURCE = import.meta.env.VITE_MONGO_DATASOURCE || "Cluster1";
const COLLECTION = "Nav";                        // ← your existing collection
const DOC_ID_KEY = "portfolio_singleton";        // one document stores all data

// ── MongoDB helpers ─────────────────────────────────────────
async function mongoRequest(action, body) {
  if (!MONGO_URL || !MONGO_KEY) return null;
  try {
    const res = await fetch(`${MONGO_URL}/action/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": MONGO_KEY,
      },
      body: JSON.stringify({
        dataSource: DATASOURCE,
        database: MONGO_DB,
        collection: COLLECTION,
        ...body,
      }),
    });
    if (!res.ok) {
      console.warn(`[MongoDB] ${action} HTTP ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn("[MongoDB]", e.message);
    return null;
  }
}

/**
 * Load portfolio data from MongoDB.
 * Returns the saved data object or null if unavailable / not yet saved.
 */
export async function mongoLoad() {
  const result = await mongoRequest("findOne", {
    filter: { _id: DOC_ID_KEY },
  });
  return result?.document?.portfolioData ?? null;
}

/**
 * Save portfolio data to MongoDB (upsert — works on first save too).
 */
export async function mongoSave(data) {
  const result = await mongoRequest("updateOne", {
    filter: { _id: DOC_ID_KEY },
    update: {
      $set: {
        _id: DOC_ID_KEY,
        portfolioData: data,
        updatedAt: new Date().toISOString(),
      },
    },
    upsert: true,
  });
  return result !== null;
}

export const mongoConfigured = () => Boolean(MONGO_URL && MONGO_KEY);

// ── Contact Form — Gmail compose (no backend needed) ────────
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "";

/**
 * Opens Gmail compose in a new tab with all visitor details
 * pre-filled. Visitor stays on the portfolio page.
 *
 * @param {{ from_name: string, from_email: string, message: string }} params
 * @returns {{ ok: boolean }}
 */
export function sendEmail({ from_name, from_email, message }) {
  const to      = encodeURIComponent(ADMIN_EMAIL);
  const subject = encodeURIComponent(`Portfolio Message from ${from_name}`);
  const body    = encodeURIComponent(
    `Hi Navaneeth,\n\nYou have a new portfolio message.\n\n` +
    `Name:    ${from_name}\n` +
    `Email:   ${from_email}\n\n` +
    `Message:\n${message}\n`
  );

  // Gmail deep-link — opens compose window with all fields pre-filled
  window.open(
    `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`,
    "_blank",
    "noopener,noreferrer"
  );

  return { ok: true };
}
