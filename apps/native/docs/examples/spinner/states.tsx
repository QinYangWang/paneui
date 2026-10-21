import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Spinner } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Spinner
        size="large"
        accessibilityLabel={t("Loading files", "正在加载文件")}
      />
      <Spinner
        tone="mutedForeground"
        accessibilityLabel={t("Syncing", "正在同步")}
      />
    </View>
  );
}
