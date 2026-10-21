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
  const { show } = useToast();
  return (
    <View style={{ gap: spacing.md }}>
      <Button
        onPress={() =>
          show({ title: t("Invite sent", "邀请已发送"), variant: "success" })
        }
      >
        {t("Send invite", "发送邀请")}
      </Button>
      <Button
        variant="destructive"
        onPress={() =>
          show({
            title: t("Upload failed", "上传失败"),
            description: t("Try again when connected.", "连接后请重试。"),
            variant: "destructive",
          })
        }
      >
        {t("Try upload", "尝试上传")}
      </Button>
    </View>
  );
}
