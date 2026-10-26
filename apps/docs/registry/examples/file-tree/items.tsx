import { FileTree, type FileTreeNode } from "@paneui/ui/components/file-tree"

const items: FileTreeNode[] = [
  {
    value: "2026",
    name: "2026",
    type: "folder",
    children: [
      {
        value: "2026/taxes",
        name: "Taxes",
        type: "folder",
        children: [
          { value: "2026/taxes/w2.pdf", name: "W-2.pdf", type: "file", meta: "84 KB" },
          { value: "2026/taxes/receipts.zip", name: "Receipts.zip", type: "file", meta: "12 MB" },
        ],
      },
      { value: "2026/lease.pdf", name: "Lease agreement.pdf", type: "file", meta: "1.2 MB" },
    ],
  },
  { value: "2025", name: "2025", type: "folder", children: [{ value: "2025/insurance.pdf", name: "Insurance.pdf", type: "file", meta: "640 KB" }] },
  { value: "passport.jpg", name: "Passport scan.jpg", type: "file", meta: "2.4 MB" },
]

export default function FileTreeItems() {
  return (
    <div className="w-80">
      <FileTree label="Documents" items={items} defaultExpanded={["2026", "2026/taxes"]} defaultValue="2026/taxes/w2.pdf" />
    </div>
  )
}
