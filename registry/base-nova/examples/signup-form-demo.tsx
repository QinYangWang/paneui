"use client"

import { SignupForm } from "@/registry/base-nova/blocks/signup-form/signup-form"

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function SignupFormDemo() {
  return (
    <SignupForm
      description="Start free for 14 days. Try taken@example.com to see a server error."
      onSubmit={async (values) => {
        await wait(1400)
        if (values.email.trim().toLowerCase() === "taken@example.com") {
          return { email: "An account with this email already exists." }
        }
      }}
      footer={
        <>
          Already have an account?{" "}
          <a href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
            Sign in
          </a>
        </>
      }
    />
  )
}
