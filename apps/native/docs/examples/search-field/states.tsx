import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { SearchField } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <SearchField
        label={t("Search files", "搜索文件")}
        defaultValue={t("Meeting", "会议")}
        editable={false}
        clearLabel={t("Clear search", "清除搜索")}
      />
    </View>
  );
}
