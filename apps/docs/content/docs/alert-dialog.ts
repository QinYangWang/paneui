import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Interrupts to confirm a destructive or important action.", "zh": "在重要操作前请求确认。"},
  "baseUi": {
    "name": "Alert Dialog",
    "href": "https://base-ui.com/react/components/alert-dialog"
  },
  "usage": {
    "imports": "import {\n  AlertDialog,\n  AlertDialogAction,\n  AlertDialogCancel,\n  AlertDialogContent,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogTrigger,\n} from \"@/components/ui/alert-dialog\"",
    "code": "<AlertDialog>\n  <AlertDialogTrigger render={<Button variant=\"secondary\" />}>Delete</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Delete this file?</AlertDialogTitle>\n      <AlertDialogDescription>This can’t be undone.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction variant=\"destructive\">Delete</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>"
  },
  "composition": "AlertDialog\n├── AlertDialogTrigger\n└── AlertDialogContent\n    ├── AlertDialogHeader\n    │   ├── AlertDialogMedia\n    │   ├── AlertDialogTitle\n    │   └── AlertDialogDescription\n    └── AlertDialogFooter\n        ├── AlertDialogCancel\n        └── AlertDialogAction",
  "examples": [
    {
      "id": "small",
      "title": {"en":"Small","zh":"小尺寸"},
    }
  ],
  "notes": [
    {
      "title": "Accessibility",
      "body": { en: "The popup is an `alertdialog`. Focus is trapped and starts on Cancel, so Enter never confirms by accident. `Esc` cancels; a backdrop click does nothing.", zh: "弹出层是 `alertdialog`。焦点被捕获并从 Cancel 开始，因此 Enter 永远不会意外确认。`Esc` 取消；点击背景不做任何事。" }
    }
  ],
  "api": [
    {
      "name": "AlertDialog",
      "description": { en: "Re-export of the primitive root.", zh: "重新导出 primitive 根。" },
      "extends": "AlertDialog.Root",
      "extendsHref": "https://base-ui.com/react/components/alert-dialog#root",
      "props": [
        {
          "name": "open",
          "type": "boolean",
          "description": { en: "Controlled open state.", zh: "受控的打开状态。" }
        },
        {
          "name": "onOpenChange",
          "type": "(open: boolean, eventDetails) => void",
          "description": { en: "Called when it opens or closes.", zh: "打开或关闭时调用。" }
        }
      ]
    },
    {
      "name": "AlertDialogContent",
      "description": { en: "Portal, backdrop and centred popup.", zh: "门户、背景和居中弹出层。" },
      "extends": "AlertDialog.Popup",
      "extendsHref": "https://base-ui.com/react/components/alert-dialog#popup",
      "props": [
        {
          "name": "size",
          "type": "\"sm\" | \"default\"",
          "description": { en: "`sm` is 20rem wide, centres the header and splits the footer into two equal buttons.", zh: "`sm` 宽 20rem，居中标题，并将页脚分成两个相等的按钮。" },
          "default": "\"default\""
        },
        {
          "name": "initialFocus",
          "type": "AlertDialog.Popup initialFocus",
          "description": { en: "Where focus goes on open.", zh: "打开时焦点去向。" },
          "default": "the Cancel button"
        }
      ]
    },
    {
      "name": "AlertDialogAction",
      "description": { en: "Closes the dialog. Put the confirming work in `onClick`.", zh: "关闭对话框。将确认工作放在 `onClick` 中。" },
      "extends": "Button",
      "props": [
        {
          "name": "variant",
          "type": "Button variant",
          "description": { en: "Use `destructive` for deletes.", zh: "删除时使用 `destructive`。" },
          "default": "\"default\""
        }
      ]
    },
    {
      "name": "AlertDialogCancel",
      "description": { en: "Closes without acting.", zh: "不执行操作关闭。" },
      "extends": "Button",
      "props": [
        {
          "name": "variant",
          "type": "Button variant",
          "description": "",
          "default": "\"secondary\""
        }
      ]
    },
    {
      "name": "AlertDialogMedia",
      "description": { en: "Slot above the title for an `IconChip`.", zh: "标题上方用于 `IconChip` 的槽位。" },
      "extends": "div",
      "props": []
    },
    {
      "name": "AlertDialogHeader",
      "extends": "div",
      "props": []
    },
    {
      "name": "AlertDialogFooter",
      "extends": "div",
      "props": []
    },
    {
      "name": "AlertDialogTitle",
      "extends": "AlertDialog.Title",
      "extendsHref": "https://base-ui.com/react/components/alert-dialog#title",
      "props": []
    },
    {
      "name": "AlertDialogDescription",
      "extends": "AlertDialog.Description",
      "extendsHref": "https://base-ui.com/react/components/alert-dialog#description",
      "props": []
    }
  ]
} satisfies ComponentDoc
