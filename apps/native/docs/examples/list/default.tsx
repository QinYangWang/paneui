import * as React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Avatar, Badge, List, ListItem, Text } from "@paneui/ui-native";

export default function ListExample() {
  const [presses, setPresses] = React.useState(0);
  return (
    <View style={styles.column}>
      <List>
        <ListItem
          title="Maya Chen"
          description="Product designer"
          leading={<Avatar name="Maya Chen" size="sm" />}
          trailing={<Badge variant="success">Active</Badge>}
        />
        <ListItem
          title="Leo Park"
          description="Engineer"
          leading={
            <Avatar
              name="Leo Park"
              size="sm"
              src="https://picsum.photos/seed/leo/64"
            />
          }
          trailing={<Badge>New</Badge>}
        />
        <ListItem
          title="Send reminder"
          description="Notifies everyone on the team."
          onPress={() => setPresses((count) => count + 1)}
          trailing={
            <Text variant="supporting" tone="muted">{`${presses} sent`}</Text>
          }
        />
      </List>
      <ListItem
        title="Standalone row"
        description="Sits outside a group."
        trailing={<Badge variant="outline">Draft</Badge>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
});
