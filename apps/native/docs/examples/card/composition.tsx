import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Card, CardHeader, CardContent, Text, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <Card>
        <CardHeader>
          <Text variant="title">{t("Join the workspace", "加入工作区")}</Text>
        </CardHeader>
        <CardContent>
          <Button onPress={() => setCount(count + 1)}>
            {count ? t("Joined", "已加入") : t("Accept invitation", "接受邀请")}
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
