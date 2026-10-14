"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion, type Transition, type Variants } from "motion/react"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CopyIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  SearchIcon,
  SortIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import { NumberTicker } from "@/registry/base-nova/ui/number-ticker"

/* ───────────────────────── Types ───────────────────────── */

type WalletAccount = {
  id: string
  name: string
  address: string
  /** Custom avatar; defaults to a gradient seeded from the address. */
  avatar?: React.ReactNode
}

type WalletAsset = {
  id: string
  symbol: string
  name: string
  /** Amount held, already formatted or numeric. */
  amount: number
  /** Value in the balance currency. */
  value: number
  /** 24h change in percent. */
  change?: number
  /** Brand colour for the coloured-initial logo. */
  color: string
}

type WalletCardProps = Omit<React.ComponentProps<"section">, "onChange"> & {
  accounts: WalletAccount[]
  accountId?: string
  defaultAccountId?: string
  onAccountChange?: (id: string) => void
  balance: number
  currency?: string
  locale?: string
  /** Change shown in the pill before the balance first moves. */
  defaultChange?: number
  defaultBalanceHidden?: boolean
  /** Optional holdings list under the actions. */
  assets?: WalletAsset[]
  onSend?: () => void
  onDeposit?: () => void
  onSwap?: () => void
  onBuy?: () => void
  searchPlaceholder?: string
  /** Suggestions shown when the search bar opens (filtered as you type). */
  searchRecent?: string[]
  onSearchChange?: (value: string) => void
  onSearchSubmit?: (value: string) => void
  hasNotifications?: boolean
  onNotifications?: () => void
}

/* ───────────────────────── Motion & helpers ───────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const
const MORPH: Transition = { type: "spring", duration: 0.5, bounce: 0.2 }
const GLIDE: Transition = { type: "spring", duration: 0.45, bounce: 0 }
const LIST: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } } }
const ITEM: Variants = {
  hidden: { opacity: 0, y: -6, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22, ease: EASE } },
}

function truncate(address: string) {
  return address.length > 12 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address
}

function hash(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return h >>> 0
}

/** Closes on outside pointer-down and on Escape. */
function useDismiss(open: boolean, onClose: () => void, ref: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.contains(document.activeElement)) onClose()
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose, ref])
}

/** Hover styles arm only once a morph has settled, so nothing flashes under the cursor. */
function useArmed(open: boolean, delay: number) {
  const [armed, setArmed] = React.useState(false)
  React.useEffect(() => {
    if (!open) {
      setArmed(false)
      return
    }
    const t = window.setTimeout(() => setArmed(true), delay)
    return () => window.clearTimeout(t)
  }, [open, delay])
  return armed
}

/** Arrow-key roving focus between the matching buttons inside a container. */
function onListKeyDown(e: React.KeyboardEvent<HTMLElement>, selector: string) {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(selector))
  if (!items.length) return
  e.preventDefault()
  const i = items.indexOf(document.activeElement as HTMLElement)
  const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length
  items[i === -1 ? 0 : next]?.focus()
}

/* ───────────────────────── Avatar, copy ───────────────────────── */

function AccountAvatar({ account, size = 28 }: { account: WalletAccount; size?: number }) {
  if (account.avatar) return <>{account.avatar}</>
  const h = hash(account.address || account.id)
  const a = h % 360
  const b = (a + 40 + (h % 80)) % 360
  return (
    <span
      aria-hidden
      data-slot="wallet-avatar"
      className="relative inline-flex shrink-0 overflow-hidden rounded-full shadow-chip"
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(135deg, oklch(0.68 0.17 ${a}), oklch(0.55 0.2 ${b}))`,
      }}
    />
  )
}

function CopyAddress({ value }: { value: string }) {
  const reduce = useReducedMotion()
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 1400)
    return () => window.clearTimeout(t)
  }, [copied])
  return (
    <button
      type="button"
      aria-label={copied ? "Address copied" : "Copy address"}
      onClick={async (e) => {
        e.stopPropagation()
        try {
          await navigator.clipboard.writeText(value)
        } catch {
          /* clipboard unavailable: still confirm visually */
        }
        setCopied(true)
      }}
      className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground outline-none hover:bg-background/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, filter: "blur(4px)" }}
          transition={{ duration: 0.2, ease: EASE }}
          className="inline-flex"
        >
          {copied ? <CheckIcon className="size-3.5 text-success" /> : <CopyIcon className="size-3.5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

/* ───────────────────────── Account switcher ───────────────────────── */

const HEAD = "flex items-center gap-2 px-2 py-1.5 text-left"

function AccountSwitcher({
  accounts,
  active,
  onSelect,
}: {
  accounts: WalletAccount[]
  active: WalletAccount
  onSelect: (id: string) => void
}) {
  const reduce = useReducedMotion()
  const layoutId = `${React.useId()}-account`
  const listId = React.useId()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)
  const armed = useArmed(open, reduce ? 0 : 280)
  const morph = reduce ? { duration: 0 } : MORPH
  const close = React.useCallback(() => setOpen(false), [])
  useDismiss(open, close, rootRef)

  // Focus the active option on open, and the trigger again on close.
  const wasOpen = React.useRef(false)
  React.useEffect(() => {
    if (open) {
      const t = window.setTimeout(
        () => rootRef.current?.querySelector<HTMLElement>('[role="option"][aria-selected="true"]')?.focus(),
        reduce ? 0 : 120
      )
      wasOpen.current = true
      return () => window.clearTimeout(t)
    }
    if (wasOpen.current) {
      wasOpen.current = false
      requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }))
    }
  }, [open, reduce])

  return (
    <div ref={rootRef} className="min-w-0">
      {/* In-flow sizer: reserves the widest trigger so the header never shifts. */}
      <div aria-hidden className={cn(HEAD, "pointer-events-none invisible")}>
        <span className="size-7" />
        <span className="grid">
          {accounts.map((a) => (
            <span key={a.id} className="col-start-1 row-start-1 text-sm font-semibold whitespace-nowrap">
              {a.name}
            </span>
          ))}
        </span>
        <ChevronDownIcon className="size-4" />
      </div>

      <AnimatePresence initial={false} mode="popLayout">
        {open ? null : (
          <motion.button
            ref={triggerRef}
            key="trigger"
            layoutId={layoutId}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={false}
            onClick={() => setOpen(true)}
            transition={morph}
            style={{ borderRadius: 16 }}
            className={cn(
              HEAD,
              "absolute top-0 -left-2 z-20 max-w-full cursor-pointer outline-none hover:bg-muted/70 focus-visible:ring-3 focus-visible:ring-ring"
            )}
          >
            <AccountAvatar account={active} />
            <motion.span layout="position" transition={morph} className="truncate text-sm font-semibold">
              {active.name}
            </motion.span>
            <motion.span layout="position" transition={morph} className="inline-flex text-muted-foreground">
              <ChevronDownIcon className="size-4" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="popLayout">
        {open ? (
          <motion.div
            key="panel"
            layoutId={layoutId}
            transition={morph}
            style={{ borderRadius: 18 }}
            className="absolute top-0 -right-2 -left-2 z-30 overflow-hidden bg-popover text-popover-foreground shadow-surface"
          >
            <button
              type="button"
              aria-expanded
              aria-controls={listId}
              onClick={close}
              className={cn(HEAD, "w-full cursor-pointer outline-none focus-visible:bg-muted/60")}
            >
              <AccountAvatar account={active} />
              <motion.span layout="position" transition={morph} className="min-w-0 flex-1 truncate text-sm font-semibold">
                {active.name}
              </motion.span>
              <motion.span
                layout="position"
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={morph}
                className="inline-flex text-muted-foreground"
              >
                <ChevronDownIcon className="size-4" />
              </motion.span>
            </button>
            <div className="mx-2 h-px bg-border/60" />
            <motion.ul
              id={listId}
              role="listbox"
              aria-label="Accounts"
              initial="hidden"
              animate="show"
              variants={reduce ? undefined : LIST}
              onKeyDown={(e) => onListKeyDown(e, '[role="option"]')}
              className={cn("max-h-64 overflow-y-auto p-1.5", !armed && "pointer-events-none")}
            >
              {accounts.map((a) => {
                const selected = a.id === active.id
                return (
                  <motion.li
                    key={a.id}
                    variants={reduce ? undefined : ITEM}
                    className={cn(
                      "flex items-center rounded-xl pr-1 transition-colors",
                      selected ? "bg-muted" : armed && "hover:bg-muted/70"
                    )}
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => {
                        onSelect(a.id)
                        close()
                      }}
                      className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-xl px-2 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <AccountAvatar account={a} size={30} />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium">{a.name}</span>
                        <span className="truncate font-mono text-[11px] text-muted-foreground">{truncate(a.address)}</span>
                      </span>
                      {selected ? <CheckIcon className="size-4 shrink-0 text-primary" /> : null}
                    </button>
                    <CopyAddress value={a.address} />
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────────── Search ───────────────────────── */

function SearchBar({
  placeholder = "Search tokens, addresses",
  recent = [],
  onChange,
  onSubmit,
}: {
  placeholder?: string
  recent?: string[]
  onChange?: (v: string) => void
  onSubmit?: (v: string) => void
}) {
  const reduce = useReducedMotion()
  const layoutId = `${React.useId()}-search`
  const rootRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const iconRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const armed = useArmed(open, reduce ? 0 : 260)
  const morph = reduce ? { duration: 0 } : MORPH
  const glide = reduce ? { duration: 0 } : GLIDE
  const wasOpen = React.useRef(false)
  const close = React.useCallback(() => setOpen(false), [])
  useDismiss(open, close, rootRef)

  React.useEffect(() => {
    if (open) {
      wasOpen.current = true
      inputRef.current?.focus({ preventScroll: true })
    } else if (wasOpen.current) {
      wasOpen.current = false
      requestAnimationFrame(() => iconRef.current?.focus({ preventScroll: true }))
    }
  }, [open])

  const q = value.trim().toLowerCase()
  const matches = q ? recent.filter((r) => r.toLowerCase().includes(q)) : recent
  const submit = (term: string) => {
    onSubmit?.(term)
    close()
  }

  return (
    <div ref={rootRef} className="shrink-0">
      {open ? <div aria-hidden className="size-8" /> : null}
      <AnimatePresence initial={false} mode="popLayout">
        {open ? null : (
          <motion.button
            ref={iconRef}
            key="icon"
            layoutId={layoutId}
            type="button"
            aria-label="Search"
            aria-expanded={false}
            onClick={() => setOpen(true)}
            transition={morph}
            style={{ borderRadius: 999 }}
            className="inline-flex size-8 cursor-pointer items-center justify-center text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
          >
            <motion.span layout="position" transition={glide} className="inline-flex">
              <SearchIcon className="size-4" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="popLayout">
        {open ? (
          <motion.div
            key="panel"
            layoutId={layoutId}
            role="search"
            transition={morph}
            style={{ borderRadius: 18 }}
            className="absolute top-0 -right-2 -left-2 z-40 overflow-hidden bg-popover text-popover-foreground shadow-surface"
          >
            <div className="flex h-10 items-center gap-2 px-3">
              <motion.span layout="position" transition={glide} className="inline-flex shrink-0 text-muted-foreground">
                <SearchIcon className="size-4" />
              </motion.span>
              <motion.input
                ref={inputRef}
                layout="position"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ opacity: { duration: 0.15, delay: 0.1 }, layout: glide }}
                value={value}
                aria-label="Search"
                placeholder={placeholder}
                onChange={(e) => {
                  setValue(e.target.value)
                  onChange?.(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && value.trim()) submit(value.trim())
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    rootRef.current?.querySelector<HTMLElement>("[data-recent]")?.focus()
                  }
                }}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded-full bg-muted px-1.5 py-px font-mono text-[10px] text-muted-foreground shadow-chip sm:inline">
                esc
              </kbd>
            </div>
            <div className="mx-2 h-px bg-border/60" />
            {matches.length ? (
              <motion.ul
                initial="hidden"
                animate="show"
                variants={reduce ? undefined : LIST}
                onKeyDown={(e) => onListKeyDown(e, "[data-recent]")}
                aria-label={q ? "Matches" : "Recent searches"}
                className={cn("max-h-56 overflow-y-auto p-1.5", !armed && "pointer-events-none")}
              >
                {matches.map((term) => (
                  <motion.li key={term} layout="position" variants={reduce ? undefined : ITEM}>
                    <button
                      type="button"
                      data-recent
                      onClick={() => {
                        setValue(term)
                        onChange?.(term)
                        submit(term)
                      }}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm text-muted-foreground outline-none focus-visible:bg-muted focus-visible:text-foreground",
                        armed && "hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <ClockIcon className="size-4 shrink-0" />
                      <span className="min-w-0 flex-1 truncate">{term}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.p
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-7 text-center text-sm text-muted-foreground"
              >
                {q ? `No matches for “${value.trim()}”` : "No recent searches"}
              </motion.p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────────── Balance ───────────────────────── */

function BalanceDelta({
  balance,
  initial,
  format,
}: {
  balance: number
  initial?: number
  format: (v: number) => string
}) {
  const reduce = useReducedMotion()
  const prev = React.useRef(balance)
  const [delta, setDelta] = React.useState(initial ? { id: 0, amount: initial } : null)

  React.useEffect(() => {
    const diff = balance - prev.current
    prev.current = balance
    if (Math.abs(diff) < 0.005) return
    setDelta((d) => ({ id: (d?.id ?? 0) + 1, amount: diff }))
  }, [balance])

  const up = (delta?.amount ?? 0) > 0
  return (
    <div className="mt-2 flex h-6 items-center justify-center" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {delta ? (
          <motion.span
            key={delta.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.2, ease: EASE }}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums shadow-chip",
              up ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive"
            )}
          >
            {up ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />}
            {up ? "+" : "−"}
            {format(Math.abs(delta.amount))}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────────── Card ───────────────────────── */

function WalletCard({
  accounts,
  accountId,
  defaultAccountId,
  onAccountChange,
  balance,
  currency = "USD",
  locale = "en-US",
  defaultChange,
  defaultBalanceHidden = false,
  assets,
  onSend,
  onDeposit,
  onSwap,
  onBuy,
  searchPlaceholder,
  searchRecent,
  onSearchChange,
  onSearchSubmit,
  hasNotifications = false,
  onNotifications,
  className,
  ...props
}: WalletCardProps) {
  const reduce = useReducedMotion()
  const [innerId, setInnerId] = React.useState(defaultAccountId ?? accounts[0]?.id)
  const [hidden, setHidden] = React.useState(defaultBalanceHidden)
  const active = accounts.find((a) => a.id === (accountId ?? innerId)) ?? accounts[0]

  const money = React.useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [locale, currency]
  )
  const format = React.useCallback((v: number) => money.format(v), [money])

  const actions = [
    { key: "send", label: "Send", icon: ArrowUpIcon, onClick: onSend },
    { key: "deposit", label: "Deposit", icon: DownloadIcon, onClick: onDeposit },
    { key: "swap", label: "Swap", icon: SortIcon, onClick: onSwap },
    { key: "buy", label: "Buy", icon: CreditCardIcon, onClick: onBuy },
  ]

  const blurSwap = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, filter: "blur(8px)", scale: 0.96 },
        animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
        exit: { opacity: 0, filter: "blur(8px)", scale: 0.96 },
      }

  return (
    <section
      data-slot="wallet-card"
      aria-label="Wallet"
      className={cn(
        "relative w-full max-w-[340px] rounded-[1.75rem] bg-card p-5 text-card-foreground shadow-surface",
        className
      )}
      {...props}
    >
      <div className="relative flex items-center justify-between gap-2">
        {active ? (
          <AccountSwitcher
            accounts={accounts}
            active={active}
            onSelect={(id) => {
              if (accountId === undefined) setInnerId(id)
              onAccountChange?.(id)
            }}
          />
        ) : null}
        <div className="flex shrink-0 items-center gap-0.5">
          <SearchBar placeholder={searchPlaceholder} recent={searchRecent} onChange={onSearchChange} onSubmit={onSearchSubmit} />
          <button
            type="button"
            aria-label={hasNotifications ? "Notifications, unread" : "Notifications"}
            onClick={onNotifications}
            className="relative inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
          >
            <BellIcon className="size-4" />
            {hasNotifications ? (
              <span aria-hidden className="absolute top-1.5 right-1.5 flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-primary ring-2 ring-card" />
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center text-center">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Total balance</span>
          <button
            type="button"
            aria-label={hidden ? "Show balance" : "Hide balance"}
            aria-pressed={hidden}
            onClick={() => setHidden((h) => !h)}
            className="inline-flex size-5 cursor-pointer items-center justify-center rounded-full outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {hidden ? <EyeOffIcon className="size-3.5" /> : <EyeIcon className="size-3.5" />}
          </button>
        </div>
        <div className="mt-1 grid h-10 place-items-center text-[2.1rem] leading-none font-semibold tracking-tight">
          <AnimatePresence mode="popLayout" initial={false}>
            {hidden ? (
              <motion.span
                key="hidden"
                {...blurSwap}
                transition={{ duration: 0.22, ease: EASE }}
                className="tracking-[0.2em] text-muted-foreground"
              >
                <span className="sr-only">Balance hidden</span>
                <span aria-hidden>••••••</span>
              </motion.span>
            ) : (
              <motion.span key="shown" {...blurSwap} transition={{ duration: 0.22, ease: EASE }}>
                <NumberTicker
                  value={balance}
                  locale={locale}
                  startOnView={false}
                  format={{ style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {hidden ? <div className="mt-2 h-6" /> : <BalanceDelta balance={balance} initial={defaultChange} format={format} />}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {actions.map(({ key, label, icon: Icon, onClick }) => (
          <motion.button
            key={key}
            type="button"
            onClick={onClick}
            whileTap={reduce ? undefined : { scale: 0.92 }}
            transition={{ type: "spring", stiffness: 520, damping: 28, mass: 0.6 }}
            className="group/action flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring"
          >
            <span
              className={cn(
                "inline-flex size-12 items-center justify-center rounded-full transition-[background-color,box-shadow] duration-150 ease-out",
                key === "send"
                  ? "bg-primary text-primary-foreground shadow-primary group-hover/action:bg-primary/90"
                  : "bg-secondary text-secondary-foreground shadow-raised group-hover/action:bg-accent group-hover/action:shadow-raised-hover"
              )}
            >
              <Icon className="size-[18px]" />
            </span>
            <span className="text-xs font-medium text-muted-foreground group-hover/action:text-foreground">{label}</span>
          </motion.button>
        ))}
      </div>

      {assets?.length ? (
        <ul aria-label="Holdings" className="mt-5 flex flex-col gap-0.5 rounded-2xl bg-muted/40 p-1.5 shadow-well">
          {assets.map((asset) => (
            <li key={asset.id} className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span
                aria-hidden
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-chip"
                style={{
                  backgroundColor: asset.color,
                }}
              >
                {asset.symbol.slice(0, 4)}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{asset.name}</span>
                <span className="truncate text-xs text-muted-foreground tabular-nums">
                  {hidden ? "••••" : `${asset.amount.toLocaleString(locale, { maximumFractionDigits: 4 })} ${asset.symbol}`}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end tabular-nums">
                <span className="text-sm font-medium">{hidden ? "••••" : format(asset.value)}</span>
                {asset.change !== undefined ? (
                  <span className={cn("text-xs", asset.change >= 0 ? "text-success" : "text-destructive")}>
                    {asset.change >= 0 ? "+" : "−"}
                    {Math.abs(asset.change).toFixed(2)}%
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export { WalletCard, AccountAvatar, type WalletCardProps, type WalletAccount, type WalletAsset }
