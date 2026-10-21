import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Separator, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Text>{t("Inbox", "收件箱")}</Text>
      <Separator />
      <Text>{t("Archive", "归档")}</Text>
    </View>
  );
}
