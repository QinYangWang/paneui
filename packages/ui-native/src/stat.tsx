import * as React from "react";
import { View, type ViewProps } from "react-native";
import { spacing } from "@paneui/tokens";
import { Text } from "./text";
import { Card, CardContent } from "./card";
export type StatProps = ViewProps & {
  label: string;
  value: string;
  description?: string;
};
export function Stat({ label, value, description, ...props }: StatProps) {
  return (
    <Card {...props}>
      <CardContent>
        <View style={{ gap: spacing.xs }}>
          <Text tone="muted" variant="supporting">
            {label}
          </Text>
          <Text variant="heading" style={{ fontVariant: ["tabular-nums"] }}>
            {value}
          </Text>
          {description ? (
            <Text tone="muted" variant="supporting">
              {description}
            </Text>
          ) : null}
        </View>
      </CardContent>
    </Card>
  );
}
