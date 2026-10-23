import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Button variant="primary">{t("Save", "保存")}</Button>
      <Button variant="secondary">{t("Save draft", "保存草稿")}</Button>
      <Button variant="ghost">{t("Cancel", "取消")}</Button>
      <Button variant="destructive">{t("Delete file", "删除文件")}</Button>
    </View>
  );
}
