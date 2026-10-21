import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Label } from "@paneui/ui-native";

export default function LabelExample() {
  return (
    <View style={{ gap: spacing.sm }}>
      <Label required>Project name</Label>
      <Label disabled>Workspace</Label>
    </View>
  );
}
