import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Badge, List, ListItem } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <List>
        <ListItem
          title={t("Project brief", "项目简报")}
          trailing={<Badge variant="success">{t("Approved", "已批准")}</Badge>}
        />
      </List>
    </View>
  );
}
