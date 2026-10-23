import * as React from "react";
import { View, type ViewProps } from "react-native";
import { nativeControl, spacing } from "@paneui/tokens";
import { Button } from "./button";
import { useFormValue } from "./field";
export type AccordionProps = ViewProps & {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  size?: keyof typeof nativeControl;
};
export function Accordion({
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  size = "default",
  style,
  ...props
}: AccordionProps) {
  const [expanded, change] = useFormValue(open, defaultOpen, onOpenChange);
  const id = React.useId();
  return (
    <View {...props} style={[{ gap: spacing.sm }, style]}>
      <Button
        size={size}
        variant="secondary"
        accessibilityLabel={title}
        disabled={disabled}
        accessibilityState={{ expanded }}
        aria-expanded={expanded}
        aria-controls={expanded ? id : undefined}
        onPress={() => change(!expanded)}
      >{`${title} ${expanded ? "−" : "+"}`}</Button>
      {expanded ? (
        <View nativeID={id} style={{ paddingHorizontal: spacing.md }}>
          {children}
        </View>
      ) : null}
    </View>
  );
}
