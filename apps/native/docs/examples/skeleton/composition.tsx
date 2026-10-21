import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Skeleton, Text, Button, Card } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <Card>
        {count ? (
          <Text>{t("Your project is ready.", "项目已就绪。")}</Text>
        ) : (
          <Skeleton />
        )}
        <Button onPress={() => setCount(count ? 0 : 1)}>
          {count ? t("Reload", "重新加载") : t("Show content", "显示内容")}
        </Button>
      </Card>
    </View>
  );
}
