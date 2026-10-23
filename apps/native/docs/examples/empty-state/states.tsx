import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { EmptyState } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <EmptyState
        title={t("No results", "没有结果")}
        description={t("Try another search.", "请尝试其他关键词。")}
      />
    </View>
  );
}
