/**
 * Central security utilities. Everything that touches credentials, sessions,
 * or hashable identifiers (phone numbers, emails) goes through this file so
 * the crypto choices stay consistent and auditable.
 *
 * Server-only — this module reads environment variables and uses Node's
 * crypto primitives. Importing it from a client component will fail at build
 * time (and that's intentional).
 */

import {
  createHmac,
  scryptSync,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

/**
 * Read a secret from env on demand. In production, missing → throw at the
 * first call site that needs the secret. In development, fall back to a
 * clearly-named dev value so local work isn't blocked.
 *
 * Lazy on purpose: evaluating at module load time would break `next build`,
 * which imports server modules in a NODE_ENV=production environment without
 * any user env vars. We only want to fail closed when a *real request*
 * tries to use the secret.
 */
function readSecret(envKey: string, devFallback: string): string {
  const v = process.env[envKey];
  if (v && v.trim().length > 0) return v;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      `[security] Missing required env var ${envKey}. ` +
        `Refusing to operate in production without it. ` +
        `Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
    );
  }
  return devFallback;
}

function getLoyaltyPepper(): string {
  return readSecret(
    "LOYALTY_PEPPER",
    "dev-only-loyalty-pepper-not-for-production"
  );
}

function getSessionSecret(): string {
  return readSecret(
    "SESSION_SECRET",
    "dev-only-session-secret-not-for-production"
  );
}

// ───────────────────────── Password hashing ─────────────────────────

const SCRYPT_KEYLEN = 64;
const SCRYPT_SALT_BYTES = 16;

/**
 * Hash a plaintext password using scrypt. The returned string contains the
 * algorithm marker + salt + hash so it can be verified later without any
 * extra metadata. Format: `scrypt:<salt-hex>:<hash-hex>`.
 *
 * Use this when seeding admin accounts. Never store plaintext.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(SCRYPT_SALT_BYTES);
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN);
  return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`;
}

/**
 * Constant-time verification of a plaintext attempt against a stored hash.
 * Returns false on any malformed input (no exceptions surfaced to callers).
 */
export function verifyPassword(attempt: string, stored: string): boolean {
  if (!attempt || !stored) return false;
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const salt = safeFromHex(parts[1]);
  const expected = safeFromHex(parts[2]);
  if (!salt || !expected) return false;
  let actual: Buffer;
  try {
    actual = scryptSync(attempt, salt, expected.length);
  } catch {
    return false;
  }
  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

function safeFromHex(s: string): Buffer | null {
  if (!/^[0-9a-fA-F]+$/.test(s) || s.length % 2 !== 0) return null;
  return Buffer.from(s, "hex");
}

// ───────────────────────── Signed sessions ──────────────────────────

/**
 * HMAC-sign a payload so it can be stored in a cookie. The signature is
 * appended after a dot. Tampering with the payload invalidates the signature.
 */
export function signSession(payload: string): string {
  const sig = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

/**
 * Verify a signed session token. Returns the original payload if the
 * signature is valid, otherwise null. Uses constant-time comparison.
 */
export function verifySession(token: string): string | null {
  if (!token) return null;
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0 || lastDot === token.length - 1) return null;
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);

  const expected = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  try {
    if (!timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  return payload;
}

// ────────────────────────── Phone hashing ───────────────────────────

import { createHash } from "node:crypto";

/**
 * One-way hash of a normalized phone number. Pepper is applied so an
 * attacker who reads our DB cannot precompute a phone-number rainbow table.
 * Use this both at write time (when enrolling a customer) and at lookup time.
 */
export function hashPhone(normalizedPhone: string): string {
  return createHash("sha256")
    .update(`${getLoyaltyPepper()}:${normalizedPhone}`)
    .digest("hex");
}
