import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Field, Textarea } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Field
        label={t("Notes", "备注")}
        description={t("Only your team can read this.", "仅团队成员可见。")}
      >
        <Textarea />
      </Field>
    </View>
  );
}
