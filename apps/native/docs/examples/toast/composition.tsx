import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { ToastProvider, useToast, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  return (
    <ToastProvider>
      <Actions />
    </ToastProvider>
  );
}
function Actions() {
  const t = useExampleText();
  const { show, dismiss } = useToast();
  return (
    <View style={{ gap: spacing.md }}>
      <Button
        onPress={() =>
          show({ title: t("Syncing files", "正在同步文件"), duration: 10000 })
        }
      >
        {t("Start sync", "开始同步")}
      </Button>
      <Button variant="secondary" onPress={dismiss}>
        {t("Dismiss message", "关闭消息")}
      </Button>
    </View>
  );
}
