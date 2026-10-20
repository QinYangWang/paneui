import { Linking } from "react-native"
import { Button } from "@paneui/ui-native"

export function WebDocsLink() {
  return <Button variant="ghost" onPress={() => { void Linking.openURL("https://paneui.dev") }}>Web docs</Button>
}
