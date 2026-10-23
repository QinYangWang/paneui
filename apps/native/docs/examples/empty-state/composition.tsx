import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { EmptyState, Text, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [created, setCreated] = React.useState(false);
  return (
    <View style={{ gap: spacing.md }}>
      {created ? (
        <>
          <Text accessibilityLiveRegion="polite">
            {t("Untitled note", "未命名笔记")}
          </Text>
          <Button variant="secondary" onPress={() => setCreated(false)}>
            {t("Delete note", "删除笔记")}
          </Button>
        </>
      ) : (
        <EmptyState title={t("No notes yet", "暂无笔记")}>
          <Button onPress={() => setCreated(true)}>
            {t("Create note", "创建笔记")}
          </Button>
        </EmptyState>
      )}
    </View>
  );
}
