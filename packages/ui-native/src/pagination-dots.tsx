import * as React from "react";
import { View, type ViewProps } from "react-native";
import { spacing } from "@paneui/tokens";
import { Pressable } from "react-native";
import { nativeControl } from "@paneui/tokens";
import { useTheme } from "./theme";
export type PaginationDotsProps = ViewProps & {
  count: number;
  value: number;
  onValueChange?: (value: number) => void;
  pageLabel: (page: number, count: number) => string;
  disabled?: boolean;
  size?: keyof typeof nativeControl;
};
export function PaginationDots({
  count,
  value,
  onValueChange,
  pageLabel,
  disabled = false,
  size = "default",
  style,
  ...props
}: PaginationDotsProps) {
  const { colors, radius } = useTheme();
  const [focused, setFocused] = React.useState<number | null>(null);
  const total = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  return (
    <View
      {...props}
      style={[{ flexDirection: "row", flexWrap: "wrap" }, style]}
    >
      {Array.from({ length: total }, (_, index) => (
        <Pressable
          key={index}
          accessibilityRole="button"
          accessibilityLabel={pageLabel(index + 1, total)}
          aria-current={value === index ? "page" : undefined}
          accessibilityState={{
            selected: value === index,
            disabled: disabled || !onValueChange,
          }}
          disabled={disabled || !onValueChange}
          onPress={() => onValueChange?.(index)}
          onFocus={() => setFocused(index)}
          onBlur={() => setFocused(null)}
          style={({ pressed }) => ({
            minWidth: nativeControl[size],
            minHeight: nativeControl[size],
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderRadius: radius.lg,
            borderColor: focused === index ? colors.ring : "transparent",
            backgroundColor: pressed ? colors.secondary : "transparent",
            opacity: disabled ? 0.64 : 1,
          })}
        >
          <View
            style={{
              width: value === index ? spacing.lg : spacing.sm,
              height: spacing.sm,
              borderRadius: radius.sm,
              backgroundColor:
                value === index ? colors.primary : colors.mutedForeground,
            }}
          />
        </Pressable>
      ))}
    </View>
  );
}
