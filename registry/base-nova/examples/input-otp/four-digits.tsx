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
