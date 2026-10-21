import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Separator, Text } from "@paneui/ui-native";

export default function SeparatorExample() {
  return (
    <View style={styles.column}>
      <View>
        <Text>Inbox</Text>
        <Separator style={{ marginVertical: spacing.md }} />
        <Text>Archive</Text>
      </View>
      <View
        style={[
          styles.row,
          { alignItems: "center", minHeight: spacing["3xl"] },
        ]}
      >
        <Text variant="supporting" tone="muted">
          Left pane
        </Text>
        <Separator
          orientation="vertical"
          style={{ marginHorizontal: spacing.md, alignSelf: "stretch" }}
        />
        <Text variant="supporting" tone="muted">
          Right pane
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
});
