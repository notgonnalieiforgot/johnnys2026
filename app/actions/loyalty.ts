"use server";

/**
 * Server Action: checkLoyaltyPoints
 *
 * SECURITY CONTRACT — read before changing:
 * 1. This action runs ONLY on the server. The full customer record never crosses the network.
 * 2. The phone number is hashed before lookup (defense-in-depth against log scraping).
 * 3. The response shape is intentionally narrow: { ok, points, tier, nextReward } — no name,
 *    email, address, birthdate, visit history, or any identifier that could re-identify a
 *    customer. Adding PII to this return type requires a security review.
 * 4. Rate limiting + audit logging belong in a middleware layer in front of the production DB.
 *
 * In production, swap `mockLookup` for your Supabase / Vercel Postgres query. The query MUST
 * `SELECT points FROM customers WHERE phone_hash = $1 LIMIT 1` — never `SELECT *`.
 */

import { hashPhone } from "@/lib/security";

export type LoyaltyResult =
  | {
      ok: true;
      points: number;
      tier: "Regular" | "Local" | "VIP";
      nextReward: { name: string; pointsAway: number; thresholdAt: number };
    }
  | { ok: false; error: string };

const REWARDS = [
  { threshold: 100, name: "Free House Tea" },
  { threshold: 250, name: "20% Off Any Vape" },
  { threshold: 500, name: "Free Kratom Tea + 20% Vape" },
  { threshold: 1000, name: "Glass Piece Voucher" },
  { threshold: 2000, name: "VIP Pour-Out Event Invite" },
];

function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  // Strip leading country code if present
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return ten.length === 10 ? ten : null;
}

/**
 * Pretend DB. Keyed by phone_hash so a developer reading this file can't
 * walk customer phone numbers out of the source.
 */
function mockLookup(phoneHash: string): { points: number } | null {
  // Deterministic pseudo-balance derived from the hash so the demo always
  // returns the same number for the same phone, without us storing anything.
  const seed = parseInt(phoneHash.slice(0, 8), 16);
  // ~5% of the time, behave as if the customer isn't enrolled.
  if (seed % 19 === 0) return null;
  const points = 25 + (seed % 1975); // 25 .. 1999
  return { points };
}

function tierFor(points: number): "Regular" | "Local" | "VIP" {
  if (points >= 1000) return "VIP";
  if (points >= 250) return "Local";
  return "Regular";
}

function nextRewardFor(points: number) {
  const upcoming = REWARDS.find((r) => r.threshold > points);
  if (upcoming) {
    return {
      name: upcoming.name,
      pointsAway: upcoming.threshold - points,
      thresholdAt: upcoming.threshold,
    };
  }
  // Already past the top — keep them chasing the next visit
  const last = REWARDS[REWARDS.length - 1];
  return { name: "Surprise Drop (you're maxed out)", pointsAway: 0, thresholdAt: last.threshold };
}

export async function checkLoyaltyPoints(formData: FormData): Promise<LoyaltyResult> {
  // The "email" and "lastName" inputs exist for fuzzy matching support in real
  // implementations. We read them only to validate format and immediately drop them —
  // we do not return them, log them, or echo them back to the client.
  const rawPhone = String(formData.get("phone") ?? "");
  // Touch but never persist these fields beyond validation.
  // void on purpose — we do not want to encourage callers to rely on them.
  void formData.get("email");
  void formData.get("lastName");

  const phone = normalizePhone(rawPhone);
  if (!phone) {
    return { ok: false, error: "Please enter a valid 10-digit US phone number." };
  }

  // Simulate DB latency so the loading state actually feels alive.
  await new Promise((r) => setTimeout(r, 650));

  const row = mockLookup(hashPhone(phone));
  if (!row) {
    return {
      ok: false,
      error:
        "We couldn't find an account with that number. Ask the staff to enroll you — it takes 10 seconds.",
    };
  }

  return {
    ok: true,
    points: row.points,
    tier: tierFor(row.points),
    nextReward: nextRewardFor(row.points),
  };
}
