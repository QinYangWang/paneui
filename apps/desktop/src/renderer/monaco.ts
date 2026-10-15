// The editor from the app bundle, not a CDN: workers are bundled files, and
// the editor component is pointed at this instance before it first loads.
import { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"

self.MonacoEnvironment = {
  getWorker(_id: string, label: string) {
    if (label === "json") return new JsonWorker()
    if (label === "css" || label === "scss" || label === "less") return new CssWorker()
    if (label === "html" || label === "handlebars" || label === "razor") return new HtmlWorker()
    if (label === "typescript" || label === "javascript") return new TsWorker()
    return new EditorWorker()
  },
}

loader.config({ monaco: monaco as unknown as Parameters<typeof loader.config>[0]["monaco"] })
