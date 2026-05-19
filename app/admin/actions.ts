"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hashPassword, signSession, verifyPassword } from "@/lib/security";

export type Role = "owner" | "manager" | "staff";

/**
 * Demo credentials are stored as scrypt hashes — never plaintext.
 *
 * Hashes are generated with `hashPassword(plaintext)` from lib/security and
 * committed to source. The hash IS safe to commit; the plaintext is not.
 *
 * Rotate by setting `ADMIN_USERNAME` and `ADMIN_PASSWORD` in Vercel — those
 * env vars take precedence over the hardcoded hashes below at runtime, and
 * the env plaintext is hashed in-memory at first use.
 */
type StoredUser = { username: string; role: Role; passwordHash: string };

const STORED_USERS: StoredUser[] = [
  {
    username: "manager",
    role: "manager",
    passwordHash:
      "scrypt:a213b5df842fd80f2d7b982e6fb26559:729fe8e65c8504eec7b59a6be9e641f235bba32bbce945b773a3f4a0cd45013bc37c081b7ddab4f9285f61740e24383baba84eb51f8a9be2427240a3305b0134",
  },
  {
    username: "owner",
    role: "owner",
    passwordHash:
      "scrypt:414fba5272175cb3cb1fae2fdf76439d:f88c86035e25a13903fb59d051be7afde1c4e33a346be42d82411cd74cd423f711859af33c9ec03814be1087b32e24d2b761ebc2554679c778ef9e5770d732fd",
  },
];

/**
 * Lazily hash the env-override plaintext on first reference so we don't keep
 * plaintext lingering in scope after startup, and so we still get
 * constant-time comparison through verifyPassword.
 */
let envOverride: StoredUser | null | undefined = undefined; // undefined = not computed yet
function getEnvOverride(): StoredUser | null {
  if (envOverride !== undefined) return envOverride;
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (u && p && u.trim() && p.length > 0) {
    envOverride = {
      username: u.trim(),
      role: "manager",
      passwordHash: hashPassword(p),
    };
  } else {
    envOverride = null;
  }
  return envOverride;
}

function findUser(username: string): StoredUser | null {
  const needle = username.trim().toLowerCase();
  const override = getEnvOverride();
  if (override && override.username.toLowerCase() === needle) return override;
  return STORED_USERS.find((u) => u.username.toLowerCase() === needle) ?? null;
}

export type SignInResult = { ok: false; error: string } | { ok: true };

export async function signIn(
  _prev: SignInResult | null,
  formData: FormData
): Promise<SignInResult> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { ok: false, error: "Username and password are required." };
  }

  // Generic error message — never reveal whether the username exists.
  const GENERIC_ERROR = "Invalid credentials. Try again.";

  const user = findUser(username);
  if (!user) {
    // Run a dummy verify against a known hash to keep the response time
    // similar for missing-user and wrong-password cases.
    verifyPassword(password, STORED_USERS[0].passwordHash);
    return { ok: false, error: GENERIC_ERROR };
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return { ok: false, error: GENERIC_ERROR };
  }

  // Cookie payload — role + identity, HMAC-signed so it can't be forged.
  const payload = `${user.role}:${user.username}@johnnys.com`;
  const signed = signSession(payload);

  const store = await cookies();
  store.set("admin_session", signed, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  redirect("/admin");
}

export async function signOut() {
  const store = await cookies();
  store.delete("admin_session");
  redirect("/login");
}
