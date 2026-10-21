import { Field, Textarea } from "@paneui/ui-native";

export default function TextareaExample() {
  return (
    <Field label="Notes" description="Add a note for your team.">
      <Textarea placeholder="Write a note" maxLength={240} showCounter />
    </Field>
  );
}
