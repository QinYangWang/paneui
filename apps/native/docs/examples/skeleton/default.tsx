import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Skeleton } from "@paneui/ui-native";

export default function SkeletonExample() {
  return (
    <View style={styles.column}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Skeleton circle width={spacing["3xl"]} height={spacing["3xl"]} />
        <View style={{ flex: 1, gap: spacing.sm }}>
          <Skeleton height={spacing.md} />
          <Skeleton height={spacing.md} width="70%" />
        </View>
      </View>
      <Skeleton height={spacing["2xl"]} />
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
});
