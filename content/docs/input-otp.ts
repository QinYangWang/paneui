import type { ComponentDoc } from "@/lib/doc-types"

export default {
  "baseUi": {
    "name": "OTP Field",
    "href": "https://base-ui.com/react/components/otp-field"
  },
  "usage": {
    "imports": "import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from \"@/components/ui/input-otp\"",
    "code": "<InputOTP length={6}>\n  <InputOTPGroup>\n    <InputOTPSlot />\n    <InputOTPSlot />\n    <InputOTPSlot />\n  </InputOTPGroup>\n  <InputOTPSeparator />\n  <InputOTPGroup>\n    <InputOTPSlot />\n    <InputOTPSlot />\n    <InputOTPSlot />\n  </InputOTPGroup>\n</InputOTP>"
  },
  "composition": "InputOTP\n├── InputOTPGroup\n│   └── InputOTPSlot × n\n└── InputOTPSeparator",
  "examples": [
    {
      "id": "four-digits",
      "title": "Four Digits",
      "description": "Use `mask` for a PIN that shouldn't show on screen."
    }
  ],
  "notes": [
    {
      "title": "Accessibility",
      "body": "Label the first slot with the field label and give the rest `aria-label`s such as \"Character 2 of 6\". Pasting fills every slot; `autoComplete` is `one-time-code` so phones offer the code from a message."
    }
  ],
  "api": [
    {
      "name": "InputOTP",
      "extends": "OTPField.Root",
      "extendsHref": "https://base-ui.com/react/components/otp-field#root",
      "props": [
        {
          "name": "length",
          "type": "number",
          "description": "Number of slots.",
          "required": true
        },
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"default\" | \"lg\"",
          "description": "Slot size (24 / 28 / 32 / 36px). Inside a sized `Field` it follows the field.",
          "default": "\"default\""
        },
        {
          "name": "onValueComplete",
          "type": "(value: string) => void",
          "description": "Called when every slot is filled."
        }
      ]
    },
    {
      "name": "InputOTPSlot",
      "extends": "OTPField.Input",
      "extendsHref": "https://base-ui.com/react/components/otp-field#input",
      "props": [],
      "dataAttributes": [
        {
          "name": "data-filled",
          "description": "Present when the slot holds a character."
        }
      ]
    },
    {
      "name": "InputOTPGroup",
      "extends": "div",
      "props": []
    },
    {
      "name": "InputOTPSeparator",
      "extends": "div",
      "props": []
    }
  ]
} satisfies ComponentDoc
