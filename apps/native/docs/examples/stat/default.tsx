import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Stat } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <Stat label={t("Completed", "已完成")} value="128" />
    </View>
  );
}
