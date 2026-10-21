import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Checkbox, Field, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [checked, setChecked] = React.useState(true);
  return (
    <View style={{ gap: spacing.md }}>
      <Field label={t("Preferences", "偏好设置")}>
        <Checkbox
          label={t("Email updates", "邮件更新")}
          value={checked}
          onValueChange={(next) => setChecked(next === true)}
        />
      </Field>
      <Text>
        {checked
          ? t("Updates on", "更新已开启")
          : t("Updates off", "更新已关闭")}
      </Text>
    </View>
  );
}
