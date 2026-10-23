import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Accordion, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <Accordion title={t("Delivery", "配送")}>
        <Text>{t("Arrives in three days.", "三天内送达。")}</Text>
      </Accordion>
    </View>
  );
}
