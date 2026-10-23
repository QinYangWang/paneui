import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Spinner, Button, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [checked, setChecked] = React.useState(true);
  return (
    <View style={{ gap: spacing.md }}>
      {checked ? (
        <Spinner accessibilityLabel={t("Saving draft", "正在保存草稿")} />
      ) : (
        <Text>{t("Draft saved", "草稿已保存")}</Text>
      )}
      <Button onPress={() => setChecked(!checked)}>
        {checked ? t("Finish saving", "完成保存") : t("Save again", "再次保存")}
      </Button>
    </View>
  );
}
