import * as React from "react";
import { View, type ViewProps } from "react-native";
import { spacing } from "@paneui/tokens";
import { Button } from "./button";
import { useFormValue } from "./field";
import { nativeControl } from "@paneui/tokens";
export type ToggleGroupOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
export type ToggleGroupProps = ViewProps & {
  label: string;
  options: readonly ToggleGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  size?: keyof typeof nativeControl;
};
export function ToggleGroup({
  label,
  options,
  value,
  defaultValue = [],
  onValueChange,
  disabled = false,
  size = "default",
  style,
  ...props
}: ToggleGroupProps) {
  const [selected, change] = useFormValue(value, defaultValue, onValueChange);
  return (
    <View
      {...props}
      role="group"
      accessibilityLabel={props.accessibilityLabel ?? label}
      style={[
        { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
        style,
      ]}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          size={size}
          variant={selected.includes(option.value) ? "primary" : "secondary"}
          aria-pressed={selected.includes(option.value)}
          accessibilityState={{ selected: selected.includes(option.value) }}
          disabled={disabled || option.disabled}
          onPress={() =>
            change(
              selected.includes(option.value)
                ? selected.filter((item) => item !== option.value)
                : [...selected, option.value],
            )
          }
        >
          {option.label}
        </Button>
      ))}
    </View>
  );
}
