import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Text variant="heading">{t("Your workspace", "你的工作区")}</Text>
      <Text variant="title">{t("Project notes", "项目备注")}</Text>
      <Text variant="body">
        {t("Write together with your team.", "与团队一起写作。")}
      </Text>
      <Text variant="supporting">
        {t("Changes save automatically.", "更改会自动保存。")}
      </Text>
      <Text variant="caption">{t("Updated today", "今天更新")}</Text>
    </View>
  );
}
