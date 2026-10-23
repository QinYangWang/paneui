import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Stat, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <Stat
        label={t("Notes created", "已创建笔记")}
        value={String(count)}
        description={t("This session", "本次会话")}
      />
      <Button onPress={() => setCount(count + 1)}>
        {t("Add note", "添加笔记")}
      </Button>
    </View>
  );
}
