export const reference: Record<
  string,
  { usage: readonly [string, string]; accessibility: readonly [string, string] }
> = {
  "theme-provider": {
    usage: [
      'import { ThemeProvider, Button } from "@paneui/ui-native";\n\n<ThemeProvider><Button>Continue</Button></ThemeProvider>',
      'import { ThemeProvider, Button } from "@paneui/ui-native";\n\n<ThemeProvider><Button>继续</Button></ThemeProvider>',
    ],
    accessibility: [
      "Without mode, the provider follows the system colour scheme. It adds no view or focus stop. useTheme() returns the active scheme and semantic colours; colour changes must preserve readable text and focus indicators.",
      "未提供 mode 时，跟随系统配色。Provider 不增加视图或焦点。useTheme() 返回当前配色和语义颜色；更改颜色时需保持文字与焦点指示清晰可见。",
    ],
  },
  button: {
    usage: [
      'import { Button } from "@paneui/ui-native";\n\n<Button onPress={save}>Save</Button>',
      'import { Button } from "@paneui/ui-native";\n\n<Button onPress={save}>保存</Button>',
    ],
    accessibility: [
      "Exposes a button role and disabled state. Use an action label. On web, Tab focuses and Enter or Space activates the button.",
      "提供按钮角色和禁用状态。请使用操作名称。网页端可用 Tab 聚焦，Enter 或空格激活。",
    ],
  },
  checkbox: {
    usage: [
      'import { Checkbox } from "@paneui/ui-native";\n\n<Checkbox label="Notifications" />',
      'import { Checkbox } from "@paneui/ui-native";\n\n<Checkbox label="通知" />',
    ],
    accessibility: [
      "The label names the control; checked and disabled states are exposed. On web, use Tab then Space to toggle. A Field can supply the name and hint.",
      "标签提供控件名称，并公开选中和禁用状态。网页端可用 Tab 聚焦，再按空格切换。Field 可提供名称和提示。",
    ],
  },
  switch: {
    usage: [
      'import { Switch } from "@paneui/ui-native";\n\n<Switch label="Notifications" />',
      'import { Switch } from "@paneui/ui-native";\n\n<Switch label="通知" />',
    ],
    accessibility: [
      "The label names the control; checked and disabled states are exposed. On web, use Tab then Space to toggle. A Field can supply the name and hint.",
      "标签提供控件名称，并公开选中和禁用状态。网页端可用 Tab 聚焦，再按空格切换。Field 可提供名称和提示。",
    ],
  },
  input: {
    usage: [
      'import { Input } from "@paneui/ui-native";\n\n<Input label="Name" />',
      'import { Input } from "@paneui/ui-native";\n\n<Input label="姓名" />',
    ],
    accessibility: [
      "The visible label becomes the accessible name. Error or description becomes the hint. Errors remain visible and use a polite live region. Use editable={false} to prevent editing.",
      "可见标签作为无障碍名称，错误或说明作为提示。错误保持可见，并使用礼貌播报区域。使用 editable={false} 阻止编辑。",
    ],
  },
  textarea: {
    usage: [
      'import { Field, Textarea } from "@paneui/ui-native";\n\n<Field label="Notes"><Textarea /></Field>',
      'import { Field, Textarea } from "@paneui/ui-native";\n\n<Field label="备注"><Textarea /></Field>',
    ],
    accessibility: [
      "Provide a Field label or accessibilityLabel. Field supplies hints and disabled state. The character counter is visible text; multiline input keeps normal keyboard editing.",
      "请提供 Field 标签或 accessibilityLabel。Field 提供提示和禁用状态。字数计数为可见文本，多行输入保留常规键盘编辑行为。",
    ],
  },
  field: {
    usage: [
      'import { Field, Checkbox } from "@paneui/ui-native";\n\n<Field label="Agreement" required><Checkbox label="I agree" /></Field>',
      'import { Field, Checkbox } from "@paneui/ui-native";\n\n<Field label="协议" required><Checkbox label="我同意" /></Field>',
    ],
    accessibility: [
      "Child controls that consume Field inherit its name, hint and disabled state. Required adds a visible marker; provide any needed required semantics on the control. Input manages its own label and feedback.",
      "使用 Field 上下文的子控件继承名称、提示和禁用状态。required 添加可见标记；请在控件上提供所需的必填语义。Input 单独管理标签和反馈。",
    ],
  },
  label: {
    usage: [
      'import { Label } from "@paneui/ui-native";\n\n<Label required>Name</Label>',
      'import { Label } from "@paneui/ui-native";\n\n<Label required>姓名</Label>',
    ],
    accessibility: [
      "Label supplies visible text only. Name the control with accessibilityLabel, or use Field to share label context. A required marker does not enforce validation.",
      "Label 只提供可见文字。请通过 accessibilityLabel 为控件命名，或使用 Field 共享标签。必填标记不会执行验证。",
    ],
  },
  "radio-group": {
    usage: [
      'import { RadioGroup, RadioGroupItem } from "@paneui/ui-native";\n\n<RadioGroup label="Delivery" defaultValue="email">\n  <RadioGroupItem value="email" label="Email" />\n  <RadioGroupItem value="inbox" label="Inbox" />\n</RadioGroup>',
      'import { RadioGroup, RadioGroupItem } from "@paneui/ui-native";\n\n<RadioGroup label="通知方式" defaultValue="email">\n  <RadioGroupItem value="email" label="邮件" />\n  <RadioGroupItem value="inbox" label="收件箱" />\n</RadioGroup>',
    ],
    accessibility: [
      "Exposes group and radio roles with checked and disabled states. Give the group a label. On web, Tab visits enabled options and Space selects; arrow-key navigation is not implemented.",
      "提供分组和单选角色，以及选中和禁用状态。请为分组命名。网页端可用 Tab 访问可用选项，空格选择；尚未实现方向键导航。",
    ],
  },
  select: {
    usage: [
      'import { Select } from "@paneui/ui-native";\n\n<Select label="View" options={[{value: "day", label: "Day"}, {value: "week", label: "Week"}]} />',
      'import { Select } from "@paneui/ui-native";\n\n<Select label="视图" options={[{value: "day", label: "日"}, {value: "week", label: "周"}]} />',
    ],
    accessibility: [
      "Select exposes a combobox with expanded state and a selected-value announcement. The modal options expose radio states. Tab visits options and Space selects; closing restores trigger focus.",
      "Select 提供组合框角色、展开状态和当前值播报。浮层选项提供单选状态。Tab 访问选项，空格选择；关闭后焦点返回触发器。",
    ],
  },
  "segmented-control": {
    usage: [
      'import { SegmentedControl } from "@paneui/ui-native";\n\n<SegmentedControl label="View" options={[{value: "day", label: "Day"}, {value: "week", label: "Week"}]} />',
      'import { SegmentedControl } from "@paneui/ui-native";\n\n<SegmentedControl label="视图" options={[{value: "day", label: "日"}, {value: "week", label: "周"}]} />',
    ],
    accessibility: [
      "Exposes a radio group with checked and disabled options. Supply a label and two to five choices. Tab and Space operate options on web; arrow-key navigation is not implemented. Motion follows reduced-motion preferences.",
      "提供单选分组及选项的选中和禁用状态。请提供标签和二至五个选项。网页端用 Tab 和空格操作；尚未实现方向键导航。动画遵循减少动态效果偏好。",
    ],
  },
  slider: {
    usage: [
      'import { Slider } from "@paneui/ui-native";\n\n<Slider label="Volume" defaultValue={40} step={5} />',
      'import { Slider } from "@paneui/ui-native";\n\n<Slider label="音量" defaultValue={40} step={5} />',
    ],
    accessibility: [
      "Exposes an adjustable role with minimum, maximum and current value. Device accessibility actions increment or decrement by step. Pointer dragging works on web; keyboard arrow adjustment is not implemented.",
      "提供可调整角色以及最小、最大和当前值。设备无障碍操作可按 step 增减。网页端支持指针拖动；尚未实现键盘方向键调整。",
    ],
  },
  alert: {
    usage: [
      'import { Alert } from "@paneui/ui-native";\n\n<Alert title="Changes saved" variant="success" />',
      'import { Alert } from "@paneui/ui-native";\n\n<Alert title="更改已保存" variant="success" />',
    ],
    accessibility: [
      "Uses an alert role and polite live region. Write the status in the title so colour is not the only signal. Avoid repeating a message on every render.",
      "使用警报角色和礼貌播报区域。请在标题中写明状态，避免仅靠颜色传达。不要在每次渲染时重复消息。",
    ],
  },
  avatar: {
    usage: [
      'import { Avatar } from "@paneui/ui-native";\n\n<Avatar name="Maya Chen" />',
      'import { Avatar } from "@paneui/ui-native";\n\n<Avatar name="陈晓" />',
    ],
    accessibility: [
      "Exposes an image role named by name. The image itself is hidden from accessibility to avoid duplicate announcements. Initials remain when an image fails.",
      "提供图片角色，名称取自 name。内部图片对无障碍隐藏以避免重复播报。图片加载失败时保留首字。",
    ],
  },
  badge: {
    usage: [
      'import { Badge } from "@paneui/ui-native";\n\n<Badge variant="success">Ready</Badge>',
      'import { Badge } from "@paneui/ui-native";\n\n<Badge variant="success">就绪</Badge>',
    ],
    accessibility: [
      "Badge is static text. Include a readable status label rather than relying on colour. Use an external live region if a status update needs announcement.",
      "Badge 是静态文字。请提供可读状态标签，避免仅靠颜色。需要播报状态更改时，请使用外部实时区域。",
    ],
  },
  card: {
    usage: [
      'import { Card, CardHeader, CardContent, Text } from "@paneui/ui-native";\n\n<Card>\n  <CardHeader><Text variant="title">Project</Text></CardHeader>\n  <CardContent><Text>Meeting notes</Text></CardContent>\n</Card>',
      'import { Card, CardHeader, CardContent, Text } from "@paneui/ui-native";\n\n<Card>\n  <CardHeader><Text variant="title">项目</Text></CardHeader>\n  <CardContent><Text>会议备注</Text></CardContent>\n</Card>',
    ],
    accessibility: [
      "Card parts are layout views. Add header semantics to a title when it introduces a section. Keep child actions separately focusable instead of making the whole card an accessible group.",
      "Card 各部分是布局视图。标题引入章节时请添加标题语义。保留子操作的独立焦点，避免将整张卡片合并为无障碍分组。",
    ],
  },
  list: {
    usage: [
      'import { List, ListItem } from "@paneui/ui-native";\n\n<List><ListItem title="Inbox" onPress={openInbox} /></List>',
      'import { List, ListItem } from "@paneui/ui-native";\n\n<List><ListItem title="收件箱" onPress={openInbox} /></List>',
    ],
    accessibility: [
      "Rows with onPress expose a button role, disabled state and focus ring. Static rows render text without a button role. Keep nested actions out of pressable rows.",
      "具有 onPress 的条目提供按钮角色、禁用状态和焦点环。静态条目只显示文字，不具有按钮角色。避免在可点击条目中嵌套操作。",
    ],
  },
  progress: {
    usage: [
      'import { Progress } from "@paneui/ui-native";\n\n<Progress label="Upload" value={0.4} />',
      'import { Progress } from "@paneui/ui-native";\n\n<Progress label="上传" value={0.4} />',
    ],
    accessibility: [
      "Exposes a named progressbar and a percentage from 0 to 100. The value prop uses 0 to 1 and is clamped. Reduced motion removes the width transition.",
      "提供具名进度条角色和 0 至 100 的百分比。value 使用 0 至 1，超出范围时会限制。减少动态效果时取消宽度过渡。",
    ],
  },
  separator: {
    usage: [
      'import { Separator } from "@paneui/ui-native";\n\n<Separator />',
      'import { Separator } from "@paneui/ui-native";\n\n<Separator />',
    ],
    accessibility: [
      "The divider is decorative and hidden from assistive technology. Use headings or labels to communicate content groups.",
      "分隔线用于装饰，对辅助技术隐藏。请使用标题或标签表达内容分组。",
    ],
  },
  skeleton: {
    usage: [
      'import { Skeleton } from "@paneui/ui-native";\n\n<Skeleton width="70%" />',
      'import { Skeleton } from "@paneui/ui-native";\n\n<Skeleton width="70%" />',
    ],
    accessibility: [
      "Placeholders are hidden from assistive technology. Announce loading on the surrounding content region when needed. The pulse stops under reduced motion.",
      "占位对辅助技术隐藏。需要时请在周围内容区域播报加载状态。减少动态效果时停止脉动。",
    ],
  },
  spinner: {
    usage: [
      'import { Spinner } from "@paneui/ui-native";\n\n<Spinner accessibilityLabel="Loading files" />',
      'import { Spinner } from "@paneui/ui-native";\n\n<Spinner accessibilityLabel="正在加载文件" />',
    ],
    accessibility: [
      "Exposes a progressbar role. Supply a task-specific accessibilityLabel. Keep visible loading text nearby when the spinner is the only feedback.",
      "提供进度条角色。请用 accessibilityLabel 说明正在执行的任务。加载指示器是唯一反馈时，请在附近提供可见文字。",
    ],
  },
  tabs: {
    usage: [
      'import { Tabs, TabsList, TabsTrigger, TabsContent, Text } from "@paneui/ui-native";\n\n<Tabs defaultValue="notes">\n  <TabsList><TabsTrigger value="notes">Notes</TabsTrigger></TabsList>\n  <TabsContent value="notes"><Text>Meeting notes</Text></TabsContent>\n</Tabs>',
      'import { Tabs, TabsList, TabsTrigger, TabsContent, Text } from "@paneui/ui-native";\n\n<Tabs defaultValue="notes">\n  <TabsList><TabsTrigger value="notes">备注</TabsTrigger></TabsList>\n  <TabsContent value="notes"><Text>会议备注</Text></TabsContent>\n</Tabs>',
    ],
    accessibility: [
      "TabsList and TabsTrigger expose tablist and tab roles with selected state. Only the active content is mounted. On web, Tab visits enabled triggers and Space selects; arrow navigation and panel relationships are not supplied.",
      "TabsList 和 TabsTrigger 提供标签列表与标签角色以及选中状态。仅挂载当前内容。网页端用 Tab 访问可用标签，空格选择；尚未提供方向键导航与面板关联。",
    ],
  },
  dialog: {
    usage: [
      'import { Dialog, Button } from "@paneui/ui-native";\n\n<Dialog open={open} onOpenChange={setOpen} title="Delete file?">\n  <Button onPress={() => setOpen(false)}>Cancel</Button>\n</Dialog>',
      'import { Dialog, Button } from "@paneui/ui-native";\n\n<Dialog open={open} onOpenChange={setOpen} title="删除文件？">\n  <Button onPress={() => setOpen(false)}>取消</Button>\n</Dialog>',
    ],
    accessibility: [
      "Keep the overlay mounted and control open. Include an explicit close action; do not rely on the backdrop or swipe alone. Check modal focus, dismissal and screen-reader order on each device.",
      "请保持浮层挂载，通过 open 控制。提供明确的关闭操作，不要仅依赖背景或滑动。请在各设备检查浮层焦点、关闭和屏幕阅读顺序。",
    ],
  },
  sheet: {
    usage: [
      'import { Sheet, Button } from "@paneui/ui-native";\n\n<Sheet open={open} onOpenChange={setOpen}>\n  <Button onPress={() => setOpen(false)}>Cancel</Button>\n</Sheet>',
      'import { Sheet, Button } from "@paneui/ui-native";\n\n<Sheet open={open} onOpenChange={setOpen}>\n  <Button onPress={() => setOpen(false)}>取消</Button>\n</Sheet>',
    ],
    accessibility: [
      "Keep the overlay mounted and control open. Include an explicit close action; do not rely on the backdrop or swipe alone. Check modal focus, dismissal and screen-reader order on each device.",
      "请保持浮层挂载，通过 open 控制。提供明确的关闭操作，不要仅依赖背景或滑动。请在各设备检查浮层焦点、关闭和屏幕阅读顺序。",
    ],
  },
  toast: {
    usage: [
      'import { ToastProvider, useToast, Button } from "@paneui/ui-native";\n\nfunction Save() {\n  const { show } = useToast();\n  return <Button onPress={() => show({ title: "Saved" })}>Save</Button>;\n}\n\n<ToastProvider><Save /></ToastProvider>',
      'import { ToastProvider, useToast, Button } from "@paneui/ui-native";\n\nfunction Save() {\n  const { show } = useToast();\n  return <Button onPress={() => show({ title: "已保存" })}>保存</Button>;\n}\n\n<ToastProvider><Save /></ToastProvider>',
    ],
    accessibility: [
      "Messages use an alert role with polite announcements; destructive messages use assertive announcements. Keep important errors visible elsewhere after the toast expires. The provider offers show(options) and dismiss().",
      "消息使用警报角色并礼貌播报；destructive 消息使用即时播报。消息消失后，重要错误仍应在其他位置可见。Provider 提供 show(options) 和 dismiss()。",
    ],
  },
  text: {
    usage: [
      'import { Text } from "@paneui/ui-native";\n\n<Text variant="title">Meeting notes</Text>',
      'import { Text } from "@paneui/ui-native";\n\n<Text variant="title">会议备注</Text>',
    ],
    accessibility: [
      'System font scaling remains enabled. Variants change typography, not semantic roles. Add accessibilityRole="header" for a section heading.',
      '保留系统字体缩放。变体改变排版，不改变语义角色。章节标题请添加 accessibilityRole="header"。',
    ],
  },
};
