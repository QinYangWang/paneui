import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Dialog, Button, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  return (
    <View style={{ gap: spacing.md }}>
      <Button onPress={() => setOpen(true)}>
        {t("Delete file", "删除文件")}
      </Button>
      <Dialog
        closeLabel={t("Close", "关闭")}
        open={open}
        onOpenChange={setOpen}
        title={t("Confirmation", "确认")}
      >
        <Text>
          {t("Review your changes before continuing.", "继续前请检查更改。")}
        </Text>
        <Button variant="secondary" onPress={() => setOpen(false)}>
          {t("Cancel", "取消")}
        </Button>
        <Button
          variant="destructive"
          onPress={() => {
            setOpen(false);
            setCount(count + 1);
          }}
        >
          {t("Confirm", "确认")}
        </Button>
      </Dialog>
      <Text accessibilityLiveRegion="polite">
        {count ? t("Changes applied", "更改已应用") : ""}
      </Text>
    </View>
  );
}
