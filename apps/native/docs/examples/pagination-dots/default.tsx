import * as React from "react";
import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { PaginationDots } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const [count, setCount] = React.useState(0);
  return (
    <View style={{ gap: spacing.md }}>
      <PaginationDots
        count={4}
        value={count}
        onValueChange={setCount}
        pageLabel={(page, total) =>
          t(`Page ${page} of ${total}`, `第 ${page} 页，共 ${total} 页`)
        }
      />
    </View>
  );
}
