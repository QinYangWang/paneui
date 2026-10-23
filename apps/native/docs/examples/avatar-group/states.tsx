import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { AvatarGroup } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <AvatarGroup
        max={1}
        people={[
          { name: t("Maya Chen", "陈晓") },
          { name: t("Alex Lin", "林安") },
          { name: t("Sam Wu", "吴宁") },
        ]}
        overflowLabel={(n) => t(`${n} more people`, `另外 ${n} 人`)}
      />
    </View>
  );
}
