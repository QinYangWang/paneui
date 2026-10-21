import * as React from "react";
import { View, type TextInputInstance } from "react-native";
import { nativeControl, spacing } from "@paneui/tokens";
import { Input, type InputProps } from "./input";
import { Button } from "./button";
import { useFormValue } from "./field";
export type SearchFieldProps = Omit<
  InputProps,
  "value" | "defaultValue" | "onChangeText" | "ref"
> & {
  value?: string;
  defaultValue?: string;
  onChangeText?: (value: string) => void;
  clearLabel: string;
  size?: keyof typeof nativeControl;
};
export function SearchField({
  value,
  defaultValue = "",
  onChangeText,
  clearLabel,
  editable = true,
  size = "default",
  style,
  ...props
}: SearchFieldProps) {
  const input = React.useRef<TextInputInstance>(null);
  const [query, change] = useFormValue(value, defaultValue, onChangeText);
  return (
    <View style={{ gap: spacing.sm }}>
      <Input
        {...props}
        ref={input}
        style={[{ minHeight: nativeControl[size] }, style]}
        editable={editable}
        value={query}
        onChangeText={change}
        accessibilityRole="search"
        role="searchbox"
        returnKeyType="search"
      />
      {query ? (
        <Button
          size={size}
          variant="ghost"
          disabled={!editable}
          onPress={() => {
            change("");
            input.current?.focus();
          }}
        >
          {clearLabel}
        </Button>
      ) : null}
    </View>
  );
}
