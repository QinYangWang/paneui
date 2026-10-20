type Language = { id: string; label: string }

const BY_EXT: Record<string, Language> = {
  ts: { id: "typescript", label: "TypeScript" },
  mts: { id: "typescript", label: "TypeScript" },
  cts: { id: "typescript", label: "TypeScript" },
  tsx: { id: "typescript", label: "TypeScript JSX" },
  js: { id: "javascript", label: "JavaScript" },
  mjs: { id: "javascript", label: "JavaScript" },
  cjs: { id: "javascript", label: "JavaScript" },
  jsx: { id: "javascript", label: "JavaScript JSX" },
  json: { id: "json", label: "JSON" },
  css: { id: "css", label: "CSS" },
  scss: { id: "scss", label: "SCSS" },
  less: { id: "less", label: "Less" },
  html: { id: "html", label: "HTML" },
  md: { id: "markdown", label: "Markdown" },
  mdx: { id: "markdown", label: "MDX" },
  yml: { id: "yaml", label: "YAML" },
  yaml: { id: "yaml", label: "YAML" },
  sh: { id: "shell", label: "Shell Script" },
  bash: { id: "shell", label: "Shell Script" },
  py: { id: "python", label: "Python" },
  go: { id: "go", label: "Go" },
  rs: { id: "rust", label: "Rust" },
  sql: { id: "sql", label: "SQL" },
  xml: { id: "xml", label: "XML" },
  svg: { id: "xml", label: "SVG" },
}

const PLAIN: Language = { id: "plaintext", label: "Plain Text" }

/** Editor language for a file name, by extension. */
export function languageOf(name: string): Language {
  const lower = name.toLowerCase()
  if (lower === ".gitignore" || lower.startsWith(".env")) return { id: "ini", label: "Ignore" }
  const dot = lower.lastIndexOf(".")
  return dot === -1 ? PLAIN : (BY_EXT[lower.slice(dot + 1)] ?? PLAIN)
}
