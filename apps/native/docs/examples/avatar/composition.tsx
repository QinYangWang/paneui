import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Avatar, List, ListItem } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <List>
        <ListItem
          title={t("Maya Chen", "陈晓")}
          leading={<Avatar name={t("Maya Chen", "陈晓")} />}
          description={t("Designer", "设计师")}
        />
        <ListItem
          title={t("Leo Park", "朴乐")}
          leading={<Avatar name={t("Leo Park", "朴乐")} />}
        />
      </List>
    </View>
  );
}
