import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Accordion, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <Accordion title={t("Returns", "退货")} defaultOpen>
        <Text>{t("Return within thirty days.", "三十天内可退货。")}</Text>
      </Accordion>
      <Accordion title={t("Unavailable", "暂不可用")} disabled>
        <Text>—</Text>
      </Accordion>
    </View>
  );
}
