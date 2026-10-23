import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Input, Button, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  const [value, setValue] = React.useState("");
  return (
    <View style={{ gap: spacing.md }}>
      <Input
        label={t("Display name", "显示名称")}
        value={value}
        onChangeText={setValue}
      />
      <Button onPress={() => setCount(count + 1)}>
        {t("Save profile", "保存资料")}
      </Button>
      <Text accessibilityLiveRegion="polite">
        {count > 0 ? t("Profile saved", "资料已保存") : ""}
      </Text>
    </View>
  );
}
