"use client"

import * as React from "react"
import { useRender } from "@base-ui/react/use-render"

import { ChevronRightIcon, MoreHorizontalIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/registry/base-nova/ui/menu"

function Breadcrumb({ "aria-label": ariaLabel = "Breadcrumb", ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb" aria-label={ariaLabel} {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-0.5 text-sm break-words text-muted-foreground", className)}
      {...props}
    />
  )
}

/** Each crumb fades/slides in softly when it mounts (e.g. navigating deeper). */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(
        "inline-flex items-center gap-0.5 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] starting:-translate-x-1 starting:opacity-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

const crumbClass =
  "inline-flex h-7 items-center gap-1.5 rounded-md px-2 transition-[background-color,color,box-shadow] duration-150 outline-none [&_svg]:size-3.5 [&_svg]:shrink-0"

/** Link crumb. Renders an <a> by default; use `render` for a router Link. */
function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    render,
    props: {
      "data-slot": "breadcrumb-link",
      ...props,
      className: cn(
        crumbClass,
        "cursor-pointer hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring",
        className
      ),
    },
  })
}

/** The current page: a raised chip, marked aria-current. */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        crumbClass,
        "bg-secondary font-medium text-foreground shadow-raised",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center text-muted-foreground/60 [&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

type BreadcrumbHiddenItem = {
  label: React.ReactNode
  href?: string
  icon?: React.ReactNode
  onClick?: () => void
}

/**
 * "…" crumb. With `items`, it becomes a button that opens a menu of the hidden crumbs;
 * without, it is a plain visual marker.
 */
function BreadcrumbEllipsis({
  className,
  items,
  label = "Show hidden breadcrumbs",
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & { items?: BreadcrumbHiddenItem[]; label?: string }) {
  const iconBox = cn(
    "inline-flex size-7 items-center justify-center rounded-md [&_svg]:size-4",
    className
  )

  if (!items?.length) {
    return (
      <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" className={iconBox} {...props}>
        <MoreHorizontalIcon />
      </span>
    )
  }

  return (
    <Menu>
      <MenuTrigger
        data-slot="breadcrumb-ellipsis"
        aria-label={label}
        className={cn(
          iconBox,
          "cursor-pointer transition-[background-color,color,box-shadow] duration-150 outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring data-popup-open:bg-secondary data-popup-open:text-foreground data-popup-open:shadow-raised"
        )}
      >
        <MoreHorizontalIcon />
      </MenuTrigger>
      <MenuContent align="start" className="min-w-44">
        {items.map((item, i) => (
          <MenuItem
            key={i}
            onClick={item.onClick}
            render={item.href ? <a href={item.href} /> : undefined}
          >
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  )
}

type BreadcrumbTrailItem = BreadcrumbHiddenItem

/**
 * Convenience trail: renders `items` (last one = current page) and folds the
 * middle into an ellipsis menu once there are more than `maxItems`.
 */
function BreadcrumbTrail({
  items,
  maxItems = 4,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 2,
  separator,
  className,
  ...props
}: Omit<React.ComponentProps<"nav">, "children"> & {
  items: BreadcrumbTrailItem[]
  maxItems?: number
  itemsBeforeCollapse?: number
  itemsAfterCollapse?: number
  separator?: React.ReactNode
}) {
  const collapse = items.length > maxItems && itemsBeforeCollapse + itemsAfterCollapse < items.length
  const head = collapse ? items.slice(0, itemsBeforeCollapse) : items
  const hidden = collapse ? items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse) : []
  const tail = collapse ? items.slice(items.length - itemsAfterCollapse) : []
  const last = items.length - 1

  const crumb = (item: BreadcrumbTrailItem, index: number) => (
    <BreadcrumbItem key={`c-${index}`}>
      {index === last ? (
        <BreadcrumbPage>
          {item.icon}
          {item.label}
        </BreadcrumbPage>
      ) : (
        <BreadcrumbLink href={item.href} onClick={item.onClick}>
          {item.icon}
          {item.label}
        </BreadcrumbLink>
      )}
    </BreadcrumbItem>
  )

  const nodes: React.ReactNode[] = []
  head.forEach((item, i) => nodes.push(crumb(item, i)))
  if (collapse) {
    nodes.push(
      <BreadcrumbItem key="ellipsis">
        <BreadcrumbEllipsis items={hidden} />
      </BreadcrumbItem>
    )
    tail.forEach((item, i) => nodes.push(crumb(item, items.length - itemsAfterCollapse + i)))
  }

  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList>
        {nodes.flatMap((node, i) =>
          i === 0 ? [node] : [<BreadcrumbSeparator key={`s-${i}`}>{separator}</BreadcrumbSeparator>, node]
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbTrail,
}
export type { BreadcrumbHiddenItem, BreadcrumbTrailItem }
