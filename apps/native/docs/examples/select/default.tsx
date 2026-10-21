import { Field, Select } from "@paneui/ui-native";

export default function SelectExample() {
  return (
    <Field label="Workspace">
      <Select
        options={[
          { value: "personal", label: "Personal" },
          { value: "team", label: "Team" },
          { value: "archive", label: "Archive", disabled: true },
        ]}
        defaultValue="personal"
      />
    </Field>
  );
}
