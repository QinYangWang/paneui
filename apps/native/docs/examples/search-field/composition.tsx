import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { SearchField, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [query, setQuery] = React.useState("");
  return (
    <View style={{ gap: spacing.md }}>
      <SearchField
        label={t("Search notes", "搜索笔记")}
        value={query}
        onChangeText={setQuery}
        clearLabel={t("Clear search", "清除搜索")}
      />
      <Text accessibilityLiveRegion="polite">
        {query
          ? t(`Results for ${query}`, `${query} 的结果`)
          : t("All notes", "全部笔记")}
      </Text>
    </View>
  );
}
