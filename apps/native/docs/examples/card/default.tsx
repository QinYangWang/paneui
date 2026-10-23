import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Card, CardHeader, CardContent, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Card>
        <CardHeader>
          <Text variant="title">{t("Project notes", "项目备注")}</Text>
        </CardHeader>
        <CardContent>
          <Text>{t("Plan the next steps.", "规划后续步骤。")}</Text>
        </CardContent>
      </Card>
    </View>
  );
}
