import type { ComponentType } from "react";

import ButtonExample from "./examples/button/default";
import CheckboxExample from "./examples/checkbox/default";
import FieldExample from "./examples/field/default";
import InputExample from "./examples/input/default";
import LabelExample from "./examples/label/default";
import RadioGroupExample from "./examples/radio-group/default";
import SegmentedControlExample from "./examples/segmented-control/default";
import SelectExample from "./examples/select/default";
import SliderExample from "./examples/slider/default";
import SwitchExample from "./examples/switch/default";
import TextareaExample from "./examples/textarea/default";
import AlertExample from "./examples/alert/default";
import AvatarExample from "./examples/avatar/default";
import BadgeExample from "./examples/badge/default";
import CardExample from "./examples/card/default";
import ListExample from "./examples/list/default";
import ProgressExample from "./examples/progress/default";
import SeparatorExample from "./examples/separator/default";
import SkeletonExample from "./examples/skeleton/default";
import SpinnerExample from "./examples/spinner/default";
import TabsExample from "./examples/tabs/default";
import DialogExample from "./examples/dialog/default";
import SheetExample from "./examples/sheet/default";
import ToastExample from "./examples/toast/default";
import TextExample from "./examples/text/default";

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
    name: "Button",
    slug: "button",
    category: "Forms",
    lede: ["Triggers an action or submits a form.", "触发操作或提交表单。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: ButtonExample },
    ],
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    category: "Forms",
    lede: ["Selects an option independently.", "独立选择一个选项。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: CheckboxExample },
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
      { id: "default", title: ["Example", "示例"], Example: FieldExample },
    ],
  },
  {
    name: "Input",
    slug: "input",
    category: "Forms",
    lede: ["Collects a line of text.", "输入单行文本。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: InputExample },
    ],
  },
  {
    name: "Label",
    slug: "label",
    category: "Forms",
    lede: ["Names a form control.", "为表单控件命名。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: LabelExample },
    ],
  },
  {
    name: "RadioGroup",
    slug: "radio-group",
    category: "Forms",
    lede: ["Chooses one option from a group.", "从一组选项中选择一项。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: RadioGroupExample },
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
        title: ["Example", "示例"],
        Example: SegmentedControlExample,
      },
    ],
  },
  {
    name: "Select",
    slug: "select",
    category: "Forms",
    lede: ["Chooses an option from a list.", "从列表中选择一个选项。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: SelectExample },
    ],
  },
  {
    name: "Slider",
    slug: "slider",
    category: "Forms",
    lede: ["Adjusts a value within a range.", "在范围内调整数值。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: SliderExample },
    ],
  },
  {
    name: "Switch",
    slug: "switch",
    category: "Forms",
    lede: ["Turns a setting on or off.", "开启或关闭设置。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: SwitchExample },
    ],
  },
  {
    name: "Textarea",
    slug: "textarea",
    category: "Forms",
    lede: ["Collects text across multiple lines.", "输入多行文本。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: TextareaExample },
    ],
  },
  {
    name: "Alert",
    slug: "alert",
    category: "Display",
    lede: ["Draws attention to a message.", "提示需要关注的信息。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: AlertExample },
    ],
  },
  {
    name: "Avatar",
    slug: "avatar",
    category: "Display",
    lede: ["Identifies a person or workspace.", "标识用户或工作区。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: AvatarExample },
    ],
  },
  {
    name: "Badge",
    slug: "badge",
    category: "Display",
    lede: ["Marks a status or category.", "标记状态或类别。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: BadgeExample },
    ],
  },
  {
    name: "Card",
    slug: "card",
    category: "Display",
    lede: ["Groups related content and actions.", "将相关内容和操作放在一起。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: CardExample },
    ],
  },
  {
    name: "List",
    slug: "list",
    category: "Display",
    lede: ["Groups related rows and actions.", "组织相关条目与操作。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: ListExample },
    ],
  },
  {
    name: "Progress",
    slug: "progress",
    category: "Display",
    lede: ["Shows how much of a task is done.", "显示任务的完成进度。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: ProgressExample },
    ],
  },
  {
    name: "Separator",
    slug: "separator",
    category: "Display",
    lede: ["Separates groups of content.", "分隔不同的内容组。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: SeparatorExample },
    ],
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    category: "Display",
    lede: ["Reserves space while content loads.", "在内容加载时预留空间。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: SkeletonExample },
    ],
  },
  {
    name: "Spinner",
    slug: "spinner",
    category: "Display",
    lede: ["Shows that an action is in progress.", "显示操作正在进行。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: SpinnerExample },
    ],
  },
  {
    name: "Tabs",
    slug: "tabs",
    category: "Navigation",
    lede: ["Switches between panels of content.", "切换内容面板。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: TabsExample },
    ],
  },
  {
    name: "Dialog",
    slug: "dialog",
    category: "Overlays",
    lede: ["Asks for a decision before continuing.", "在继续前请求用户确认。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: DialogExample },
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
      { id: "default", title: ["Example", "示例"], Example: SheetExample },
    ],
  },
  {
    name: "Toast",
    slug: "toast",
    category: "Overlays",
    lede: ["Confirms the result of an action.", "反馈操作结果。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: ToastExample },
    ],
  },
  {
    name: "Text",
    slug: "text",
    category: "Text",
    lede: ["Gives content a reading hierarchy.", "呈现清晰的文本层级。"],
    examples: [
      { id: "default", title: ["Example", "示例"], Example: TextExample },
    ],
  },
] as const satisfies readonly NativeComponentDoc[];

const categoryOrder = Object.keys(categories);
export const components = [...componentDocs].sort(
  (a, b) =>
    categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
    a.name.localeCompare(b.name, "en"),
);
