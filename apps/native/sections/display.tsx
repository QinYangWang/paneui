import * as React from "react"
import { StyleSheet, View } from "react-native"
import { spacing } from "@paneui/tokens"
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Dialog,
  List,
  ListItem,
  Progress,
  Separator,
  Sheet,
  Skeleton,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  ToastProvider,
  useToast,
} from "@paneui/ui-native"

function BadgeExample() {
  return (
    <View style={styles.column}>
      <View style={styles.row}>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
      </View>
      <View style={styles.row}>
        <Badge variant="primary">New</Badge>
        <Badge variant="success">Paid</Badge>
        <Badge variant="warning">Due soon</Badge>
        <Badge variant="destructive">Overdue</Badge>
      </View>
    </View>
  )
}

function AvatarExample() {
  return (
    <View style={[styles.row, { alignItems: "center" }]}>
      <Avatar name="Maya Chen" size="sm" src="https://picsum.photos/seed/maya/64" />
      <Avatar name="Leo Park" src="https://picsum.photos/seed/leo/96" />
      <Avatar name="Ana Ruiz" size="lg" />
      <Avatar name="Sam Ito" size="lg" src="https://invalid.example/photo.png" />
    </View>
  )
}

function SeparatorExample() {
  return (
    <View style={styles.column}>
      <View>
        <Text>Inbox</Text>
        <Separator style={{ marginVertical: spacing.md }} />
        <Text>Archive</Text>
      </View>
      <View style={[styles.row, { alignItems: "center", minHeight: spacing["3xl"] }]}>
        <Text variant="supporting" tone="muted">Left pane</Text>
        <Separator orientation="vertical" style={{ marginHorizontal: spacing.md, alignSelf: "stretch" }} />
        <Text variant="supporting" tone="muted">Right pane</Text>
      </View>
    </View>
  )
}

function AlertExample() {
  return (
    <View style={styles.column}>
      <Alert variant="info" title="Verify your email" description="Check your inbox for a confirmation link." />
      <Alert variant="success" title="Payment sent" description="Maya received your payment." />
      <Alert variant="warning" title="Storage almost full" description="Remove old backups to free up space." />
      <Alert variant="destructive" title="Payment failed" description="Check your card details and try again." />
    </View>
  )
}

function SkeletonExample() {
  return (
    <View style={styles.column}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Skeleton circle width={spacing["3xl"]} height={spacing["3xl"]} />
        <View style={{ flex: 1, gap: spacing.sm }}>
          <Skeleton height={spacing.md} />
          <Skeleton height={spacing.md} width="70%" />
        </View>
      </View>
      <Skeleton height={spacing["2xl"]} />
    </View>
  )
}

function SpinnerExample() {
  return (
    <View style={[styles.row, { alignItems: "center" }]}>
      <Spinner />
      <Spinner size="large" />
      <Spinner tone="mutedForeground" />
    </View>
  )
}

function ProgressExample() {
  const [value, setValue] = React.useState(0.2)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) => (current >= 1 ? 0.2 : Math.min(current + 0.04, 1)))
    }, 120)
    return () => clearInterval(interval)
  }, [])
  return (
    <View style={styles.column}>
      <Progress value={value} />
      <Progress value={0.4} />
      <Progress value={1} tone="success" />
    </View>
  )
}

function TabsExample() {
  const [tab, setTab] = React.useState("notes")
  return (
    <Tabs value={tab} onValueChange={setTab} style={styles.column}>
      <TabsList>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
      <TabsContent value="notes">
        <Text tone="muted">Notes from your last meeting.</Text>
      </TabsContent>
      <TabsContent value="tasks">
        <Text tone="muted">Three tasks are due this week.</Text>
      </TabsContent>
      <TabsContent value="files">
        <Text tone="muted">Shared files appear here.</Text>
      </TabsContent>
    </Tabs>
  )
}

function ListExample() {
  const [presses, setPresses] = React.useState(0)
  return (
    <View style={styles.column}>
      <List>
        <ListItem title="Maya Chen" description="Product designer" leading={<Avatar name="Maya Chen" size="sm" />} trailing={<Badge variant="success">Active</Badge>} />
        <ListItem title="Leo Park" description="Engineer" leading={<Avatar name="Leo Park" size="sm" src="https://picsum.photos/seed/leo/64" />} trailing={<Badge>New</Badge>} />
        <ListItem title="Send reminder" description="Notifies everyone on the team." onPress={() => setPresses((count) => count + 1)} trailing={<Text variant="supporting" tone="muted">{`${presses} sent`}</Text>} />
      </List>
      <ListItem title="Standalone row" description="Sits outside a group." trailing={<Badge variant="outline">Draft</Badge>} />
    </View>
  )
}

function SheetExample() {
  const [open, setOpen] = React.useState(false)
  return (
    <View style={styles.column}>
      <ListItem title="Share file" description="Swipe down or tap outside to close." onPress={() => setOpen(true)} trailing={<Text variant="supporting" tone="muted">Sheet</Text>} />
      <Sheet open={open} onOpenChange={setOpen}>
        <Text variant="title">Share</Text>
        <List>
          <ListItem title="Copy link" onPress={() => setOpen(false)} />
          <ListItem title="Invite people" onPress={() => setOpen(false)} />
        </List>
      </Sheet>
    </View>
  )
}

function DialogExample() {
  const [open, setOpen] = React.useState(false)
  return (
    <View style={styles.column}>
      <ListItem title="Delete project" description="Asks before something irreversible." onPress={() => setOpen(true)} trailing={<Text variant="supporting" tone="muted">Dialog</Text>} />
      <Dialog open={open} onOpenChange={setOpen} title="Delete this project?" description="This removes the project and its files for everyone.">
        <Button variant="destructive" onPress={() => setOpen(false)}>Delete</Button>
        <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>
      </Dialog>
    </View>
  )
}

function ToastTriggers() {
  const { show } = useToast()
  return (
    <View style={styles.column}>
      <ListItem title="Save draft" onPress={() => show({ title: "Draft saved" })} />
      <ListItem title="Send invite" onPress={() => show({ title: "Invite sent", description: "Maya can now join the workspace.", variant: "success" })} />
      <ListItem title="Remove file" onPress={() => show({ title: "File removed", variant: "destructive" })} />
    </View>
  )
}

function ToastExample() {
  return (
    <ToastProvider>
      <ToastTriggers />
    </ToastProvider>
  )
}

export const displaySections: Record<string, () => React.ReactElement> = {
  Badge: BadgeExample,
  Avatar: AvatarExample,
  Separator: SeparatorExample,
  Alert: AlertExample,
  Skeleton: SkeletonExample,
  Spinner: SpinnerExample,
  Progress: ProgressExample,
  Tabs: TabsExample,
  List: ListExample,
  Sheet: SheetExample,
  Dialog: DialogExample,
  Toast: ToastExample,
}

const styles = StyleSheet.create({
  column: { gap: spacing.lg },
  row: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
})
