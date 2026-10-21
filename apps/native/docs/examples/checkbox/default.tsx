import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Checkbox } from "@paneui/ui-native";

export default function CheckboxExample() {
  return (
    <View style={{ gap: spacing.sm }}>
      <Checkbox label="Save a copy" />
      <Checkbox label="All folders" defaultValue="indeterminate" />
      <Checkbox label="Archived" disabled />
    </View>
  );
}
