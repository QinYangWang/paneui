import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Sheet, Button, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  return (
    <View style={{ gap: spacing.md }}>
      <Button onPress={() => setOpen(true)}>
        {t("Open details", "打开详情")}
      </Button>
      <Sheet closeLabel={t("Close", "关闭")} open={open} onOpenChange={setOpen}>
        <Text>
          {t("Review your changes before continuing.", "继续前请检查更改。")}
        </Text>
        <Button variant="secondary" onPress={() => setOpen(false)}>
          {t("Cancel", "取消")}
        </Button>
        <Button
          variant="primary"
          onPress={() => {
            setOpen(false);
            setCount(count + 1);
          }}
        >
          {t("Confirm", "确认")}
        </Button>
      </Sheet>
      <Text accessibilityLiveRegion="polite">
        {count ? t("Changes applied", "更改已应用") : ""}
      </Text>
    </View>
  );
}
