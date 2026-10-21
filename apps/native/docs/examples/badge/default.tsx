import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Badge } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Badge>{t("Draft", "草稿")}</Badge>
    </View>
  );
}
