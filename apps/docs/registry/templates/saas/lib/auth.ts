"use client"

import * as React from "react"

import { demoUser } from "./data"

/*
 * Mock auth for the template. The session lives in localStorage so the pages
 * work without a backend; every function is async so the forms already handle
 * loading and errors the way they will with a real provider.
 *
 * ── Plugging in real auth ──────────────────────────────────────────────────
 * Replace the bodies of `signIn`, `signUp`, `requestPasswordReset`,
 * `verifyCode` and `signOut` with calls to your provider (Auth.js / NextAuth,
 * Clerk, Supabase, Better Auth, your API), and make `useSession` read the
 * provider's session. Then set REQUIRE_AUTH to true (or protect /dashboard
 * in middleware) so signed-out visitors are sent to /login.
 * Throw an `AuthError` with a `field` to flag a specific input.
 */

export const REQUIRE_AUTH = false

export type User = { name: string; email: string }

export class AuthError extends Error {
  field?: "email" | "password" | "name" | "code"
  constructor(message: string, field?: AuthError["field"]) {
    super(message)
    this.name = "AuthError"
    this.field = field
  }
}

const KEY = "saas-session"
const EVENT = "saas-session-change"
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function write(user: User | null) {
  try {
    if (user) localStorage.setItem(KEY, JSON.stringify(user))
    else localStorage.removeItem(KEY)
  } catch {
    // storage unavailable: the session lasts for this page only
  }
  window.dispatchEvent(new Event(EVENT))
}

function read(): User | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export async function signIn({ email, password }: { email: string; password: string }): Promise<User> {
  await wait(700)
  // Demo rule so the error state is easy to see: any password containing "wrong" fails.
  if (password.toLowerCase().includes("wrong")) throw new AuthError("That email and password don't match.", "password")
  const user = { name: email === demoUser.email ? demoUser.name : email.split("@")[0], email }
  write(user)
  return user
}

export async function signUp({ name, email }: { name: string; email: string; password: string }): Promise<User> {
  await wait(800)
  if (email.toLowerCase().startsWith("taken@")) throw new AuthError("An account with this email already exists.", "email")
  const user = { name, email }
  write(user)
  return user
}

export async function requestPasswordReset(email: string): Promise<void> {
  await wait(700)
  void email // send the reset link here
}

/** Demo code: any 6 digits except 000000. */
export async function verifyCode(code: string): Promise<void> {
  await wait(600)
  if (code === "000000") throw new AuthError("That code has expired. Send a new one.", "code")
}

export async function signOut(): Promise<void> {
  await wait(150)
  write(null)
}

/**
 * The signed-in user. `user` is `undefined` while storage is read and `null` when
 * signed out. Without REQUIRE_AUTH the demo user stands in for a missing session
 * so the dashboard always has someone to show; `signedIn` tells the two apart.
 */
export function useSession(): {
  user: User | null | undefined
  status: "loading" | "authenticated" | "unauthenticated"
  signedIn: boolean
} {
  const [stored, setStored] = React.useState<User | null | undefined>(undefined)
  React.useEffect(() => {
    const sync = () => setStored(read())
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])
  const signedIn = !!stored
  if (stored) return { user: stored, status: "authenticated", signedIn }
  if (!REQUIRE_AUTH) return { user: demoUser, status: "authenticated", signedIn }
  return stored === undefined ? { user: undefined, status: "loading", signedIn } : { user: null, status: "unauthenticated", signedIn }
}
