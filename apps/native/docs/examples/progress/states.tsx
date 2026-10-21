import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Progress } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Progress label={t("Not started", "尚未开始")} value={0} />
      <Progress label={t("Completed", "已完成")} value={1} tone="success" />
    </View>
  );
}
