import * as React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Button, Dialog, ListItem, Text } from "@paneui/ui-native";

export default function DialogExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <View style={styles.column}>
      <ListItem
        title="Delete project"
        description="Asks before something irreversible."
        onPress={() => setOpen(true)}
        trailing={
          <Text variant="supporting" tone="muted">
            Dialog
          </Text>
        }
      />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this project?"
        description="This removes the project and its files for everyone."
      >
        <Button variant="destructive" onPress={() => setOpen(false)}>
          Delete
        </Button>
        <Button variant="ghost" onPress={() => setOpen(false)}>
          Cancel
        </Button>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
});
