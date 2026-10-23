import * as React from "react";
import { View, type ViewProps } from "react-native";
import { spacing } from "@paneui/tokens";
import { Text } from "./text";
import { Avatar, type AvatarProps } from "./avatar";
export type AvatarGroupProps = ViewProps & {
  people: readonly { name: string; src?: string }[];
  max?: number;
  size?: AvatarProps["size"];
  overflowLabel: (count: number) => string;
};
export function AvatarGroup({
  people,
  max = 4,
  size = "default",
  overflowLabel,
  style,
  ...props
}: AvatarGroupProps) {
  const limit = Math.max(1, Math.floor(max) || 1);
  const remaining = Math.max(0, people.length - limit);
  return (
    <View
      {...props}
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: spacing.sm,
        },
        style,
      ]}
    >
      {people.slice(0, limit).map((person, index) => (
        <Avatar key={index} {...person} size={size} />
      ))}
      {remaining ? (
        <Text
          accessibilityLabel={overflowLabel(remaining)}
          style={{ fontVariant: ["tabular-nums"] }}
        >
          +{remaining}
        </Text>
      ) : null}
    </View>
  );
}
