import { cookies } from "next/headers";
import { verifySession } from "@/lib/security";
import type { Role } from "@/app/admin/actions";

/**
 * Read and verify the admin session cookie. Returns null if the cookie is
 * absent, unsigned, tampered with, or malformed.
 *
 * Layouts call this to gate every /admin/* route. The actual JS bundles for
 * those routes are only delivered after this returns a valid session, so
 * non-admins never receive the customer/inventory chunks.
 */
export async function getAdminSession(): Promise<{
  email: string;
  role: Role;
} | null> {
  const store = await cookies();
  const token = store.get("admin_session")?.value;
  if (!token) return null;

  const payload = verifySession(token);
  if (!payload) return null; // unsigned or tampered

  const firstColon = payload.indexOf(":");
  if (firstColon <= 0 || firstColon === payload.length - 1) return null;

  const role = payload.slice(0, firstColon) as Role;
  const email = payload.slice(firstColon + 1);

  if (role !== "owner" && role !== "manager" && role !== "staff") return null;
  if (!email.includes("@")) return null;

  return { role, email };
}
