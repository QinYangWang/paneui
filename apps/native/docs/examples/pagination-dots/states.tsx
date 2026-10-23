import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { PaginationDots } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <PaginationDots
        count={3}
        value={1}
        disabled
        pageLabel={(page, total) =>
          t(`Page ${page} of ${total}`, `第 ${page} 页，共 ${total} 页`)
        }
      />
    </View>
  );
}
