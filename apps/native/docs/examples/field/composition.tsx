import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Field, Textarea } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Field label={t("Team notes", "团队备注")} disabled>
        <Textarea defaultValue={t("Editing is paused.", "编辑已暂停。")} />
      </Field>
    </View>
  );
}
