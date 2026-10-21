import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Badge } from "@paneui/ui-native";

export default function BadgeExample() {
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
      </View>
      <View style={styles.row}>
        <Badge variant="primary">New</Badge>
        <Badge variant="success">Paid</Badge>
        <Badge variant="warning">Due soon</Badge>
        <Badge variant="destructive">Overdue</Badge>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
});
