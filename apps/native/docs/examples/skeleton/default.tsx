import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Skeleton } from "@paneui/ui-native";
export default function Example() {
  return (
    <View style={{ gap: spacing.md }}>
      <Skeleton />
    </View>
  );
}
