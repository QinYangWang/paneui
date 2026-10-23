import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Separator, Text, Card } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Card>
        <Text variant="title">{t("Your account", "你的账户")}</Text>
        <Text>{t("Personal workspace", "个人工作区")}</Text>
        <Separator />
        <Text tone="muted">
          {t("Plan renews next month.", "方案将于下月续订。")}
        </Text>
      </Card>
    </View>
  );
}
