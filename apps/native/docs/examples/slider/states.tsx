import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Slider } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Slider
        label={t("Rating", "评分")}
        min={1}
        max={5}
        step={1}
        defaultValue={3}
      />
      <Slider
        label={t("Locked volume", "已锁定音量")}
        defaultValue={60}
        disabled
      />
    </View>
  );
}
