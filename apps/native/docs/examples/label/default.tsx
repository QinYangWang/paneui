import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Label } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Label>{t("Contact details", "联系方式")}</Label>
    </View>
  );
}
