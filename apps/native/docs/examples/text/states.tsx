import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Text>{t("Ready to share", "可以共享")}</Text>
      <Text tone="muted">{t("Only you can see this.", "仅自己可见。")}</Text>
      <Text tone="destructive">
        {t("Enter a name to continue.", "请填写名称后继续。")}
      </Text>
    </View>
  );
}
