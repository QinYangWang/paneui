# OTP Input

> Enters a one-time sign-in or verification code.

Page: https://paneui.dev/docs/otp-input/

## Installation

```bash
npx shadcn@latest add @paneui/otp-input
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/otp-input.json
```

Packages: `@base-ui/react`, `motion`.

Registry items it builds on: `@paneui/theme`.

## Usage

```tsx
"use client"

import * as React from "react"

import { OTPInput, type OTPStatus } from "@/registry/base-nova/blocks/otp-input/otp-input"

const CODE = "246810"

export default function OTPInputDemo() {
  const [value, setValue] = React.useState("")
  const [status, setStatus] = React.useState<OTPStatus>("idle")

  return (
    <OTPInput
      label="Verification code"
      hint={`Sent to ••• 4821. Try ${CODE}.`}
      errorMessage="That code didn't match. Check the SMS and try again."
      successMessage="Verified. Signing you in…"
      groupSize={3}
      value={value}
      status={status}
      onValueChange={(next) => {
        setValue(next)
        if (status !== "idle") setStatus("idle")
      }}
      onValueComplete={(code) => setStatus(code === CODE ? "success" : "error")}
    />
  )
}
```
