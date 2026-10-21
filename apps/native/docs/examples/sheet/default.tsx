import * as React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { List, ListItem, Sheet, Text } from "@paneui/ui-native";

export default function SheetExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <View style={styles.column}>
      <ListItem
        title="Share file"
        description="Swipe down or tap outside to close."
        onPress={() => setOpen(true)}
        trailing={
          <Text variant="supporting" tone="muted">
            Sheet
          </Text>
        }
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <Text variant="title">Share</Text>
        <List>
          <ListItem title="Copy link" onPress={() => setOpen(false)} />
          <ListItem title="Invite people" onPress={() => setOpen(false)} />
        </List>
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
});
