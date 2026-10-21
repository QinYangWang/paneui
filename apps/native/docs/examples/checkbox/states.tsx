import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Checkbox } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Checkbox label={t("Enabled", "已开启")} defaultValue />
      <Checkbox label={t("Unavailable", "不可用")} disabled />
      <Checkbox label={t("Select all", "全选")} defaultValue="indeterminate" />
    </View>
  );
}
