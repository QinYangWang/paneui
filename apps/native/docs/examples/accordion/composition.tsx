import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Accordion, Switch } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [enabled, setEnabled] = React.useState(false);

  return (
    <View style={{ gap: spacing.md }}>
      <Accordion title={t("Notifications", "通知")}>
        <Switch
          label={t("Email updates", "邮件更新")}
          value={enabled}
          onValueChange={setEnabled}
        />
      </Accordion>
    </View>
  );
}
