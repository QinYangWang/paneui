import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Alert, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <Alert
        variant={count ? "success" : "destructive"}
        title={
          count
            ? t("Upload finished", "上传完成")
            : t("Upload failed", "上传失败")
        }
        description={t(
          "Keep this page open until the upload finishes.",
          "上传完成前请保持页面打开。",
        )}
      />
      <Button onPress={() => setCount(count + 1)}>{t("Retry", "重试")}</Button>
    </View>
  );
}
