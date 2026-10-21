import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Sheet, Button, Text, Input } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  return (
    <View style={{ gap: spacing.md }}>
      <Button onPress={() => setOpen(true)}>
        {t("Edit profile", "编辑资料")}
      </Button>
      <Sheet closeLabel={t("Close", "关闭")} open={open} onOpenChange={setOpen}>
        <Input
          label={t("Display name", "显示名称")}
          value={value}
          onChangeText={setValue}
        />
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
