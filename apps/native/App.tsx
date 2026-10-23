import { components as registry } from "./docs/registry";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Text,
  ThemeProvider,
  useTheme,
} from "@paneui/ui-native";
import { spacing, type ColorScheme } from "@paneui/tokens";

import { WebDocsLink } from "./web-docs-link";

const components = registry.map((entry) => entry.name);
type Component = string;

function Examples({ component }: { component: Component }) {
  const item = registry.find((entry) => entry.name === component);
  const Example = item?.examples[0].Example;
  if (!Example) return null;
  return ["Button", "Card", "Input", "Text"].includes(component) ? (
    <Example />
  ) : (
    <CardContent>
      <Example />
    </CardContent>
  );
}

function Showcase() {
  const { colors, scheme } = useTheme();
  const [component, setComponent] = React.useState<Component>("Button");
  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.background }]}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.page}
        >
          <View style={styles.header}>
            <Text variant="heading" accessibilityRole="header">
              PaneUI Native
            </Text>
            <Text tone="muted">Components for your next app.</Text>
            <WebDocsLink />
          </View>
          <View style={styles.wrap} accessibilityLabel="Components">
            {components.map((name) => (
              <Button
                key={name}
                variant={component === name ? "secondary" : "ghost"}
                accessibilityState={{ selected: component === name }}
                onPress={() => setComponent(name)}
              >
                {name}
              </Button>
            ))}
          </View>
          <Card>
            <CardHeader>
              <Text variant="title" accessibilityRole="header">
                {component}
              </Text>
            </CardHeader>
            <Examples key={component} component={component} />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ThemeControls({
  mode,
  setMode,
}: {
  mode: ColorScheme;
  setMode: (mode: ColorScheme) => void;
}) {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.themeControls, { backgroundColor: colors.background }]}
    >
      <Button
        variant="ghost"
        onPress={() => setMode(mode === "light" ? "dark" : "light")}
      >
        {mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </Button>
    </SafeAreaView>
  );
}

export default function App() {
  const [mode, setMode] = React.useState<ColorScheme>("light");
  return (
    <SafeAreaProvider>
      <ThemeProvider mode={mode}>
        <Showcase />
        <ThemeControls mode={mode} setMode={setMode} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  page: {
    padding: spacing.xl,
    gap: spacing.xl,
    width: "100%",
    maxWidth: 880,
    alignSelf: "center",
  },
  header: { gap: spacing.sm },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  themeControls: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
});
