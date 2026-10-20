"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { CreditCardIcon, DownloadIcon, MailIcon, PlusIcon, TrashIcon, UploadIcon, UsersIcon } from "@paneui/ui/icons"
import { AccentPicker } from "@paneui/ui/components/accent-picker"
import { Avatar, AvatarFallback } from "@paneui/ui/components/avatar"
import { Badge } from "@paneui/ui/components/badge"
import { Button } from "@paneui/ui/components/button"
import { DataTable, DataTableRowActions, type DataTableColumn } from "@paneui/ui/components/data-table"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@paneui/ui/components/dialog"
import { Field, FieldControl, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@paneui/ui/components/field"
import { IconChip } from "@paneui/ui/components/icon-chip"
import { Input } from "@paneui/ui/components/input"
import { MenuItem, MenuSeparator } from "@paneui/ui/components/menu"
import { PasswordInput } from "@paneui/ui/components/password-input"
import { Radio, RadioGroup } from "@paneui/ui/components/radio"
import { SegmentedControl, SegmentedControlItem } from "@paneui/ui/components/segmented-control"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@paneui/ui/components/select"
import {
  SettingsFooterNote,
  SettingsGroup,
  SettingsGroupFooter,
  SettingsRow,
  SettingsRowControl,
  SettingsRowDescription,
  SettingsRowText,
  SettingsRowTitle,
  SettingsSection,
  SettingsSectionDescription,
  SettingsSectionHeader,
  SettingsSectionTitle,
} from "@paneui/ui/components/settings-section"
import { Switch } from "@paneui/ui/components/switch"
import { Table, type TableColumn } from "@paneui/ui/components/table"
import { Textarea } from "@paneui/ui/components/textarea"
import { useThemeToggle } from "@paneui/ui/components/theme-toggle"
import { useToast } from "@paneui/ui/components/toast"
import { UsageMeter } from "@paneui/ui/components/usage-meter"

import { signOut, useSession } from "../../lib/auth"
import {
  billing,
  billingInvoices,
  demoUser,
  members as seedMembers,
  notificationGroups,
  plans,
  roles,
  type Invoice,
  type Member,
  type PlanId,
  type Role,
} from "../../lib/data"
import { routes, useHref } from "../../lib/routes"
import { initials } from "../providers"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const timezones = ["America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Berlin", "Asia/Tokyo", "Asia/Taipei", "Australia/Sydney"]

/* ───────────────────────── Profile ───────────────────────── */

/** `/dashboard/settings` */
export function ProfileSettings() {
  const toast = useToast()
  const { user } = useSession()
  const initial = React.useMemo(
    () => ({ name: user?.name ?? demoUser.name, title: demoUser.title, bio: demoUser.bio, timezone: demoUser.timezone }),
    [user?.name]
  )
  const [values, setValues] = React.useState(initial)
  const [saved, setSaved] = React.useState(initial)
  const [error, setError] = React.useState<string>()
  const dirty = JSON.stringify(values) !== JSON.stringify(saved)
  const set = <K extends keyof typeof values>(k: K, v: (typeof values)[K]) => setValues((s) => ({ ...s, [k]: v }))

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (!values.name.trim()) return setError("Your name can't be empty.")
        setError(undefined)
        setSaved(values)
        toast.add({ title: "Profile saved", type: "success" })
      }}
      className="flex flex-col gap-10"
    >
      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Profile</SettingsSectionTitle>
          <SettingsSectionDescription>How you appear to your team in sessions, reviews and approvals.</SettingsSectionDescription>
        </SettingsSectionHeader>
        <SettingsGroup>
          <SettingsRow>
            <div className="flex items-center gap-4">
              <Avatar size="xl">
                <AvatarFallback>{initials(values.name || "?")}</AvatarFallback>
              </Avatar>
              <SettingsRowText>
                <SettingsRowTitle>Photo</SettingsRowTitle>
                <SettingsRowDescription>PNG or JPG, at least 256 × 256.</SettingsRowDescription>
              </SettingsRowText>
            </div>
            <SettingsRowControl>
              <Button variant="secondary" size="sm" type="button" onClick={() => toast.add({ title: "Upload a photo", description: "Wire this to your storage." })}>
                <UploadIcon data-icon="inline-start" />
                Upload
              </Button>
              <Button variant="ghost" size="sm" type="button">
                Remove
              </Button>
            </SettingsRowControl>
          </SettingsRow>
          <div className="grid grid-cols-1 gap-4 border-t border-border p-4 sm:grid-cols-2">
            <Field invalid={!!error}>
              <FieldLabel>Full name</FieldLabel>
              <Input
                value={values.name}
                autoComplete="name"
                onChange={(e) => {
                  set("name", e.target.value)
                  if (error && e.target.value.trim()) setError(undefined)
                }}
              />
              <FieldError>{error}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Job title</FieldLabel>
              <Input value={values.title} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel>Bio</FieldLabel>
              <FieldControl render={<Textarea rows={3} maxLength={160} />} value={values.bio} onValueChange={(v) => set("bio", String(v))} />
              <FieldDescription>{160 - values.bio.length} characters left. Shown on your reviews.</FieldDescription>
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel>Time zone</FieldLabel>
              <Select value={values.timezone} onValueChange={(v) => set("timezone", String(v))}>
                <SelectTrigger className="sm:w-72">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>Used for digests and quiet hours.</FieldDescription>
            </Field>
          </div>
          <SettingsGroupFooter>
            <SettingsFooterNote>{dirty ? "You have unsaved changes." : "All changes saved."}</SettingsFooterNote>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" type="button" disabled={!dirty} onClick={() => setValues(saved)}>
                Cancel
              </Button>
              <Button size="sm" type="submit" disabled={!dirty}>
                Save changes
              </Button>
            </div>
          </SettingsGroupFooter>
        </SettingsGroup>
      </SettingsSection>
    </form>
  )
}

/* ───────────────────────── Account ───────────────────────── */

/** `/dashboard/settings/account`: email, password, danger zone. */
export function AccountSettings() {
  const toast = useToast()
  const router = useRouter()
  const href = useHref()
  const { user } = useSession()
  const [email, setEmail] = React.useState(user?.email ?? demoUser.email)
  const [emailError, setEmailError] = React.useState<string>()
  const [pw, setPw] = React.useState({ current: "", next: "", confirm: "" })
  const [pwErrors, setPwErrors] = React.useState<Partial<Record<keyof typeof pw, string>>>({})
  const [twoFactor, setTwoFactor] = React.useState(true)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [confirmText, setConfirmText] = React.useState("")

  const checkPw = (v: typeof pw) => {
    const e: Partial<Record<keyof typeof pw, string>> = {}
    if (!v.current) e.current = "Enter your current password."
    if (v.next.length < 8) e.next = "Use at least 8 characters."
    if (v.confirm !== v.next) e.confirm = "Passwords don't match."
    return e
  }

  return (
    <>
      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Email</SettingsSectionTitle>
          <SettingsSectionDescription>Where we send sign-in links, receipts and alerts.</SettingsSectionDescription>
        </SettingsSectionHeader>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            if (!EMAIL.test(email.trim())) return setEmailError("That doesn't look like an email address.")
            setEmailError(undefined)
            toast.add({ title: "Check your inbox", description: `We sent a confirmation link to ${email}.`, type: "success" })
          }}
        >
          <SettingsGroup>
            <div className="p-4">
              <Field invalid={!!emailError}>
                <FieldLabel>Email address</FieldLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="sm:max-w-sm" />
                <FieldError>{emailError}</FieldError>
                <FieldDescription>Changing it sends a confirmation link to the new address.</FieldDescription>
              </Field>
            </div>
            <SettingsGroupFooter>
              <Button size="sm" type="submit">
                Update email
              </Button>
            </SettingsGroupFooter>
          </SettingsGroup>
        </form>
      </SettingsSection>

      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Password and security</SettingsSectionTitle>
          <SettingsSectionDescription>Use a password you don&apos;t use anywhere else.</SettingsSectionDescription>
        </SettingsSectionHeader>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            const found = checkPw(pw)
            setPwErrors(found)
            if (Object.keys(found).length) return
            setPw({ current: "", next: "", confirm: "" })
            toast.add({ title: "Password updated", type: "success" })
          }}
        >
          <SettingsGroup>
            <FieldGroup className="p-4 sm:max-w-sm">
              {(
                [
                  ["current", "Current password", "current-password"],
                  ["next", "New password", "new-password"],
                  ["confirm", "Confirm new password", "new-password"],
                ] as const
              ).map(([k, label, ac]) => (
                <Field key={k} invalid={!!pwErrors[k]}>
                  <FieldLabel>{label}</FieldLabel>
                  <PasswordInput
                    autoComplete={ac}
                    value={pw[k]}
                    onChange={(e) => {
                      const next = { ...pw, [k]: e.target.value }
                      setPw(next)
                      if (pwErrors[k]) setPwErrors((er) => ({ ...er, [k]: checkPw(next)[k] }))
                    }}
                  />
                  <FieldError>{pwErrors[k]}</FieldError>
                </Field>
              ))}
            </FieldGroup>
            <SettingsRow render={<label />} className="cursor-pointer">
              <SettingsRowText>
                <SettingsRowTitle>Two-factor authentication</SettingsRowTitle>
                <SettingsRowDescription>Ask for a code from your authenticator app at sign-in.</SettingsRowDescription>
              </SettingsRowText>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </SettingsRow>
            <SettingsGroupFooter>
              <Button size="sm" type="submit">
                Update password
              </Button>
            </SettingsGroupFooter>
          </SettingsGroup>
        </form>
      </SettingsSection>

      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Danger zone</SettingsSectionTitle>
          <SettingsSectionDescription>These can&apos;t be undone.</SettingsSectionDescription>
        </SettingsSectionHeader>
        <SettingsGroup tone="destructive">
          <SettingsRow>
            <SettingsRowText>
              <SettingsRowTitle>Sign out everywhere</SettingsRowTitle>
              <SettingsRowDescription>Ends every session on every device, including this one.</SettingsRowDescription>
            </SettingsRowText>
            <Button
              variant="secondary"
              size="sm"
              onClick={async () => {
                await signOut()
                router.push(href(routes.login))
              }}
            >
              Sign out all
            </Button>
          </SettingsRow>
          <SettingsRow>
            <SettingsRowText>
              <SettingsRowTitle>Delete account</SettingsRowTitle>
              <SettingsRowDescription>Removes your account, your sessions and your personal data. Workspace data stays with the workspace.</SettingsRowDescription>
            </SettingsRowText>
            <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
              Delete account
            </Button>
          </SettingsRow>
        </SettingsGroup>
      </SettingsSection>

      <Dialog
        open={deleteOpen}
        onOpenChange={(o) => {
          setDeleteOpen(o)
          if (!o) setConfirmText("")
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This permanently deletes {email} and signs you out. Type <strong className="font-medium text-foreground">delete my account</strong> to confirm.
            </DialogDescription>
          </DialogHeader>
          <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} aria-label="Confirmation" placeholder="delete my account" />
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button
              variant="destructive"
              disabled={confirmText.trim().toLowerCase() !== "delete my account"}
              onClick={async () => {
                await signOut()
                router.push(href(routes.home))
              }}
            >
              Delete account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

/* ───────────────────────── Billing ───────────────────────── */

const invoiceColumns: TableColumn<Invoice>[] = [
  { key: "id", header: "Invoice", width: 120, cell: (r) => <span className="font-mono text-xs">{r.id}</span> },
  { key: "date", header: "Date", width: 130 },
  { key: "description", header: "Description", width: 180, grow: true, cell: (r) => <span className="text-muted-foreground">{r.description}</span> },
  { key: "amount", header: "Amount", width: 100, align: "right", cell: (r) => <span className="font-medium tabular-nums">{usd.format(r.amount)}</span> },
  {
    key: "status",
    header: "Status",
    width: 90,
    cell: (r) => (
      <Badge size="sm" variant="success">
        {r.status}
      </Badge>
    ),
  },
  {
    key: "download",
    header: <span className="sr-only">Download</span>,
    width: 56,
    align: "right",
    cell: (r) => (
      <Button variant="ghost" size="icon-xs" aria-label={`Download ${r.id}`}>
        <DownloadIcon />
      </Button>
    ),
  },
]

/** `/dashboard/settings/billing`: plan, usage meters, payment method, invoices. */
export function BillingSettings() {
  const toast = useToast()
  const [planOpen, setPlanOpen] = React.useState(false)
  const [current, setCurrent] = React.useState<PlanId>("team")
  const [choice, setChoice] = React.useState<PlanId>("team")
  const [cycle, setCycle] = React.useState<"monthly" | "yearly">("yearly")
  const plan = plans.find((p) => p.id === current) ?? plans[1]
  const price = (cycle === "yearly" ? plan.yearly : plan.monthly) * billing.seats

  return (
    <>
      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Plan</SettingsSectionTitle>
          <SettingsSectionDescription>Billed {cycle} for {billing.seats} seats.</SettingsSectionDescription>
        </SettingsSectionHeader>
        <SettingsGroup>
          <SettingsRow>
            <div className="flex items-center gap-3">
              <IconChip tone="primary">
                <UsersIcon />
              </IconChip>
              <SettingsRowText>
                <SettingsRowTitle className="flex items-center gap-2">
                  {plan.name}
                  <Badge size="sm" variant="primary">
                    Current
                  </Badge>
                </SettingsRowTitle>
                <SettingsRowDescription>Renews on {billing.renews}</SettingsRowDescription>
              </SettingsRowText>
            </div>
            <SettingsRowControl>
              <span className="mr-2 text-ui-lg font-semibold tabular-nums">
                {usd.format(price)}
                <span className="text-ui font-normal text-muted-foreground"> / mo</span>
              </span>
              <Button size="sm" onClick={() => (setChoice(current), setPlanOpen(true))}>
                Change plan
              </Button>
            </SettingsRowControl>
          </SettingsRow>
          <div className="grid grid-cols-1 gap-5 border-t border-border p-4 sm:grid-cols-3">
            {billing.usage.map((u) => (
              <UsageMeter key={u.id} label={u.label} value={u.value} max={u.max} unit={u.unit} description={u.description} />
            ))}
          </div>
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Payment method</SettingsSectionTitle>
        </SettingsSectionHeader>
        <SettingsGroup>
          <SettingsRow>
            <div className="flex items-center gap-3">
              <IconChip>
                <CreditCardIcon />
              </IconChip>
              <SettingsRowText>
                <SettingsRowTitle>
                  {billing.card.brand} ending in {billing.card.last4}
                </SettingsRowTitle>
                <SettingsRowDescription>Expires {billing.card.expires}</SettingsRowDescription>
              </SettingsRowText>
            </div>
            <Button variant="secondary" size="sm" onClick={() => toast.add({ title: "Update card", description: "Open your payment provider's portal here." })}>
              Update
            </Button>
          </SettingsRow>
          <SettingsRow>
            <SettingsRowText>
              <SettingsRowTitle>Billing email</SettingsRowTitle>
              <SettingsRowDescription>billing@northwind.dev</SettingsRowDescription>
            </SettingsRowText>
            <Button variant="ghost" size="sm">
              <MailIcon data-icon="inline-start" />
              Change
            </Button>
          </SettingsRow>
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Invoices</SettingsSectionTitle>
        </SettingsSectionHeader>
        <Table aria-label="Invoices" data={billingInvoices} columns={invoiceColumns} getRowId={(r) => r.id} rowHeight={44} height={40 + billingInvoices.length * 44} />
      </SettingsSection>

      <Dialog open={planOpen} onOpenChange={setPlanOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Change plan</DialogTitle>
            <DialogDescription>Changes apply now; we prorate the difference on your next invoice.</DialogDescription>
          </DialogHeader>
          <SegmentedControl value={cycle} onValueChange={(v) => setCycle(v as "monthly" | "yearly")} aria-label="Billing cycle" className="self-start">
            <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
            <SegmentedControlItem value="yearly">Yearly · save 17%</SegmentedControlItem>
          </SegmentedControl>
          <RadioGroup value={choice} onValueChange={(v) => setChoice(v as PlanId)} aria-label="Plan" className="gap-2">
            {plans.map((p) => (
              <label
                key={p.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl bg-card p-3 shadow-raised transition-[box-shadow,background-color] duration-150 hover:shadow-raised-hover has-data-checked:bg-primary/8 has-data-checked:ring-2 has-data-checked:ring-primary/50"
              >
                <Radio value={p.id} />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="flex items-center gap-2 font-medium">
                    {p.name}
                    {p.id === current && (
                      <Badge size="sm" variant="outline">
                        Current
                      </Badge>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.blurb}</span>
                </span>
                <span className="text-sm font-semibold tabular-nums">
                  {usd.format(cycle === "yearly" ? p.yearly : p.monthly)}
                  <span className="font-normal text-muted-foreground"> /seat</span>
                </span>
              </label>
            ))}
          </RadioGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button
              disabled={choice === current}
              onClick={() => {
                setCurrent(choice)
                setPlanOpen(false)
                toast.add({ title: `Switched to ${plans.find((p) => p.id === choice)?.name}`, type: "success" })
              }}
            >
              Confirm change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

/* ───────────────────────── Team ───────────────────────── */

/** `/dashboard/settings/team`: members table with roles, invite dialog. */
export function TeamSettings() {
  const toast = useToast()
  const [list, setList] = React.useState<Member[]>(seedMembers)
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [inviteEmails, setInviteEmails] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState<Role>("Member")
  const [inviteError, setInviteError] = React.useState<string>()

  const setRole = (id: string, role: Role) => {
    setList((l) => l.map((m) => (m.id === id ? { ...m, role } : m)))
    toast.add({ title: "Role updated", type: "success" })
  }
  const remove = (id: string) => {
    setList((l) => l.filter((m) => m.id !== id))
    toast.add({ title: "Member removed" })
  }

  const columns: DataTableColumn<Member>[] = [
    {
      key: "name",
      header: "Member",
      width: 260,
      grow: true,
      sortable: true,
      hideable: false,
      cell: (m) => (
        <span className="flex min-w-0 items-center gap-2.5">
          <Avatar size="sm">
            <AvatarFallback>{initials(m.name)}</AvatarFallback>
          </Avatar>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-medium">{m.status === "Invited" ? "Pending invite" : m.name}</span>
            <span className="truncate text-xs text-muted-foreground">{m.email}</span>
          </span>
        </span>
      ),
    },
    {
      key: "role",
      header: "Role",
      width: 150,
      sortable: true,
      cell: (m) =>
        m.role === "Owner" ? (
          <span className="px-2.5 text-muted-foreground">Owner</span>
        ) : (
          // keeps the select's click from reaching the row
          <div className="p-0.5" onClick={(e) => e.stopPropagation()}>
            <Select value={m.role} onValueChange={(v) => setRole(m.id, v as Role)}>
              <SelectTrigger size="sm" aria-label={`Role for ${m.email}`} className="w-28 min-w-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles
                  .filter((r) => r.value !== "Owner")
                  .map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.value}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        ),
    },
    {
      key: "status",
      header: "Status",
      width: 100,
      sortable: true,
      cell: (m) => (
        <Badge size="sm" variant={m.status === "Active" ? "success" : "warning"}>
          {m.status}
        </Badge>
      ),
    },
    { key: "lastActive", header: "Last active", width: 120, cell: (m) => <span className="text-muted-foreground">{m.lastActive}</span> },
    {
      key: "actions",
      header: <span className="sr-only">Actions</span>,
      label: "Actions",
      hideable: false,
      width: 56,
      align: "right",
      cell: (m) =>
        m.role === "Owner" ? null : (
          <DataTableRowActions label={`Actions for ${m.email}`}>
            {m.status === "Invited" && (
              <MenuItem onClick={() => toast.add({ title: "Invite resent", description: m.email })}>
                <MailIcon />
                Resend invite
              </MenuItem>
            )}
            <MenuItem onClick={() => setRole(m.id, "Admin")}>
              <UsersIcon />
              Make admin
            </MenuItem>
            <MenuSeparator />
            <MenuItem onClick={() => remove(m.id)} variant="destructive">
              <TrashIcon />
              Remove from workspace
            </MenuItem>
          </DataTableRowActions>
        ),
    },
  ]

  const sendInvites = () => {
    const emails = inviteEmails
      .split(/[\s,;]+/)
      .map((e) => e.trim())
      .filter(Boolean)
    if (!emails.length) return setInviteError("Add at least one email address.")
    const bad = emails.find((e) => !EMAIL.test(e))
    if (bad) return setInviteError(`“${bad}” isn't a valid email address.`)
    const dup = emails.find((e) => list.some((m) => m.email === e))
    if (dup) return setInviteError(`${dup} is already in this workspace.`)
    setList((l) => [
      ...l,
      ...emails.map((e, i) => ({ id: `inv-${Date.now()}-${i}`, name: e, email: e, role: inviteRole, status: "Invited" as const, lastActive: "—" })),
    ])
    setInviteOpen(false)
    setInviteEmails("")
    setInviteError(undefined)
    toast.add({ title: emails.length === 1 ? "Invite sent" : `${emails.length} invites sent`, type: "success" })
  }

  return (
    <>
      <SettingsSection>
        <SettingsSectionHeader className="flex-row flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <SettingsSectionTitle>Team</SettingsSectionTitle>
            <SettingsSectionDescription>
              {list.filter((m) => m.role !== "Viewer").length} of {billing.seats + 1} seats used. Viewers are free.
            </SettingsSectionDescription>
          </div>
        </SettingsSectionHeader>
        <DataTable
          aria-label="Members"
          data={list}
          columns={columns}
          getRowId={(m) => m.id}
          searchPlaceholder="Search members…"
          filters={[{ key: "role", label: "Role", options: roles.map((r) => ({ value: r.value, label: r.value })) }]}
          defaultPageSize={10}
          noun="members"
          rowHeight={52}
          toolbar={
            <Button size="sm" onClick={() => setInviteOpen(true)}>
              <PlusIcon data-icon="inline-start" />
              Invite
            </Button>
          }
        />
      </SettingsSection>

      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Roles</SettingsSectionTitle>
        </SettingsSectionHeader>
        <SettingsGroup>
          {roles.map((r) => (
            <SettingsRow key={r.value} className="min-h-12">
              <SettingsRowText>
                <SettingsRowTitle>{r.value}</SettingsRowTitle>
                <SettingsRowDescription>{r.description}</SettingsRowDescription>
              </SettingsRowText>
              <span className="text-ui-sm text-muted-foreground tabular-nums">{list.filter((m) => m.role === r.value).length}</span>
            </SettingsRow>
          ))}
        </SettingsGroup>
      </SettingsSection>

      <Dialog
        open={inviteOpen}
        onOpenChange={(o) => {
          setInviteOpen(o)
          if (!o) setInviteError(undefined)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite teammates</DialogTitle>
            <DialogDescription>They get an email with a link to join Northwind.</DialogDescription>
          </DialogHeader>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              sendInvites()
            }}
            className="flex flex-col gap-4"
          >
            <Field invalid={!!inviteError}>
              <FieldLabel>Email addresses</FieldLabel>
              <FieldControl
                render={<Textarea rows={3} placeholder="kai@northwind.dev, nora@northwind.dev" />}
                value={inviteEmails}
                onValueChange={(v) => {
                  setInviteEmails(String(v))
                  if (inviteError) setInviteError(undefined)
                }}
              />
              <FieldError>{inviteError}</FieldError>
              <FieldDescription>Separate addresses with commas or new lines.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Role</FieldLabel>
              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles
                    .filter((r) => r.value !== "Owner")
                    .map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FieldDescription>{roles.find((r) => r.value === inviteRole)?.description}</FieldDescription>
            </Field>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost" type="button" />}>Cancel</DialogClose>
              <Button type="submit">
                <MailIcon data-icon="inline-start" />
                Send invites
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

/* ───────────────────────── Notifications ───────────────────────── */

/** `/dashboard/settings/notifications`: per-event email and push switches, saved as you go. */
export function NotificationSettings() {
  const toast = useToast()
  const [prefs, setPrefs] = React.useState(() =>
    Object.fromEntries(notificationGroups.flatMap((g) => g.items.map((i) => [i.id, { email: i.email, push: i.push }])))
  )
  const [quiet, setQuiet] = React.useState(true)
  const set = (id: string, channel: "email" | "push", on: boolean) => {
    setPrefs((p) => ({ ...p, [id]: { ...p[id], [channel]: on } }))
    toast.add({ title: "Preference saved", timeout: 1600 })
  }
  return (
    <>
      {notificationGroups.map((g) => (
        <SettingsSection key={g.id}>
          <SettingsSectionHeader>
            <SettingsSectionTitle>{g.title}</SettingsSectionTitle>
            <SettingsSectionDescription>{g.description}</SettingsSectionDescription>
          </SettingsSectionHeader>
          <SettingsGroup>
            <div className="flex items-center justify-end gap-6 px-4 pt-3 pb-1 text-ui-xs font-medium text-muted-foreground">
              <span className="w-8 text-center">Email</span>
              <span className="w-8 text-center">Push</span>
            </div>
            {g.items.map((item) => (
              <SettingsRow key={item.id}>
                <SettingsRowText>
                  <SettingsRowTitle>{item.label}</SettingsRowTitle>
                  <SettingsRowDescription>{item.description}</SettingsRowDescription>
                </SettingsRowText>
                <SettingsRowControl>
                  <div className="flex items-center gap-6">
                    <Switch aria-label={`${item.label} by email`} checked={prefs[item.id].email} onCheckedChange={(on) => set(item.id, "email", on)} />
                    <Switch aria-label={`${item.label} push`} checked={prefs[item.id].push} onCheckedChange={(on) => set(item.id, "push", on)} />
                  </div>
                </SettingsRowControl>
              </SettingsRow>
            ))}
          </SettingsGroup>
        </SettingsSection>
      ))}
      <SettingsSection>
        <SettingsSectionHeader>
          <SettingsSectionTitle>Quiet hours</SettingsSectionTitle>
        </SettingsSectionHeader>
        <SettingsGroup>
          <SettingsRow render={<label />} className="cursor-pointer">
            <SettingsRowText>
              <SettingsRowTitle>Pause push notifications at night</SettingsRowTitle>
              <SettingsRowDescription>22:00 to 08:00 in your time zone. Approval requests still come through.</SettingsRowDescription>
            </SettingsRowText>
            <Switch checked={quiet} onCheckedChange={setQuiet} />
          </SettingsRow>
        </SettingsGroup>
      </SettingsSection>
    </>
  )
}

/* ───────────────────────── Appearance ───────────────────────── */

/** `/dashboard/settings/appearance`: theme and accent (the theme's accent presets). */
export function AppearanceSettings() {
  const { theme, setTheme } = useThemeToggle()
  return (
    <SettingsSection>
      <SettingsSectionHeader>
        <SettingsSectionTitle>Appearance</SettingsSectionTitle>
        <SettingsSectionDescription>Saved on this device.</SettingsSectionDescription>
      </SettingsSectionHeader>
      <SettingsGroup>
        <SettingsRow>
          <SettingsRowText>
            <SettingsRowTitle>Theme</SettingsRowTitle>
            <SettingsRowDescription>Light or dark interface.</SettingsRowDescription>
          </SettingsRowText>
          <SegmentedControl value={theme ?? "light"} onValueChange={(v) => setTheme(v as "light" | "dark")} aria-label="Theme">
            <SegmentedControlItem value="light">Light</SegmentedControlItem>
            <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
          </SegmentedControl>
        </SettingsRow>
        <SettingsRow>
          <SettingsRowText>
            <SettingsRowTitle>Accent colour</SettingsRowTitle>
            <SettingsRowDescription>Buttons, focus rings, links and selection.</SettingsRowDescription>
          </SettingsRowText>
          <AccentPicker showLabels />
        </SettingsRow>
        <SettingsRow>
          <SettingsRowText>
            <SettingsRowTitle>Preview</SettingsRowTitle>
            <SettingsRowDescription>How controls look with your choices.</SettingsRowDescription>
          </SettingsRowText>
          <SettingsRowControl>
            <Badge variant="primary" size="sm">
              New
            </Badge>
            <Switch defaultChecked aria-label="Preview switch" />
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </SettingsRowControl>
        </SettingsRow>
      </SettingsGroup>
    </SettingsSection>
  )
}
