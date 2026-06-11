// ============================================================
// services.js  —  Vercel API routes  +  Gmail Contact
// ============================================================
// MongoDB is accessed via two Vercel serverless functions:
//   GET  /api/load  →  fetch saved portfolio data
//   POST /api/save  →  upsert portfolio data
//
// Set MONGODB_URI in Vercel dashboard environment variables:
//   mongodb+srv://<user>:<password>@cluster1.xxxxx.mongodb.net
// ============================================================

// Detect base URL: works on Vercel, localhost, any domain
const BASE = typeof window !== "undefined" ? window.location.origin : "";

/**
 * Load portfolio data from MongoDB via Vercel API.
 * Returns the data object or null if unavailable.
 */
export async function mongoLoad() {
  try {
    const res = await fetch(`${BASE}/api/load`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch (e) {
    console.warn("[mongoLoad]", e.message);
    return null;
  }
}

/**
 * Save portfolio data to MongoDB via Vercel API.
 * Returns true on success, false on failure.
 */
export async function mongoSave(data) {
  try {
    const res = await fetch(`${BASE}/api/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) return false;
    const json = await res.json();
    return json.ok === true;
  } catch (e) {
    console.warn("[mongoSave]", e.message);
    return false;
  }
}

// Always "configured" — the API routes exist on Vercel
export const mongoConfigured = () => true;

// ── Contact Form — Gmail compose (no backend needed) ────────
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "";

/**
 * Opens Gmail compose in a new tab with all visitor details
 * pre-filled. No EmailJS, no backend needed.
 */
export function sendEmail({ to_email, to_name, from_name, from_email, message }) {
  const to      = encodeURIComponent(to_email || ADMIN_EMAIL);
  const subject = encodeURIComponent(`Portfolio Message from ${from_name}`);
  const body    = encodeURIComponent(
    `Hi ${to_name || "Navaneeth"},\n\nYou have a new portfolio message.\n\n` +
    `Name:    ${from_name}\n` +
    `Email:   ${from_email}\n\n` +
    `Message:\n${message}\n`
  );

  window.open(
    `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`,
    "_blank",
    "noopener,noreferrer"
  );

  return { ok: true };
}
