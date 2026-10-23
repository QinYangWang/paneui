import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Button, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <Button onPress={() => setCount(count + 1)}>
        {t("Continue", "继续")}
      </Button>
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
