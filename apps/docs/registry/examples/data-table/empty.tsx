"use client"

import { PlusIcon, UsersIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { DataTable } from "@paneui/ui/components/data-table"
import { EmptyState, EmptyStateActions, EmptyStateDescription, EmptyStateIcon, EmptyStateTitle } from "@paneui/ui/components/empty-state"

type Member = { id: string; name: string; role: string }

export default function DataTableEmpty() {
  return (
    <div className="w-full">
      <DataTable<Member>
        aria-label="Members"
        data={[]}
        columns={[
          { key: "name", header: "Name", grow: true },
          { key: "role", header: "Role", width: 140 },
        ]}
        getRowId={(r) => r.id}
        noun="members"
        emptyState={
          <EmptyState size="sm">
            <EmptyStateIcon>
              <UsersIcon />
            </EmptyStateIcon>
            <EmptyStateTitle>No members yet</EmptyStateTitle>
            <EmptyStateDescription>Invite your team to start sharing sessions.</EmptyStateDescription>
            <EmptyStateActions>
              <Button size="sm">
                <PlusIcon data-icon="inline-start" />
                Invite
              </Button>
            </EmptyStateActions>
          </EmptyState>
        }
      />
    </div>
  )
}
