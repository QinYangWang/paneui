import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Skeleton } from "@paneui/ui-native";
export default function Example() {
  return (
    <View style={{ gap: spacing.md }}>
      <Skeleton circle width={spacing["3xl"]} height={spacing["3xl"]} />
      <Skeleton height={spacing.md} />
      <Skeleton width="70%" height={spacing.md} />
    </View>
  );
}
