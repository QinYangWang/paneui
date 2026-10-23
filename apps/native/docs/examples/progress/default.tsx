import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Progress } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Progress label={t("Upload", "上传")} value={0.4} />
    </View>
  );
}
