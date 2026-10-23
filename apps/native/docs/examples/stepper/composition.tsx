import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Stepper, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <Stepper
        label={t("Quantity", "数量")}
        value={count}
        onValueChange={setCount}
        max={10}
        size="lg"
        decrementLabel={t("Decrease quantity", "减少数量")}
        incrementLabel={t("Increase quantity", "增加数量")}
      />
      <Text>{t(`${count} items`, `${count} 件`)}</Text>
    </View>
  );
}
