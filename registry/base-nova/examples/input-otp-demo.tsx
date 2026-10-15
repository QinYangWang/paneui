import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/registry/base-nova/ui/input-otp"

export default function InputOTPDemo() {
  return (
    <InputOTP length={6} aria-label="Verification code">
      <InputOTPGroup>
        <InputOTPSlot />
        <InputOTPSlot aria-label="Character 2 of 6" />
        <InputOTPSlot aria-label="Character 3 of 6" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot aria-label="Character 4 of 6" />
        <InputOTPSlot aria-label="Character 5 of 6" />
        <InputOTPSlot aria-label="Character 6 of 6" />
      </InputOTPGroup>
    </InputOTP>
  )
}
