import { ThemeProvider, useTheme, Card, Text, Button } from "@paneui/ui-native";
import { useExampleText } from "../../language";
export default function Example() {
  const t = useExampleText();
  const { style } = useTheme();
  return (
    <ThemeProvider style={style}>
      <Card>
        <Text variant="title">{t("System theme", "系统主题")}</Text>
        <Button>{t("Continue", "继续")}</Button>
      </Card>
    </ThemeProvider>
  );
}
