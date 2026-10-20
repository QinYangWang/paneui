import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Button, Card, CardContent, CardHeader, Input, Text, ThemeProvider, useTheme } from "@paneui/ui-native"
import { spacing, type ColorScheme } from "@paneui/tokens"

import { WebDocsLink } from "./web-docs-link"

const components = ["Button", "Card", "Input", "Text"] as const
type Component = (typeof components)[number]

function Examples({ component }: { component: Component }) {
  const [presses, setPresses] = React.useState(0)
  const [email, setEmail] = React.useState("")
  if (component === "Button") return (
    <CardContent>
      <View style={styles.wrap}>
        <Button onPress={() => setPresses((value) => value + 1)}>Continue</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="ghost">Cancel</Button>
        <Button disabled>Unavailable</Button>
      </View>
      <Text variant="supporting" tone="muted" accessibilityLiveRegion="polite">{`Button pressed ${presses} times`}</Text>
      <View style={styles.wrap}>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </View>
    </CardContent>
  )
  if (component === "Card") return (
    <Card>
      <CardHeader>
        <Text variant="title">Weekend plans</Text>
        <Text tone="muted">Make room for something new.</Text>
      </CardHeader>
      <CardContent>
        <Text>Keep your notes and ideas together.</Text>
        <Button onPress={() => setPresses((value) => value + 1)}>{presses ? "Plan saved" : "Save plan"}</Button>
      </CardContent>
    </Card>
  )
  if (component === "Input") return (
    <CardContent>
      <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" description="Use the address you check most often." />
      <Input label="Project name" value="" error="Enter a project name." />
      <Input label="Workspace" value="Personal" editable={false} />
    </CardContent>
  )
  return (
    <CardContent>
      <Text variant="heading">Make it yours.</Text>
      <Text variant="title">A place for your ideas</Text>
      <Text>Text follows the system font settings.</Text>
      <Text variant="supporting" tone="muted">Supporting text adds context.</Text>
      <Text variant="caption" tone="muted">Updated today</Text>
    </CardContent>
  )
}

function Showcase() {
  const { colors, scheme } = useTheme()
  const [component, setComponent] = React.useState<Component>("Button")
  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.background }]}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.page}>
          <View style={styles.header}>
            <Text variant="heading" accessibilityRole="header">paneui Native</Text>
            <Text tone="muted">Components for your next app.</Text>
            <WebDocsLink />
          </View>
          <View style={styles.wrap} accessibilityLabel="Components">
            {components.map((name) => <Button key={name} variant={component === name ? "secondary" : "ghost"} accessibilityState={{ selected: component === name }} onPress={() => setComponent(name)}>{name}</Button>)}
          </View>
          <Card>
            <CardHeader>
              <Text variant="title" accessibilityRole="header">{component}</Text>
            </CardHeader>
            <Examples key={component} component={component} />
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function ThemeControls({ mode, setMode }: { mode: ColorScheme; setMode: (mode: ColorScheme) => void }) {
  const { colors } = useTheme()
  return <SafeAreaView edges={["bottom"]} style={[styles.themeControls, { backgroundColor: colors.background }]}><Button variant="ghost" onPress={() => setMode(mode === "light" ? "dark" : "light")}>{mode === "light" ? "Switch to dark mode" : "Switch to light mode"}</Button></SafeAreaView>
}

export default function App() {
  const [mode, setMode] = React.useState<ColorScheme>("light")
  return <SafeAreaProvider><ThemeProvider mode={mode}><Showcase /><ThemeControls mode={mode} setMode={setMode} /></ThemeProvider></SafeAreaProvider>
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  page: { padding: spacing.xl, gap: spacing.xl, width: "100%", maxWidth: 880, alignSelf: "center" },
  header: { gap: spacing.sm },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  themeControls: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
})
