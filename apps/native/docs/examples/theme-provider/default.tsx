import { ThemeProvider, useTheme, Card, Text, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const { style } = useTheme();
  return (
    <ThemeProvider style={style} mode="light">
      <Card>
        <Text variant="title">{t("Light theme", "浅色主题")}</Text>
        <Button>{t("Continue", "继续")}</Button>
      </Card>
    </ThemeProvider>
  );
}
