import { View } from "react-native";
import { spacing } from "@paneui/tokens";
import { Tabs, TabsList, TabsTrigger, TabsContent, Text,  } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  return (
    <View style={{ gap: spacing.md }}>
      <Tabs defaultValue="notes">
        <TabsList>
          <TabsTrigger value="notes">{t("Notes", "备注")}</TabsTrigger>
          <TabsTrigger value="files">{t("Files", "文件")}</TabsTrigger>
        </TabsList>
        <TabsContent value="notes">
          <Text>{t("Meeting notes", "会议备注")}</Text>
        </TabsContent>
        <TabsContent value="files">
          <Text>{t("Shared files", "共享文件")}</Text>
        </TabsContent>
      </Tabs>
    </View>
  );
}
