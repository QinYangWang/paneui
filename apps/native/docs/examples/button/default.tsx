import * as React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Button, CardContent, Text } from "@paneui/ui-native";

export default function Example() {
  const [presses, setPresses] = React.useState(0);
  return (
    <CardContent>
      <View style={styles.wrap}>
        <Button onPress={() => setPresses((value) => value + 1)}>
          Continue
        </Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="ghost">Cancel</Button>
        <Button disabled>Unavailable</Button>
      </View>
      <Text
        variant="supporting"
        tone="muted"
        accessibilityLiveRegion="polite"
      >{`Button pressed ${presses} times`}</Text>
      <View style={styles.wrap}>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </View>
    </CardContent>
  );
}
const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
});
