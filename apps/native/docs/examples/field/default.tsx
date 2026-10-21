import { Checkbox, Field } from "@paneui/ui-native";

export default function FieldExample() {
  return (
    <Field label="Agreement" error="Accept the agreement to continue." required>
      <Checkbox label="I agree" />
    </Field>
  );
}
