import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Stepper } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <Stepper
        label={t("Guests", "人数")}
        min={1}
        max={5}
        defaultValue={5}
        decrementLabel={t("Remove guest", "减少人数")}
        incrementLabel={t("Add guest", "增加人数")}
      />
      <Stepper
        label={t("Reserved seats", "预留座位")}
        defaultValue={2}
        disabled
        size="xs"
        decrementLabel={t("Remove seat", "减少座位")}
        incrementLabel={t("Add seat", "增加座位")}
      />
    </View>
  );
}
