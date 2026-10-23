import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { ToggleGroup } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <ToggleGroup
        label={t("Days", "日期")}
        options={[
          { value: "mon", label: t("Monday", "周一") },
          { value: "fri", label: t("Friday", "周五") },
        ]}
      />
    </View>
  );
}
