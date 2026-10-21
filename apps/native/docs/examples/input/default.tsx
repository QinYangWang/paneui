import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Input } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Input
        label={t("Name", "姓名")}
        placeholder={t("Your name", "你的姓名")}
      />
    </View>
  );
}
