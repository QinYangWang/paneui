import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { SegmentedControl, Field, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [value, setValue] = React.useState("personal");
  return (
    <View style={{ gap: spacing.md }}>
      <Field label={t("Workspace", "工作区")}>
        <SegmentedControl
          options={[
            { value: "personal", label: t("Personal", "个人") },
            { value: "team", label: t("Team", "团队") },
            { value: "archive", label: t("Archive", "归档"), disabled: true },
          ]}
          value={value}
          onValueChange={setValue}
        />
      </Field>
      <Text>
        {value === "team"
          ? t("Shared with your team", "与团队共享")
          : t("Only you", "仅自己可见")}
      </Text>
    </View>
  );
}
