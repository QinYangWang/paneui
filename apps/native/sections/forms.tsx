import * as React from "react"
import { View } from "react-native"
import { spacing } from "@paneui/tokens"
import { Checkbox, Field, Label, RadioGroup, RadioGroupItem, SegmentedControl, Select, Slider, Switch, Textarea } from "@paneui/ui-native"

function SwitchExample() { const [value, setValue] = React.useState(true); return <View style={{ gap: spacing.sm }}><Switch label="Notifications" value={value} onValueChange={setValue} /><Switch label="Sync" disabled /></View> }
function CheckboxExample() { return <View style={{ gap: spacing.sm }}><Checkbox label="Save a copy" /><Checkbox label="All folders" defaultValue="indeterminate" /><Checkbox label="Archived" disabled /></View> }
function RadioExample() { return <RadioGroup label="Delivery" defaultValue="email"><RadioGroupItem value="email" label="Email" /><RadioGroupItem value="inbox" label="Inbox" /><RadioGroupItem value="sms" label="Text message" disabled /></RadioGroup> }
function SliderExample() { return <Field label="Volume"><Slider defaultValue={40} step={5} /></Field> }
function TextareaExample() { return <Field label="Notes" description="Add a note for your team."><Textarea placeholder="Write a note" maxLength={240} showCounter /></Field> }
function SegmentedExample() { return <SegmentedControl label="View" defaultValue="week" options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]} /> }
function SelectExample() { return <Field label="Workspace"><Select options={[{ value: "personal", label: "Personal" }, { value: "team", label: "Team" }, { value: "archive", label: "Archive", disabled: true }]} defaultValue="personal" /></Field> }
function FieldExample() { return <Field label="Agreement" error="Accept the agreement to continue." required><Checkbox label="I agree" /></Field> }
function LabelExample() { return <View style={{ gap: spacing.sm }}><Label required>Project name</Label><Label disabled>Workspace</Label></View> }
export const formSections: Record<string, () => React.ReactElement> = { Label: LabelExample, Field: FieldExample, Switch: SwitchExample, Checkbox: CheckboxExample, RadioGroup: RadioExample, Slider: SliderExample, Textarea: TextareaExample, SegmentedControl: SegmentedExample, Select: SelectExample }
