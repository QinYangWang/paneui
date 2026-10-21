import AccordionDefaultExample from "./examples/accordion/default";
import AccordionStatesExample from "./examples/accordion/states";
import AccordionCompositionExample from "./examples/accordion/composition";
import ToggleGroupDefaultExample from "./examples/toggle-group/default";
import ToggleGroupStatesExample from "./examples/toggle-group/states";
import ToggleGroupCompositionExample from "./examples/toggle-group/composition";
import AvatarGroupDefaultExample from "./examples/avatar-group/default";
import AvatarGroupStatesExample from "./examples/avatar-group/states";
import AvatarGroupCompositionExample from "./examples/avatar-group/composition";
import EmptyStateDefaultExample from "./examples/empty-state/default";
import EmptyStateStatesExample from "./examples/empty-state/states";
import EmptyStateCompositionExample from "./examples/empty-state/composition";
import StatDefaultExample from "./examples/stat/default";
import StatStatesExample from "./examples/stat/states";
import StatCompositionExample from "./examples/stat/composition";
import SearchFieldDefaultExample from "./examples/search-field/default";
import SearchFieldStatesExample from "./examples/search-field/states";
import SearchFieldCompositionExample from "./examples/search-field/composition";
import StepperDefaultExample from "./examples/stepper/default";
import StepperStatesExample from "./examples/stepper/states";
import StepperCompositionExample from "./examples/stepper/composition";
import PaginationDotsDefaultExample from "./examples/pagination-dots/default";
import PaginationDotsStatesExample from "./examples/pagination-dots/states";
import PaginationDotsCompositionExample from "./examples/pagination-dots/composition";
import ThemeDefaultExample from "./examples/theme-provider/default";
import ThemeStatesExample from "./examples/theme-provider/states";
import ThemeCompositionExample from "./examples/theme-provider/composition";
import ToastCompositionExample from "./examples/toast/composition";
import ToastStatesExample from "./examples/toast/states";
import ToastDefaultExample from "./examples/toast/default";
import TextCompositionExample from "./examples/text/composition";
import TextStatesExample from "./examples/text/states";
import TextDefaultExample from "./examples/text/default";
import TabsCompositionExample from "./examples/tabs/composition";
import TabsStatesExample from "./examples/tabs/states";
import TabsDefaultExample from "./examples/tabs/default";
import SheetCompositionExample from "./examples/sheet/composition";
import SheetStatesExample from "./examples/sheet/states";
import SheetDefaultExample from "./examples/sheet/default";
import DialogCompositionExample from "./examples/dialog/composition";
import DialogStatesExample from "./examples/dialog/states";
import DialogDefaultExample from "./examples/dialog/default";
import SpinnerCompositionExample from "./examples/spinner/composition";
import SpinnerStatesExample from "./examples/spinner/states";
import SpinnerDefaultExample from "./examples/spinner/default";
import SkeletonCompositionExample from "./examples/skeleton/composition";
import SkeletonStatesExample from "./examples/skeleton/states";
import SkeletonDefaultExample from "./examples/skeleton/default";
import SeparatorCompositionExample from "./examples/separator/composition";
import SeparatorStatesExample from "./examples/separator/states";
import SeparatorDefaultExample from "./examples/separator/default";
import ProgressCompositionExample from "./examples/progress/composition";
import ProgressStatesExample from "./examples/progress/states";
import ProgressDefaultExample from "./examples/progress/default";
import ListCompositionExample from "./examples/list/composition";
import ListStatesExample from "./examples/list/states";
import ListDefaultExample from "./examples/list/default";
import CardCompositionExample from "./examples/card/composition";
import CardStatesExample from "./examples/card/states";
import CardDefaultExample from "./examples/card/default";
import BadgeCompositionExample from "./examples/badge/composition";
import BadgeStatesExample from "./examples/badge/states";
import BadgeDefaultExample from "./examples/badge/default";
import AvatarCompositionExample from "./examples/avatar/composition";
import AvatarStatesExample from "./examples/avatar/states";
import AvatarDefaultExample from "./examples/avatar/default";
import AlertCompositionExample from "./examples/alert/composition";
import AlertStatesExample from "./examples/alert/states";
import AlertDefaultExample from "./examples/alert/default";
import SliderCompositionExample from "./examples/slider/composition";
import SliderStatesExample from "./examples/slider/states";
import SliderDefaultExample from "./examples/slider/default";
import RadioGroupCompositionExample from "./examples/radio-group/composition";
import RadioGroupStatesExample from "./examples/radio-group/states";
import RadioGroupDefaultExample from "./examples/radio-group/default";
import SegmentedControlCompositionExample from "./examples/segmented-control/composition";
import SegmentedControlStatesExample from "./examples/segmented-control/states";
import SegmentedControlDefaultExample from "./examples/segmented-control/default";
import SelectCompositionExample from "./examples/select/composition";
import SelectStatesExample from "./examples/select/states";
import SelectDefaultExample from "./examples/select/default";
import LabelCompositionExample from "./examples/label/composition";
import LabelStatesExample from "./examples/label/states";
import LabelDefaultExample from "./examples/label/default";
import FieldCompositionExample from "./examples/field/composition";
import FieldStatesExample from "./examples/field/states";
import FieldDefaultExample from "./examples/field/default";
import TextareaCompositionExample from "./examples/textarea/composition";
import TextareaStatesExample from "./examples/textarea/states";
import TextareaDefaultExample from "./examples/textarea/default";
import InputCompositionExample from "./examples/input/composition";
import InputStatesExample from "./examples/input/states";
import InputDefaultExample from "./examples/input/default";
import SwitchCompositionExample from "./examples/switch/composition";
import SwitchStatesExample from "./examples/switch/states";
import SwitchDefaultExample from "./examples/switch/default";
import CheckboxCompositionExample from "./examples/checkbox/composition";
import CheckboxStatesExample from "./examples/checkbox/states";
import CheckboxDefaultExample from "./examples/checkbox/default";
import ButtonCompositionExample from "./examples/button/composition";
import ButtonStatesExample from "./examples/button/states";
import ButtonDefaultExample from "./examples/button/default";
import type { ComponentType } from "react";

export const categories = {
  Forms: ["Forms", "表单"],
  Display: ["Display", "展示"],
  Navigation: ["Navigation", "导航"],
  Overlays: ["Overlays", "浮层"],
  Text: ["Text", "文字"],
} as const;

export type NativeExample = {
  id: string;
  title: readonly [string, string];
  Example: ComponentType;
};
export type NativeComponentDoc = {
  name: string;
  slug: string;
  category: keyof typeof categories;
  lede: readonly [string, string];
  examples: readonly NativeExample[];
};

const componentDocs = [
  {
    name: "Accordion",
    slug: "accordion",
    category: "Display",
    lede: ["Reveals content beneath a heading.", "展开标题下的内容。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: AccordionDefaultExample,
      },
      {
        id: "states",
        title: ["States", "状态"],
        Example: AccordionStatesExample,
      },
      {
        id: "composition",
        title: ["Composition", "组合"],
        Example: AccordionCompositionExample,
      },
    ],
  },
  {
    name: "ToggleGroup",
    slug: "toggle-group",
    category: "Forms",
    lede: ["Selects several choices from a group.", "从分组中选择多个选项。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: ToggleGroupDefaultExample,
      },
      {
        id: "states",
        title: ["States", "状态"],
        Example: ToggleGroupStatesExample,
      },
      {
        id: "composition",
        title: ["Composition", "组合"],
        Example: ToggleGroupCompositionExample,
      },
    ],
  },
  {
    name: "AvatarGroup",
    slug: "avatar-group",
    category: "Display",
    lede: ["Shows the people in a shared space.", "显示共享空间中的成员。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: AvatarGroupDefaultExample,
      },
      {
        id: "states",
        title: ["States", "状态"],
        Example: AvatarGroupStatesExample,
      },
      {
        id: "composition",
        title: ["Composition", "组合"],
        Example: AvatarGroupCompositionExample,
      },
    ],
  },
  {
    name: "EmptyState",
    slug: "empty-state",
    category: "Display",
    lede: [
      "Helps people act when content is missing.",
      "在内容为空时引导操作。",
    ],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: EmptyStateDefaultExample,
      },
      {
        id: "states",
        title: ["States", "状态"],
        Example: EmptyStateStatesExample,
      },
      {
        id: "composition",
        title: ["Composition", "组合"],
        Example: EmptyStateCompositionExample,
      },
    ],
  },
  {
    name: "Stat",
    slug: "stat",
    category: "Display",
    lede: ["Shows a measurement with its context.", "显示数值及其含义。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: StatDefaultExample,
      },
      { id: "states", title: ["States", "状态"], Example: StatStatesExample },
      {
        id: "composition",
        title: ["Composition", "组合"],
        Example: StatCompositionExample,
      },
    ],
  },
  {
    name: "SearchField",
    slug: "search-field",
    category: "Forms",
    lede: ["Finds content with a text query.", "通过文字查找内容。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SearchFieldDefaultExample,
      },
      {
        id: "states",
        title: ["States", "状态"],
        Example: SearchFieldStatesExample,
      },
      {
        id: "composition",
        title: ["Composition", "组合"],
        Example: SearchFieldCompositionExample,
      },
    ],
  },
  {
    name: "Stepper",
    slug: "stepper",
    category: "Forms",
    lede: ["Adjusts a quantity within a range.", "在范围内调整数量。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: StepperDefaultExample,
      },
      {
        id: "states",
        title: ["States", "状态"],
        Example: StepperStatesExample,
      },
      {
        id: "composition",
        title: ["Composition", "组合"],
        Example: StepperCompositionExample,
      },
    ],
  },
  {
    name: "PaginationDots",
    slug: "pagination-dots",
    category: "Navigation",
    lede: ["Chooses a page in a short sequence.", "选择短序列中的页面。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: PaginationDotsDefaultExample,
      },
      {
        id: "states",
        title: ["States", "状态"],
        Example: PaginationDotsStatesExample,
      },
      {
        id: "composition",
        title: ["Composition", "组合"],
        Example: PaginationDotsCompositionExample,
      },
    ],
  },

  {
    name: "ThemeProvider",
    slug: "theme-provider",
    category: "Display",
    lede: [
      "Shares the current theme with child components.",
      "向子组件提供当前主题。",
    ],
    examples: [
      {
        id: "default",
        title: ["Light theme", "浅色主题"],
        Example: ThemeDefaultExample,
      },
      {
        id: "states",
        title: ["Dark theme", "深色主题"],
        Example: ThemeStatesExample,
      },
      {
        id: "composition",
        title: ["Follow the system", "跟随系统"],
        Example: ThemeCompositionExample,
      },
    ],
  },
  {
    name: "Button",
    slug: "button",
    category: "Forms",
    lede: ["Triggers an action or submits a form.", "触发操作或提交表单。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: ButtonDefaultExample,
      },
      {
        id: "states",
        title: ["Variants", "变体"],
        Example: ButtonStatesExample,
      },
      {
        id: "composition",
        title: ["Sizes and disabled", "尺寸与禁用"],
        Example: ButtonCompositionExample,
      },
    ],
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    category: "Forms",
    lede: ["Selects an option independently.", "独立选择一个选项。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: CheckboxDefaultExample,
      },
      {
        id: "states",
        title: ["States", "状态"],
        Example: CheckboxStatesExample,
      },
      {
        id: "composition",
        title: ["Preferences", "偏好设置"],
        Example: CheckboxCompositionExample,
      },
    ],
  },
  {
    name: "Field",
    slug: "field",
    category: "Forms",
    lede: [
      "Connects a control with its label and feedback.",
      "关联控件、标签与反馈。",
    ],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: FieldDefaultExample,
      },
      {
        id: "states",
        title: ["Required and error", "必填与错误"],
        Example: FieldStatesExample,
      },
      {
        id: "composition",
        title: ["Disabled", "禁用"],
        Example: FieldCompositionExample,
      },
    ],
  },
  {
    name: "Input",
    slug: "input",
    category: "Forms",
    lede: ["Collects a line of text.", "输入单行文本。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: InputDefaultExample,
      },
      {
        id: "states",
        title: ["Validation", "验证"],
        Example: InputStatesExample,
      },
      {
        id: "composition",
        title: ["Profile", "个人资料"],
        Example: InputCompositionExample,
      },
    ],
  },
  {
    name: "Label",
    slug: "label",
    category: "Forms",
    lede: ["Names a form control.", "为表单控件命名。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: LabelDefaultExample,
      },
      {
        id: "states",
        title: ["Required and disabled", "必填与禁用"],
        Example: LabelStatesExample,
      },
      {
        id: "composition",
        title: ["Form section", "表单分组"],
        Example: LabelCompositionExample,
      },
    ],
  },
  {
    name: "RadioGroup",
    slug: "radio-group",
    category: "Forms",
    lede: ["Chooses one option from a group.", "从一组选项中选择一项。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: RadioGroupDefaultExample,
      },
      {
        id: "states",
        title: ["Disabled group", "禁用分组"],
        Example: RadioGroupStatesExample,
      },
      {
        id: "composition",
        title: ["Notification preference", "通知偏好"],
        Example: RadioGroupCompositionExample,
      },
    ],
  },
  {
    name: "SegmentedControl",
    slug: "segmented-control",
    category: "Forms",
    lede: ["Switches between related views.", "切换相关视图。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SegmentedControlDefaultExample,
      },
      {
        id: "states",
        title: ["Disabled", "禁用"],
        Example: SegmentedControlStatesExample,
      },
      {
        id: "composition",
        title: ["Workspace preference", "工作区偏好"],
        Example: SegmentedControlCompositionExample,
      },
    ],
  },
  {
    name: "Select",
    slug: "select",
    category: "Forms",
    lede: ["Chooses an option from a list.", "从列表中选择一个选项。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SelectDefaultExample,
      },
      {
        id: "states",
        title: ["Disabled", "禁用"],
        Example: SelectStatesExample,
      },
      {
        id: "composition",
        title: ["Workspace preference", "工作区偏好"],
        Example: SelectCompositionExample,
      },
    ],
  },
  {
    name: "Slider",
    slug: "slider",
    category: "Forms",
    lede: ["Adjusts a value within a range.", "在范围内调整数值。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SliderDefaultExample,
      },
      {
        id: "states",
        title: ["Range and disabled", "范围与禁用"],
        Example: SliderStatesExample,
      },
      {
        id: "composition",
        title: ["Reading size", "阅读字号"],
        Example: SliderCompositionExample,
      },
    ],
  },
  {
    name: "Switch",
    slug: "switch",
    category: "Forms",
    lede: ["Turns a setting on or off.", "开启或关闭设置。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SwitchDefaultExample,
      },
      { id: "states", title: ["States", "状态"], Example: SwitchStatesExample },
      {
        id: "composition",
        title: ["Preferences", "偏好设置"],
        Example: SwitchCompositionExample,
      },
    ],
  },
  {
    name: "Textarea",
    slug: "textarea",
    category: "Forms",
    lede: ["Collects text across multiple lines.", "输入多行文本。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: TextareaDefaultExample,
      },
      {
        id: "states",
        title: ["Character limit", "字数限制"],
        Example: TextareaStatesExample,
      },
      {
        id: "composition",
        title: ["Review", "审核"],
        Example: TextareaCompositionExample,
      },
    ],
  },
  {
    name: "Alert",
    slug: "alert",
    category: "Display",
    lede: ["Draws attention to a message.", "提示需要关注的信息。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: AlertDefaultExample,
      },
      {
        id: "states",
        title: ["Status messages", "状态消息"],
        Example: AlertStatesExample,
      },
      {
        id: "composition",
        title: ["Retry upload", "重试上传"],
        Example: AlertCompositionExample,
      },
    ],
  },
  {
    name: "Avatar",
    slug: "avatar",
    category: "Display",
    lede: ["Identifies a person or workspace.", "标识用户或工作区。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: AvatarDefaultExample,
      },
      { id: "states", title: ["Sizes", "尺寸"], Example: AvatarStatesExample },
      {
        id: "composition",
        title: ["Team members", "团队成员"],
        Example: AvatarCompositionExample,
      },
    ],
  },
  {
    name: "Badge",
    slug: "badge",
    category: "Display",
    lede: ["Marks a status or category.", "标记状态或类别。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: BadgeDefaultExample,
      },
      {
        id: "states",
        title: ["Variants", "变体"],
        Example: BadgeStatesExample,
      },
      {
        id: "composition",
        title: ["File status", "文件状态"],
        Example: BadgeCompositionExample,
      },
    ],
  },
  {
    name: "Card",
    slug: "card",
    category: "Display",
    lede: ["Groups related content and actions.", "将相关内容和操作放在一起。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: CardDefaultExample,
      },
      {
        id: "states",
        title: ["Header and content", "标题与内容"],
        Example: CardStatesExample,
      },
      {
        id: "composition",
        title: ["Invitation", "邀请"],
        Example: CardCompositionExample,
      },
    ],
  },
  {
    name: "List",
    slug: "list",
    category: "Display",
    lede: ["Groups related rows and actions.", "组织相关条目与操作。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: ListDefaultExample,
      },
      {
        id: "states",
        title: ["Actions and disabled", "操作与禁用"],
        Example: ListStatesExample,
      },
      {
        id: "composition",
        title: ["Project files", "项目文件"],
        Example: ListCompositionExample,
      },
    ],
  },
  {
    name: "Progress",
    slug: "progress",
    category: "Display",
    lede: ["Shows how much of a task is done.", "显示任务的完成进度。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: ProgressDefaultExample,
      },
      {
        id: "states",
        title: ["Completion states", "完成状态"],
        Example: ProgressStatesExample,
      },
      {
        id: "composition",
        title: ["File upload", "文件上传"],
        Example: ProgressCompositionExample,
      },
    ],
  },
  {
    name: "Separator",
    slug: "separator",
    category: "Display",
    lede: ["Separates groups of content.", "分隔不同的内容组。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SeparatorDefaultExample,
      },
      {
        id: "states",
        title: ["Vertical", "垂直"],
        Example: SeparatorStatesExample,
      },
      {
        id: "composition",
        title: ["Account summary", "账户摘要"],
        Example: SeparatorCompositionExample,
      },
    ],
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    category: "Display",
    lede: ["Reserves space while content loads.", "在内容加载时预留空间。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SkeletonDefaultExample,
      },
      {
        id: "states",
        title: ["Profile placeholder", "个人资料占位"],
        Example: SkeletonStatesExample,
      },
      {
        id: "composition",
        title: ["Load content", "加载内容"],
        Example: SkeletonCompositionExample,
      },
    ],
  },
  {
    name: "Spinner",
    slug: "spinner",
    category: "Display",
    lede: ["Shows that an action is in progress.", "显示操作正在进行。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SpinnerDefaultExample,
      },
      {
        id: "states",
        title: ["Size and tone", "尺寸与色调"],
        Example: SpinnerStatesExample,
      },
      {
        id: "composition",
        title: ["Saving", "正在保存"],
        Example: SpinnerCompositionExample,
      },
    ],
  },
  {
    name: "Tabs",
    slug: "tabs",
    category: "Navigation",
    lede: ["Switches between panels of content.", "切换内容面板。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: TabsDefaultExample,
      },
      {
        id: "states",
        title: ["Disabled tab", "禁用标签"],
        Example: TabsStatesExample,
      },
      {
        id: "composition",
        title: ["Project panels", "项目面板"],
        Example: TabsCompositionExample,
      },
    ],
  },
  {
    name: "Dialog",
    slug: "dialog",
    category: "Overlays",
    lede: ["Asks for a decision before continuing.", "在继续前请求用户确认。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: DialogDefaultExample,
      },
      {
        id: "states",
        title: ["Confirmation", "确认"],
        Example: DialogStatesExample,
      },
      {
        id: "composition",
        title: ["Edit profile", "编辑资料"],
        Example: DialogCompositionExample,
      },
    ],
  },
  {
    name: "Sheet",
    slug: "sheet",
    category: "Overlays",
    lede: [
      "Opens related actions above the current screen.",
      "在当前页面上方打开相关操作。",
    ],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: SheetDefaultExample,
      },
      {
        id: "states",
        title: ["Confirmation", "确认"],
        Example: SheetStatesExample,
      },
      {
        id: "composition",
        title: ["Edit profile", "编辑资料"],
        Example: SheetCompositionExample,
      },
    ],
  },
  {
    name: "Toast",
    slug: "toast",
    category: "Overlays",
    lede: ["Confirms the result of an action.", "反馈操作结果。"],
    examples: [
      {
        id: "default",
        title: ["Default", "默认"],
        Example: ToastDefaultExample,
      },
      { id: "states", title: ["Status", "状态"], Example: ToastStatesExample },
      {
        id: "composition",
        title: ["Dismiss", "关闭"],
        Example: ToastCompositionExample,
      },
    ],
  },
  {
    name: "Text",
    slug: "text",
    category: "Text",
    lede: ["Gives content a reading hierarchy.", "呈现清晰的文本层级。"],
    examples: [
      {
        id: "default",
        title: ["Hierarchy", "层级"],
        Example: TextDefaultExample,
      },
      { id: "states", title: ["Tones", "色调"], Example: TextStatesExample },
      {
        id: "composition",
        title: ["Reading content", "阅读内容"],
        Example: TextCompositionExample,
      },
    ],
  },
] as const satisfies readonly NativeComponentDoc[];

const categoryOrder = Object.keys(categories);
export const components = [...componentDocs].sort(
  (a, b) =>
    categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
    a.name.localeCompare(b.name, "en"),
);
