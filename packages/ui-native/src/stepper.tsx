import * as React from "react";
import { View, type ViewProps } from "react-native";
import { spacing } from "@paneui/tokens";
import { Text } from "./text";
import { nativeControl } from "@paneui/tokens";
import { Button } from "./button";
import { useFormValue } from "./field";
export type StepperProps = ViewProps & {
  label: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: keyof typeof nativeControl;
  decrementLabel: string;
  incrementLabel: string;
};
export function Stepper({
  label,
  value,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  size = "default",
  decrementLabel,
  incrementLabel,
  style,
  ...props
}: StepperProps) {
  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    min > max ||
    !Number.isFinite(step) ||
    step <= 0
  )
    throw new Error("Stepper requires finite bounds and a positive step");
  const [current, change] = useFormValue(value, defaultValue, onValueChange);
  const count = Math.min(
    max,
    Math.max(min, Number.isFinite(current) ? current : min),
  );
  const update = (delta: number) =>
    change(
      Math.min(max, Math.max(min, Number((count + delta).toPrecision(12)))),
    );
  return (
    <View
      {...props}
      role="group"
      accessibilityLabel={props.accessibilityLabel ?? label}
      style={[{ gap: spacing.sm }, style]}
    >
      <Text>{label}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}
      >
        <Button
          size={size}
          variant="secondary"
          accessibilityLabel={decrementLabel}
          disabled={disabled || count <= min}
          onPress={() => update(-step)}
        >
          −
        </Button>
        <Text
          accessibilityLiveRegion="polite"
          style={{ fontVariant: ["tabular-nums"] }}
        >
          {String(count)}
        </Text>
        <Button
          size={size}
          variant="secondary"
          accessibilityLabel={incrementLabel}
          disabled={disabled || count >= max}
          onPress={() => update(step)}
        >
          +
        </Button>
      </View>
    </View>
  );
}
