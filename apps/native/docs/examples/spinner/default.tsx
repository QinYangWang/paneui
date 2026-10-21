import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Spinner } from "@paneui/ui-native";

export default function SpinnerExample() {
  return (
    <View style={[styles.row, { alignItems: "center" }]}>
      <Spinner />
      <Spinner size="large" />
      <Spinner tone="mutedForeground" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
});
