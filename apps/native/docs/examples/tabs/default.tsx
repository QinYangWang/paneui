import * as React from "react";
import { StyleSheet } from "react-native";
import { spacing } from "@paneui/tokens";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@paneui/ui-native";

export default function TabsExample() {
  const [tab, setTab] = React.useState("notes");
  return (
    <Tabs value={tab} onValueChange={setTab} style={styles.column}>
      <TabsList>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
      <TabsContent value="notes">
        <Text tone="muted">Notes from your last meeting.</Text>
      </TabsContent>
      <TabsContent value="tasks">
        <Text tone="muted">Three tasks are due this week.</Text>
      </TabsContent>
      <TabsContent value="files">
        <Text tone="muted">Shared files appear here.</Text>
      </TabsContent>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
});
