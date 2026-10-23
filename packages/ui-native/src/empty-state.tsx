import * as React from "react";
import { View, type ViewProps } from "react-native";
import { spacing } from "@paneui/tokens";
import { Text } from "./text";
export type EmptyStateProps = ViewProps & {
  title: string;
  description?: string;
  children?: React.ReactNode;
};
export function EmptyState({
  title,
  description,
  children,
  style,
  ...props
}: EmptyStateProps) {
  return (
    <View
      {...props}
      style={[
        { padding: spacing.xl, gap: spacing.md, alignItems: "center" },
        style,
      ]}
    >
      <Text
        variant="title"
        accessibilityRole="header"
        style={{ textAlign: "center" }}
      >
        {title}
      </Text>
      {description ? (
        <Text tone="muted" style={{ textAlign: "center" }}>
          {description}
        </Text>
      ) : null}
      {children}
    </View>
  );
}
