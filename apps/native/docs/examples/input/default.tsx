import * as React from "react";

import { CardContent, Input } from "@paneui/ui-native";

export default function Example() {
  const [email, setEmail] = React.useState("");
  return (
    <CardContent>
      <Input
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        description="Use the address you check most often."
      />
      <Input label="Project name" value="" error="Enter a project name." />
      <Input label="Workspace" value="Personal" editable={false} />
    </CardContent>
  );
}
