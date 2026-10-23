import { test } from "node:test"
import assert from "node:assert/strict"
import { highlight, highlightTokens, createCodeStream } from "../../packages/ui/src/lib/highlight.ts"

const text = (lines) => lines.map((line) => line.map((token) => token.content).join("")).join("\n")
test("static markup escapes source and uses theme tokens", async () => {
  const html = await highlight('const x = "<script>&"\n', "ts")
  assert.ok(html.includes("var(--chart-5)"))
  assert.ok(html.includes("&lt;script&gt;&amp;"))
  assert.ok(!html.includes("<script>"))
  assert.equal((html.match(/class="line"/g) ?? []).length, 2)
})
test("unknown languages preserve source", async () => {
  const code = "<custom>\n🌤️\n"
  assert.equal(text(await highlightTokens(code, "unknown-language")), code)
})
test("fallback grammar highlights unsupported source", async () => {
  const { isSupportedLanguage } = await import("../../packages/ui/node_modules/@pierre/highlights/dist/default.js")
  assert.equal(isSupportedLanguage("abap"), false)
  const lines = await highlightTokens('WRITE "hello".', "abap")
  assert.equal(text(lines), 'WRITE "hello".')
  assert.ok(lines.flat().some((token) => token.light && token.light !== "var(--foreground)"))
})
test("stream preserves multiline lexer state, unicode, empty lines and final tail", async () => {
  const code = '/* hello\n🌤️ world */\n\nconst x = "done";'
  const stream = await createCodeStream("ts")
  let source = ""
  for (const chunk of ['/* hello\n', '🌤️ world */\n', '\nconst x = ', '"done";']) {
    source += chunk
    const lines = await stream.update(source)
    assert.ok(code.startsWith(text(lines)))
  }
  assert.deepEqual(await stream.update(source, true), await highlightTokens(code, "ts"))
  await assert.rejects(stream.update("replacement"))
  stream.dispose()
})
test("simultaneous streams are isolated", async () => {
  const a = await createCodeStream("ts")
  const b = await createCodeStream("json")
  await a.update("/* open\n")
  const json = '{"ok":true}\n'
  assert.deepEqual(await b.update(json, true), await highlightTokens(json, "json"))
  assert.deepEqual(await a.update("/* open\nclosed */", true), await highlightTokens("/* open\nclosed */", "ts"))
  a.dispose(); b.dispose()
})
test("character-sized chunks preserve surrogate pairs and split line endings", async () => {
  for (const code of ['const sky = "🌤️🙂";\n/* 🌤️\nend */', 'a\r\nb\r\n']) {
    const stream = await createCodeStream("ts")
    for (let i = 1; i <= code.length; i++) await stream.update(code.slice(0, i))
    assert.deepEqual(await stream.update(code, true), await highlightTokens(code, "ts"))
    stream.dispose()
  }
})
