import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { RadioGroup, RadioGroupItem } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <RadioGroup
        label={t("Delivery", "通知方式")}
        defaultValue="inbox"
        disabled
      >
        <RadioGroupItem value="email" label={t("Email", "邮件")} />
        <RadioGroupItem value="inbox" label={t("Inbox", "收件箱")} />
        <RadioGroupItem
          value="sms"
          label={t("Text message", "短信")}
          disabled
        />
      </RadioGroup>
    </View>
  );
}
