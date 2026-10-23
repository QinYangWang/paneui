import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Textarea, Field } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Field label={t("Notes", "备注")}>
        <Textarea placeholder={t("Write a note", "写下备注")} />
      </Field>
    </View>
  );
}
