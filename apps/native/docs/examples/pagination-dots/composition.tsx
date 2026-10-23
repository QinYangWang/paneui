import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { PaginationDots, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <Text>{t(`Step ${count + 1}`, `第 ${count + 1} 步`)}</Text>
      <PaginationDots
        count={3}
        value={count}
        onValueChange={setCount}
        pageLabel={(page, total) =>
          t(`Step ${page} of ${total}`, `第 ${page} 步，共 ${total} 步`)
        }
      />
    </View>
  );
}
