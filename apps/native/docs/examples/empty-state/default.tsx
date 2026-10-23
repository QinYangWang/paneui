import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { EmptyState } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <EmptyState
        title={t("No files yet", "暂无文件")}
        description={t(
          "Add your first file to begin.",
          "添加第一个文件以开始。",
        )}
      />
    </View>
  );
}
