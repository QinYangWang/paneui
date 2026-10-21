import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Avatar } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Avatar name={t("Maya Chen", "陈晓")} />
    </View>
  );
}
