import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Slider } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Slider label={t("Volume", "音量")} defaultValue={40} />
    </View>
  );
}
