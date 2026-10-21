import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Switch } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Switch label={t("Notifications", "通知")} />
    </View>
  );
}
