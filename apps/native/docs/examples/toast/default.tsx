import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { ToastProvider, useToast, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  return (
    <View style={{ minHeight: spacing["3xl"] * 4 }}>
      <ToastProvider>
        <Actions />
      </ToastProvider>
    </View>
  );
}
function Actions() {
  const t = useExampleText();
  const { show } = useToast();
  return (
    <View style={{ gap: spacing.md }}>
      <Button onPress={() => show({ title: t("Draft saved", "草稿已保存") })}>
        {t("Save draft", "保存草稿")}
      </Button>
    </View>
  );
}
