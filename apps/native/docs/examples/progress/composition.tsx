import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Progress, Text, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <Progress
        label={t("File upload", "文件上传")}
        value={Math.min(count / 5, 1)}
      />
      <Text style={{ fontVariant: ["tabular-nums"] }}>
        {/* design-check-ignore tabular-nums -- Native fontVariant supplies tabular numerals. */}
        {Math.min(count * 20, 100)}%
      </Text>
      <Button
        onPress={() => setCount(Math.min(count + 1, 5))}
        disabled={count >= 5}
      >
        {t("Upload next file", "上传下一个文件")}
      </Button>
    </View>
  );
}
