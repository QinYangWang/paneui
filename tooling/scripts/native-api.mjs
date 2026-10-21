import ts from "typescript";
import { readFile, writeFile, readdir } from "node:fs/promises";
const root = new URL("../../packages/ui-native/src/", import.meta.url);
const result = {};
const descriptions = {
  children: ["Content to render.", "要显示的内容。"],
  label: ["Accessible control name.", "控件的无障碍名称。"],
  title: ["Visible title.", "显示的标题。"],
  description: ["Supporting message.", "补充说明。"],
  variant: ["Visual treatment.", "视觉样式。"],
  size: ["Control size.", "控件尺寸。"],
  value: ["Controlled value.", "受控值。"],
  defaultValue: ["Initial uncontrolled value.", "非受控初始值。"],
  onValueChange: ["Called when the value changes.", "值更改时调用。"],
  disabled: ["Prevents interaction.", "阻止交互。"],
  required: ["Marks a required field.", "标记必填字段。"],
  error: ["Validation feedback.", "验证反馈。"],
  id: ["Control identifier.", "控件标识。"],
  options: ["Available choices.", "可选项。"],
  min: ["Lowest allowed value.", "允许的最小值。"],
  max: ["Highest allowed value.", "允许的最大值。"],
  step: ["Value increment.", "数值增量。"],
  autoGrow: ["Grows with the content.", "随内容增加高度。"],
  showCounter: ["Shows the character count.", "显示字数。"],
  name: ["Person’s full name.", "用户的全名。"],
  src: ["Image URI; initials remain on failure.", "图片地址，失败时显示首字。"],
  leading: ["Content before the row title.", "条目标题前的内容。"],
  trailing: ["Content after the row title.", "条目标题后的内容。"],
  showSeparator: ["Draws the grouped row divider.", "显示分组条目分隔线。"],
  tone: ["Semantic colour role.", "语义颜色角色。"],
  width: ["Placeholder width.", "占位宽度。"],
  height: ["Placeholder height.", "占位高度。"],
  circle: ["Uses a circular placeholder.", "使用圆形占位。"],
  orientation: ["Divider direction.", "分隔线方向。"],
  open: ["Controlled visibility.", "受控显示状态。"],
  defaultOpen: ["Initial uncontrolled visibility.", "非受控初始显示状态。"],
  onOpenChange: ["Called when visibility changes.", "显示状态更改时调用。"],
  bottomInset: ["Extra bottom safe-area spacing.", "底部安全区域的额外间距。"],
  duration: ["Time before dismissal in milliseconds.", "自动关闭前的毫秒数。"],
  closeLabel: ["Accessible dismissal label.", "关闭操作的无障碍名称。"],
  doneLabel: ["Visible dismissal text.", "关闭操作的可见文字。"],
  mode: [
    "Theme override; otherwise follows the system.",
    "指定主题，默认跟随系统。",
  ],
};
for (const file of await readdir(root)) {
  if (!file.endsWith(".tsx")) continue;
  const source = ts.createSourceFile(
    file,
    await readFile(new URL(file, root), "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const defaults = {};
  for (const node of source.statements)
    if (
      ts.isFunctionDeclaration(node) &&
      node.name &&
      node.parameters[0] &&
      ts.isObjectBindingPattern(node.parameters[0].name)
    ) {
      defaults[node.name.text] = Object.fromEntries(
        node.parameters[0].name.elements
          .filter((x) => x.initializer)
          .map((x) => [x.name.getText(source), x.initializer.getText(source)]),
      );
    }
  function optionDefaults(node) {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken &&
      ts.isPropertyAccessExpression(node.left) &&
      node.left.expression.getText(source) === "options"
    ) {
      defaults.ToastOptions ??= {};
      defaults.ToastOptions[node.left.name.text] = node.right.getText(source);
    }
    ts.forEachChild(node, optionDefaults);
  }
  optionDefaults(source);
  const groups = [];
  const aliases = new Map(
    source.statements
      .filter(ts.isTypeAliasDeclaration)
      .map((node) => [node.name.text, node.type]),
  );
  function members(type) {
    if (ts.isTypeLiteralNode(type))
      return type.members.filter(ts.isPropertySignature);
    if (ts.isIntersectionTypeNode(type)) return type.types.flatMap(members);
    if (
      ts.isTypeReferenceNode(type) &&
      aliases.has(type.typeName.getText(source))
    )
      return members(aliases.get(type.typeName.getText(source)));
    if (
      ts.isTypeReferenceNode(type) &&
      type.typeName.getText(source) === "Omit" &&
      type.typeArguments?.length === 2
    ) {
      const excluded =
        type.typeArguments[1]
          .getText(source)
          .match(/"([^"]+)"/g)
          ?.map((x) => x.slice(1, -1)) ?? [];
      return members(type.typeArguments[0]).filter(
        (p) => !excluded.includes(p.name.getText(source)),
      );
    }
    return [];
  }
  for (const node of source.statements)
    if (
      ts.isTypeAliasDeclaration(node) &&
      /Props$|^ToastOptions$|^FieldState$|^SelectOption$|^SegmentedControlOption$/.test(
        node.name.text,
      )
    ) {
      const name = node.name.text.replace(/Props$/, "");
      const props = members(node.type).map((p) => ({
        name: p.name.getText(source),
        type: p.type?.getText(source) ?? "unknown",
        required: !p.questionToken,
        default: defaults[name]?.[p.name.getText(source)] ?? "—",
        description:
          p.name.getText(source) === "value" &&
          ["RadioGroupItem", "SelectOption", "SegmentedControlOption"].includes(
            name,
          )
            ? ["Option identifier.", "选项标识。"]
            : p.name.getText(source) === "value" &&
                ["TabsTrigger", "TabsContent"].includes(name)
              ? ["Matching panel identifier.", "匹配的面板标识。"]
              : p.name.getText(source) === "value" && name === "Progress"
                ? ["Completed fraction from 0 to 1.", "0 至 1 的完成比例。"]
                : (descriptions[p.name.getText(source)] ?? [
                    "Value for this part.",
                    "此部分的值。",
                  ]),
      }));
      const forwarded = {
        disabled: "boolean",
        editable: "boolean",
        size: '"small" | "large" | number',
        accessibilityLabel: "string",
      };
      for (const [prop, initial] of Object.entries(defaults[name] ?? {})) {
        if (!props.some((row) => row.name === prop) && forwarded[prop])
          props.push({
            name: prop,
            type: forwarded[prop],
            required: false,
            default: initial,
            description:
              descriptions[prop] ??
              (prop === "editable"
                ? ["Allows text editing.", "允许编辑文本。"]
                : ["Accessible control name.", "控件的无障碍名称。"]),
          });
      }
      groups.push({
        name,
        extends: ts.isIntersectionTypeNode(node.type)
          ? node.type.types
              .filter((x) => !ts.isTypeLiteralNode(x))
              .map((x) => x.getText(source))
              .join(" & ")
          : "",
        props,
      });
    }
  // Inline signatures on exported parts remain part of the reference.
  for (const node of source.statements)
    if (
      ts.isFunctionDeclaration(node) &&
      node.name &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
      node.parameters[0]?.type
    ) {
      const type = node.parameters[0].type;
      if (type.getText(source) === "ViewProps" || ts.isTypeLiteralNode(type))
        groups.push({
          name: node.name.text,
          extends: ts.isTypeLiteralNode(type) ? "" : "ViewProps",
          props:
            type.getText(source) === "ViewProps"
              ? [
                  {
                    name: "children",
                    type: "React.ReactNode",
                    required: false,
                    default: "—",
                    description: descriptions.children,
                  },
                  {
                    name: "style",
                    type: "StyleProp<ViewStyle>",
                    required: false,
                    default: "—",
                    description: [
                      "Additional view styles.",
                      "额外的视图样式。",
                    ],
                  },
                  {
                    name: "accessibilityLabel",
                    type: "string",
                    required: false,
                    default: "—",
                    description: [
                      "Accessible name when the view is grouped.",
                      "视图作为分组时的无障碍名称。",
                    ],
                  },
                ]
              : members(type).map((p) => ({
                  name: p.name.getText(source),
                  type: p.type.getText(source),
                  required: !p.questionToken,
                  default:
                    defaults[node.name.text]?.[p.name.getText(source)] ?? "—",
                  description: descriptions[p.name.getText(source)] ?? [
                    "Content to render.",
                    "要显示的内容。",
                  ],
                })),
        });
    }
  if (groups.length)
    result[file === "theme.tsx" ? "theme-provider" : file.replace(".tsx", "")] =
      groups;
}
await writeFile(
  new URL("../../apps/native/docs/api.generated.ts", import.meta.url),
  `// Generated by tooling/scripts/native-api.mjs.\nexport const api = ${JSON.stringify(result, null, 2)} as const;\n`,
);
