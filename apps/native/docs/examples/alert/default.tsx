import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Alert } from "@paneui/ui-native";

export default function AlertExample() {
  return (
    <View style={styles.column}>
      <Alert
        variant="info"
        title="Verify your email"
        description="Check your inbox for a confirmation link."
      />
      <Alert
        variant="success"
        title="Payment sent"
        description="Maya received your payment."
      />
      <Alert
        variant="warning"
        title="Storage almost full"
        description="Remove old backups to free up space."
      />
      <Alert
        variant="destructive"
        title="Payment failed"
        description="Check your card details and try again."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
});
