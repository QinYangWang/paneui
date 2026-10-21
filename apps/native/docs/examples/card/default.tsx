import * as React from "react";

import { Button, Card, CardContent, CardHeader, Text } from "@paneui/ui-native";

export default function Example() {
  const [presses, setPresses] = React.useState(0);
  return (
    <Card>
      <CardHeader>
        <Text variant="title">Weekend plans</Text>
        <Text tone="muted">Make room for something new.</Text>
      </CardHeader>
      <CardContent>
        <Text>Keep your notes and ideas together.</Text>
        <Button onPress={() => setPresses((value) => value + 1)}>
          {presses ? "Plan saved" : "Save plan"}
        </Button>
      </CardContent>
    </Card>
  );
}
