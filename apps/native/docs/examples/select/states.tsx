import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Select } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Select
        closeLabel={t("Close", "关闭")}
        doneLabel={t("Done", "完成")}
        placeholder={t("Choose an option", "选择一个选项")}
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
