import { CardContent, Text } from "@paneui/ui-native";

export default function Example() {
  return (
    <CardContent>
      <Text variant="heading">Make it yours.</Text>
      <Text variant="title">A place for your ideas</Text>
      <Text>Text follows the system font settings.</Text>
      <Text variant="supporting" tone="muted">
        Supporting text adds context.
      </Text>
      <Text variant="caption" tone="muted">
        Updated today
      </Text>
    </CardContent>
  );
}
