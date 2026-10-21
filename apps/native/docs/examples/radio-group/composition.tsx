import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { RadioGroup, RadioGroupItem, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [value, setValue] = React.useState("email");
  return (
    <View style={{ gap: spacing.md }}>
      <RadioGroup
        label={t("Delivery", "通知方式")}
        value={value}
        onValueChange={setValue}
      >
        <RadioGroupItem value="email" label={t("Email", "邮件")} />
        <RadioGroupItem value="inbox" label={t("Inbox", "收件箱")} />
        <RadioGroupItem
          value="sms"
          label={t("Text message", "短信")}
          disabled
        />
      </RadioGroup>
      <Text>
        {value === "inbox"
          ? t("Sent to your inbox", "发送到收件箱")
          : t("Sent by email", "通过邮件发送")}
      </Text>
    </View>
  );
}
