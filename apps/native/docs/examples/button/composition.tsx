import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Button size="sm">{t("Small", "小")}</Button>
      <Button size="default">{t("Default", "默认")}</Button>
      <Button size="lg">{t("Large", "大")}</Button>
      <Button disabled>{t("Unavailable", "不可用")}</Button>
    </View>
  );
}
