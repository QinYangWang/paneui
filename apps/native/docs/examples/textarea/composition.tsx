import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Textarea, Field } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [value, setValue] = React.useState("");
  return (
    <View style={{ gap: spacing.md }}>
      <Field
        label={t("Feedback", "反馈")}
        error={t("Add a reason before sending.", "发送前请填写原因。")}
      >
        <Textarea value={value} onValueChange={setValue} autoGrow={false} />
      </Field>
      <Field label={t("Previous feedback", "先前反馈")} disabled>
        <Textarea defaultValue={t("Ready for review.", "可以审核了。")} />
      </Field>
    </View>
  );
}
