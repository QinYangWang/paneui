import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Input } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Input
        label={t("Email", "邮箱")}
        defaultValue="invalid"
        error={t("Enter a valid email address.", "请输入有效的邮箱地址。")}
      />
      <Input
        label={t("Account", "账户")}
        value={t("Managed by your team", "由团队管理")}
        editable={false}
      />
    </View>
  );
}
