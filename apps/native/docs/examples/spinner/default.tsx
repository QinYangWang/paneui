import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Spinner } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Spinner accessibilityLabel={t("Loading projects", "正在加载项目")} />
    </View>
  );
}
