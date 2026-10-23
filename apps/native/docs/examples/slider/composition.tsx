import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Slider, Field, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [size, setSize] = React.useState(16);
  return (
    <View style={{ gap: spacing.md }}>
      <Field label={t("Text size", "字号")}>
        <Slider
          min={12}
          max={24}
          step={2}
          value={size}
          onValueChange={setSize}
        />
      </Field>
      <Text>{size}</Text>
    </View>
  );
}
