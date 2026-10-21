import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Badge } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Badge variant="primary">{t("New", "新")}</Badge>
      <Badge variant="secondary">{t("Draft", "草稿")}</Badge>
      <Badge variant="success">{t("Ready", "就绪")}</Badge>
      <Badge variant="warning">{t("Pending", "待处理")}</Badge>
      <Badge variant="destructive">{t("Failed", "失败")}</Badge>
      <Badge variant="outline">{t("Archived", "已归档")}</Badge>
    </View>
  );
}
