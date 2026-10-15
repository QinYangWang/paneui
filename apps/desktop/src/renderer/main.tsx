import "./monaco"
import "./app.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { VsCodeApp } from "@/registry/base-nova/templates/vscode/vscode"

import { createDesktopHost } from "./host"
import { followSystemTheme } from "./theme"

const bridge = window.desktop
followSystemTheme(bridge)
const host = createDesktopHost(bridge)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VsCodeApp host={host} />
  </StrictMode>
)
