import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Label } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Label required>{t("Name", "姓名")}</Label>
      <Label disabled>{t("Archived account", "已归档账户")}</Label>
    </View>
  );
}
