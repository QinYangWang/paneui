import { StyleSheet, View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Avatar } from "@paneui/ui-native";

export default function AvatarExample() {
  return (
    <View style={[styles.row, { alignItems: "center" }]}>
      <Avatar
        name="Maya Chen"
        size="sm"
        src="https://picsum.photos/seed/maya/64"
      />
      <Avatar name="Leo Park" src="https://picsum.photos/seed/leo/96" />
      <Avatar name="Ana Ruiz" size="lg" />
      <Avatar
        name="Sam Ito"
        size="lg"
        src="https://invalid.example/photo.png"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
});
