import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { ListItem, Badge } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <ListItem
        title={t("Project brief", "项目简报")}
        description={t("Updated today", "今天更新")}
        trailing={<Badge>{t("Draft", "草稿")}</Badge>}
      />
    </View>
  );
}
