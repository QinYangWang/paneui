import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Enters a one-time code, one character per slot.", "zh": "逐位输入一次性验证码。"},
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
      "title": {"en":"Four Digits","zh":"四位数字"},
      "description": {"en":"Use for a PIN that should stay hidden.","zh":"适用于不应显示在屏幕上的 PIN 码。"}
    }
  ],
  "notes": [
    {
      "title": "Accessibility",
      "body": { en: "Label the first slot with the field label and give the rest `aria-label`s such as \"Character 2 of 6\". Pasting fills every slot; `autoComplete` is `one-time-code` so phones offer the code from a message.", zh: "用字段标签标记第一个槽位，并给其余槽位添加 `aria-label`，例如 \"Character 2 of 6\"。粘贴会填充每个槽位；`autoComplete` 为 `one-time-code`，因此手机会从短信中提供验证码。" }
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
          "description": { en: "Number of slots.", zh: "槽位数量。" },
          "required": true
        },
        {
          "name": "size",
          "type": "\"xs\" | \"sm\" | \"default\" | \"lg\"",
          "description": { en: "Slot size (24 / 28 / 32 / 36px). Inside a sized `Field` it follows the field.", zh: "槽位大小（24 / 28 / 32 / 36px）。在有大小的 `Field` 内时跟随字段。" },
          "default": "\"default\""
        },
        {
          "name": "onValueComplete",
          "type": "(value: string) => void",
          "description": { en: "Called when every slot is filled.", zh: "每个槽位都填满时调用。" }
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
          "description": { en: "Present when the slot holds a character.", zh: "槽位包含字符时存在。" }
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
