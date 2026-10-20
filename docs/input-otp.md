# Input OTP

> Enters a one-time code, one character per slot.

Page: https://paneui.dev/docs/input-otp/

## Installation

```bash
npx shadcn@latest add @paneui/input-otp
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/input-otp.json
```

Packages: `@base-ui/react`, `class-variance-authority`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/control-size`.

## Usage

```tsx
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
```

```tsx
<InputOTP length={6}>
  <InputOTPGroup>
    <InputOTPSlot />
    <InputOTPSlot />
    <InputOTPSlot />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot />
    <InputOTPSlot />
    <InputOTPSlot />
  </InputOTPGroup>
</InputOTP>
```

## Composition

```text
InputOTP
├── InputOTPGroup
│   └── InputOTPSlot × n
└── InputOTPSeparator
```

## Examples

### Four Digits

Use for a PIN that should stay hidden.

```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/base-nova/ui/input-otp"

export default function InputOTPFourDigits() {
  return (
    <InputOTP length={4} size="lg" mask aria-label="PIN">
      <InputOTPGroup>
        <InputOTPSlot />
        <InputOTPSlot aria-label="Digit 2 of 4" />
        <InputOTPSlot aria-label="Digit 3 of 4" />
        <InputOTPSlot aria-label="Digit 4 of 4" />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

## Accessibility

Label the first slot with the field label and give the rest `aria-label`s such as "Character 2 of 6". Pasting fills every slot; `autoComplete` is `one-time-code` so phones offer the code from a message.

## API Reference

Built on [the OTP Field primitive](https://base-ui.com/react/components/otp-field#api-reference). Only the props this library adds or changes are listed; everything else passes through.

### InputOTP

Also accepts every prop of [OTPField.Root](https://base-ui.com/react/components/otp-field#root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length` (required) | `number` | — | Number of slots. |
| `size` | `"xs" \| "sm" \| "default" \| "lg"` | `"default"` | Slot size (24 / 28 / 32 / 36px). Inside a sized `Field` it follows the field. |
| `onValueComplete` | `(value: string) => void` | — | Called when every slot is filled. |

### InputOTPSlot

Also accepts every prop of [OTPField.Input](https://base-ui.com/react/components/otp-field#input).

| Data attribute | Description |
| --- | --- |
| `data-filled` | Present when the slot holds a character. |

### InputOTPGroup

Also accepts every prop of `div`.

### InputOTPSeparator

Also accepts every prop of `div`.
