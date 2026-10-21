import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Alert } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Alert title={t("Changes saved", "更改已保存")} />
    </View>
  );
}
