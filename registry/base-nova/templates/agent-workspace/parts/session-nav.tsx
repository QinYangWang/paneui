"use client"

import { ChatIcon, PlusIcon, SettingsIcon } from "@/components/icons"
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarMenu,
} from "@/registry/base-nova/ui/animated-sidebar"
import { Badge } from "@/registry/base-nova/ui/badge"
import { Button } from "@/registry/base-nova/ui/button"

import { sessions } from "./data"

export function SessionNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  const group = (label: string, list: typeof sessions.today) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {list.map((s) => (
          <SidebarItem
            key={s.id}
            icon={<ChatIcon />}
            label={s.title}
            isActive={active === s.id}
            onClick={() => onSelect(s.id)}
            badge={
              s.meta === "running" ? (
                <Badge size="sm" variant="primary">
                  Live
                </Badge>
              ) : undefined
            }
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
  return (
    <>
      <SidebarHeader>
        <Button variant="secondary" size="sm" className="w-full">
          <PlusIcon data-icon="inline-start" />
          New session
        </Button>
      </SidebarHeader>
      <SidebarContent className="scrollbar-hover">
        {group("Today", sessions.today)}
        {group("Earlier", sessions.earlier)}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarItem icon={<SettingsIcon />} label="Agent settings" />
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
