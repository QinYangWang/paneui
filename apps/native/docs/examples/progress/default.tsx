import * as React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Progress } from "@paneui/ui-native";

export default function ProgressExample() {
  const [value, setValue] = React.useState(0.2);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) => (current >= 1 ? 0.2 : Math.min(current + 0.04, 1)));
    }, 120);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.column}>
      <Progress value={value} />
      <Progress value={0.4} />
      <Progress value={1} tone="success" />
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
});
