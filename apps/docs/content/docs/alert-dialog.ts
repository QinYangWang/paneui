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
      "body": "The popup is an `alertdialog`. Focus is trapped and starts on Cancel, so Enter never confirms by accident. `Esc` cancels; a backdrop click does nothing."
    }
  ],
  "api": [
    {
      "name": "AlertDialog",
      "description": "Re-export of the primitive root.",
      "extends": "AlertDialog.Root",
      "extendsHref": "https://base-ui.com/react/components/alert-dialog#root",
      "props": [
        {
          "name": "open",
          "type": "boolean",
          "description": "Controlled open state."
        },
        {
          "name": "onOpenChange",
          "type": "(open: boolean, eventDetails) => void",
          "description": "Called when it opens or closes."
        }
      ]
    },
    {
      "name": "AlertDialogContent",
      "description": "Portal, backdrop and centred popup.",
      "extends": "AlertDialog.Popup",
      "extendsHref": "https://base-ui.com/react/components/alert-dialog#popup",
      "props": [
        {
          "name": "size",
          "type": "\"sm\" | \"default\"",
          "description": "`sm` is 20rem wide, centres the header and splits the footer into two equal buttons.",
          "default": "\"default\""
        },
        {
          "name": "initialFocus",
          "type": "AlertDialog.Popup initialFocus",
          "description": "Where focus goes on open.",
          "default": "the Cancel button"
        }
      ]
    },
    {
      "name": "AlertDialogAction",
      "description": "Closes the dialog. Put the confirming work in `onClick`.",
      "extends": "Button",
      "props": [
        {
          "name": "variant",
          "type": "Button variant",
          "description": "Use `destructive` for deletes.",
          "default": "\"default\""
        }
      ]
    },
    {
      "name": "AlertDialogCancel",
      "description": "Closes without acting.",
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
      "description": "Slot above the title for an `IconChip`.",
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
