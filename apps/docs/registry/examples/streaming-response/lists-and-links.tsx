"use client"

import { ResponseMarkdown } from "@paneui/ui/components/streaming-response"

const TEXT = `Two steps are done:

1. Installed the dependencies
2. Ran the migrations

Next, continuing the list:

3. Seed the database
4. Start the server

Docs are at https://example.com/docs/setup.

- [x] Create the project
- [ ] Invite the team`

export default function StreamingResponseListsAndLinks() {
  return <ResponseMarkdown text={TEXT} className="max-w-lg" />
}
