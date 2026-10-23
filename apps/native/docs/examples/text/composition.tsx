import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Text, Card } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Card>
        <Text variant="title" accessibilityRole="header">
          {t("Meeting notes", "会议备注")}
        </Text>
        <Text>
          {t(
            "Agree on the next steps and assign an owner to each task.",
            "确定后续步骤，并为每项任务指定负责人。",
          )}
        </Text>
      </Card>
    </View>
  );
}
