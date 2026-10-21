import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { List, ListItem, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <List>
        <ListItem
          title={t("Send reminder", "发送提醒")}
          onPress={() => setCount(count + 1)}
        />
        <ListItem
          title={t("Delete workspace", "删除工作区")}
          onPress={() => {}}
          disabled
        />
      </List>
      <Text
        style={{ fontVariant: ["tabular-nums"] }}
        accessibilityLiveRegion="polite"
      >
        {/* design-check-ignore tabular-nums -- Native fontVariant supplies tabular numerals. */}
        {count}
      </Text>
    </View>
  );
}
