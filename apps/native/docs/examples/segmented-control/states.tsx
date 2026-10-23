import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { SegmentedControl } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <SegmentedControl
        label={t("Workspace", "工作区")}
        options={[
          { value: "personal", label: t("Personal", "个人") },
          { value: "team", label: t("Team", "团队") },
          { value: "archive", label: t("Archive", "归档"), disabled: true },
        ]}
        defaultValue="team"
        disabled
      />
    </View>
  );
}
