import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Stat } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <Stat
        label={t("Weekly total", "本周总计")}
        value="—"
        description={t("Waiting for data", "等待数据")}
      />
    </View>
  );
}
