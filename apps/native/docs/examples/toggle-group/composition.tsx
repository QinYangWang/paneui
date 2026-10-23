import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { ToggleGroup, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <View style={{ gap: spacing.md }}>
      <ToggleGroup
        label={t("Reminders", "提醒")}
        size="sm"
        value={selected}
        onValueChange={setSelected}
        options={[
          { value: "email", label: t("Email", "邮件") },
          { value: "push", label: t("Push", "推送") },
        ]}
      />
      <Text accessibilityLiveRegion="polite">
        {t(`${selected.length} selected`, `已选择 ${selected.length} 项`)}
      </Text>
    </View>
  );
}
