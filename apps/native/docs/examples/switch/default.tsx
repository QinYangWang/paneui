import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Switch } from "@paneui/ui-native";

export default function SwitchExample() {
  const [value, setValue] = React.useState(true);
  return (
    <View style={{ gap: spacing.sm }}>
      <Switch label="Notifications" value={value} onValueChange={setValue} />
      <Switch label="Sync" disabled />
    </View>
  );
}
