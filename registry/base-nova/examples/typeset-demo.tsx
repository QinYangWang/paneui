export default function TypesetDemo() {
  return (
    <article className="typeset typeset-docs w-full max-w-md">
      <h2>Release notes</h2>
      <p>
        Folders now open with <code>Enter</code> and close with <code>←</code>. Selection follows focus, so arrow keys
        move it one row at a time.
      </p>
      <ul>
        <li>Rows keep their height while a folder loads.</li>
        <li>Indent guides stay visible in high-contrast mode.</li>
      </ul>
      <blockquote>Upgrade the tree before the editor; the editor reads its new events.</blockquote>
    </article>
  )
}
