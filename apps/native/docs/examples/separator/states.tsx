import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Separator, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <Text>{t("Notes", "备注")}</Text>
        <Separator orientation="vertical" />
        <Text>{t("Files", "文件")}</Text>
      </View>
    </View>
  );
}
