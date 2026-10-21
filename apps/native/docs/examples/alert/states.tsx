import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Alert } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Alert variant="success" title={t("Upload finished", "上传完成")} />
      <Alert
        variant="warning"
        title={t("Storage almost full", "存储空间即将用尽")}
      />
      <Alert variant="destructive" title={t("Upload failed", "上传失败")} />
    </View>
  );
}
