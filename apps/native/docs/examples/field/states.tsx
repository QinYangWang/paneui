import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Field, Checkbox } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Field
        label={t("Agreement", "协议")}
        required
        error={t("Accept the agreement to continue.", "请同意协议后继续。")}
      >
        <Checkbox label={t("I agree", "我同意")} />
      </Field>
    </View>
  );
}
