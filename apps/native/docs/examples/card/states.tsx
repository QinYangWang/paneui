import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Card, CardHeader, CardContent, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Card>
        <CardHeader>
          <Text variant="title">{t("Weekly review", "每周回顾")}</Text>
          <Text tone="muted">
            {t("Prepare for the next meeting.", "为下次会议做准备。")}
          </Text>
        </CardHeader>
        <CardContent>
          <Text>
            {t(
              "Review open tasks with your team.",
              "与团队一起查看未完成任务。",
            )}
          </Text>
        </CardContent>
      </Card>
    </View>
  );
}
