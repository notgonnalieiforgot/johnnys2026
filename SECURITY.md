# Security Model

Johnny's Smoke Shop & Kava Bar — what's encrypted, what isn't, and why.

## 1. Secrets

Every secret lives in environment variables, never in source. The build refuses
to start in production if any of these are missing.

| Env var          | Purpose                                                                                       | Rotation impact                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `SESSION_SECRET` | HMAC-SHA256 key that signs admin session cookies                                              | Rotating invalidates every active session (forced re-login). Use on compromise.  |
| `LOYALTY_PEPPER` | Salt mixed in before SHA-256 hashing a phone number for loyalty lookup                        | Rotating invalidates every stored phone hash — re-hash the customer table first. |
| `ADMIN_USERNAME` | Optional override for the first admin account                                                 | Plaintext; only stored encrypted-at-rest by Vercel.                              |
| `ADMIN_PASSWORD` | Optional override password (paired with `ADMIN_USERNAME`); hashed in-memory at startup        | Same. Never logged, never returned to clients.                                   |

Generate values:
```sh
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

## 2. Admin authentication

- **Passwords:** stored only as scrypt hashes (`hashPassword` in `lib/security.ts`).
  Plaintext only exists transiently during sign-in. Verification is
  constant-time via `timingSafeEqual`.
- **Sessions:** an HMAC-SHA256 signature is appended to the cookie payload.
  Tampering with either half invalidates the cookie.
- **Cookie flags:** `httpOnly` always, `secure` in production, `sameSite=lax`,
  8-hour max-age, scoped to `/`.
- **Generic errors:** sign-in returns the same error message for "no such user"
  and "wrong password" so usernames can't be enumerated. The wrong-username
  path still runs a dummy `verifyPassword` to keep response times similar.
- **No user list endpoint** — there is no API that lists admin accounts.

## 3. Loyalty lookup (customer-facing)

`app/actions/loyalty.ts` — the only Server Action a non-admin can invoke.

- Phone is **normalized** (digits only, strip leading country code) before hashing.
- Hashing uses `LOYALTY_PEPPER`: `SHA-256(pepper + ":" + phone)`.
- The mock store is keyed on the hash, never on the raw phone number.
- **Response shape is locked down:** only `{ ok, points, tier, nextReward }`. No
  name, email, visit history, or anything that could re-identify a customer.
  The type system enforces this — adding PII to the return type requires editing
  `LoyaltyResult` and is intentionally a flagged change.
- Optional `email` / `lastName` form fields are read but immediately discarded;
  they're never logged, returned, or persisted by this action.

## 4. Admin data exposure

- Every `/admin/*` route is gated by `app/admin/layout.tsx`. If the session
  cookie is missing or its signature is invalid, the layout redirects to
  `/login` **before** Next.js ships any JS chunks for the admin pages.
- Result: a non-admin visiting `/admin/customers` gets a 307 with zero
  customer data on the wire. Verified via `curl --max-redirs 0`.
- Once authenticated, the admin's browser receives whatever client components
  the admin uses (today: mock customer/inventory data). When Lifelong POS is
  wired, all customer/inventory tables should be **server components fetching
  per request** so PII isn't serialized into the JS bundle.

## 5. CSV exports

- The Export buttons on `/admin/customers` and `/admin/inventory` generate the
  CSV client-side from data already present in the bundle. They don't reach
  back to the server, so they can't accidentally leak data that the current
  session didn't already have.

## 6. PII at rest (planned)

When the Lifelong POS API is connected:

- **Phone numbers:** stored as hashes only. The plaintext phone goes to the
  POS for SMS delivery but never lives in our database.
- **Emails:** if we store them at all, treat as PII. Strongly prefer letting
  the POS hold the canonical email and looking up by `phone_hash`.
- **Names:** keep server-side only. Never serialize into client bundles or
  responses unless the request is from an authenticated admin.
- **API key:** `LIFELONG_API_KEY` env var, server-side only. The browser
  must never see it.

## 7. Transport security

- HTTPS only in production (Vercel terminates TLS).
- Cookies marked `secure` in production so they're never sent over HTTP.
- No cross-origin API calls today; if introduced, validate the `Origin`
  header on every Server Action.

## 8. Audit checklist for the Lifelong POS integration

Before merging the POS-connected code:

- [ ] `LIFELONG_API_KEY` is read only from `process.env`, never hardcoded.
- [ ] All POS calls happen in Server Actions or server components — the key
      never reaches the client.
- [ ] Customer queries go through `hashPhone()` from `lib/security.ts`.
- [ ] Any new Server Action that returns customer data has its return type
      narrowed to the minimum required fields. Run through `LoyaltyResult` as
      a reference.
- [ ] Any new admin route confirms it sits under `app/admin/*` (so the
      session gate applies) or adds its own `getAdminSession()` check.
- [ ] No `console.log` of phone numbers, emails, or API responses in
      production code paths.
- [ ] CSV exports and `aria-live` toasts don't echo PII.
- [ ] HTTPS-redirect everything; Vercel does this by default — verify.

## 9. Incident response

If credentials or secrets are exposed:

1. Rotate `SESSION_SECRET` in Vercel — every admin will need to sign in again.
2. Rotate `LOYALTY_PEPPER` only after re-hashing customer rows; otherwise
   loyalty lookups break for everyone.
3. Rotate `ADMIN_PASSWORD` (or commit a new `scrypt:` hash to source).
4. Redeploy. The new build picks up the new secrets on next request.
