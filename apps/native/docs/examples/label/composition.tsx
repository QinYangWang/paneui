import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Label, Input, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Label>{t("Shipping address", "收货地址")}</Label>
      <Input label={t("Street", "街道")} />
      <Text tone="muted">
        {t(
          "Use an address where you can receive parcels.",
          "请填写可接收包裹的地址。",
        )}
      </Text>
    </View>
  );
}
