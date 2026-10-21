import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { AvatarGroup, Text } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();

  return (
    <View style={{ gap: spacing.md }}>
      <Text variant="title">{t("Reviewers", "审核成员")}</Text>
      <AvatarGroup
        size="lg"
        people={[{ name: t("Maya Chen", "陈晓") }]}
        overflowLabel={(n) => t(`${n} more people`, `另外 ${n} 人`)}
      />
    </View>
  );
}
