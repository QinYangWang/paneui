import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { ListItem, ToastProvider, useToast } from "@paneui/ui-native";

function ToastTriggers() {
  const { show } = useToast();
  return (
    <View style={styles.column}>
      <ListItem
        title="Save draft"
        onPress={() => show({ title: "Draft saved" })}
      />
      <ListItem
        title="Send invite"
        onPress={() =>
          show({
            title: "Invite sent",
            description: "Maya can now join the workspace.",
            variant: "success",
          })
        }
      />
      <ListItem
        title="Remove file"
        onPress={() => show({ title: "File removed", variant: "destructive" })}
      />
    </View>
  );
}

export default function ToastExample() {
  return (
    <ToastProvider>
      <ToastTriggers />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
});
