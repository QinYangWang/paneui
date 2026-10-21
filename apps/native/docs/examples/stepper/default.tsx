import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Stepper } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <Stepper
        label={t("Quantity", "数量")}
        decrementLabel={t("Decrease quantity", "减少数量")}
        incrementLabel={t("Increase quantity", "增加数量")}
      />
    </View>
  );
}
