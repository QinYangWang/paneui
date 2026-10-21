import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { List, ListItem } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <List>
        <ListItem title={t("Inbox", "收件箱")} />
        <ListItem title={t("Archive", "归档")} />
      </List>
    </View>
  );
}
