import { ChatIcon, HeartIcon, RefreshIcon } from "@paneui/ui/icons"
import { Avatar } from "@paneui/ui/components/avatar"
import { GeneratedAvatarImage } from "@paneui/ui/components/generated-avatar"
import { Marquee } from "@paneui/ui/components/marquee"

type Post = { name: string; handle: string; date: string; text: string; replies: number; reposts: number; likes: string }

const POSTS: Post[] = [
  { name: "Mei Tanaka", handle: "meitnk", date: "Oct 21", text: "Swapped our settings page to these panes in an afternoon. Nothing to restyle.", replies: 12, reposts: 31, likes: "402" },
  { name: "Daniel Ortiz", handle: "dortiz", date: "Oct 19", text: "The file tree finally feels like an editor's. Arrow keys just work.", replies: 4, reposts: 9, likes: "118" },
  { name: "Aiko Mori", handle: "aikomori", date: "Oct 18", text: "Owning the source means I fixed a spacing nit in one line instead of a fork.", replies: 22, reposts: 57, likes: "1.2K" },
  { name: "Lucas Brandt", handle: "lucasb", date: "Oct 15", text: "Dark mode looked right on the first try. That never happens.", replies: 7, reposts: 14, likes: "260" },
  { name: "Priya Nair", handle: "priyanair", date: "Oct 12", text: "Concentric corners everywhere. My designer stopped leaving comments.", replies: 15, reposts: 40, likes: "733" },
  { name: "Tom Becker", handle: "tbecker", date: "Oct 9", text: "One command, and the component is a plain file in my repo. Lovely.", replies: 3, reposts: 6, likes: "94" },
]

function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex w-72 flex-col gap-3 rounded-xl bg-card p-4 text-ui shadow-raised">
      <header className="flex items-center gap-2.5">
        <Avatar>
          <GeneratedAvatarImage seed={post.handle} />
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-medium">{post.name}</span>
          <span className="truncate text-ui-sm text-muted-foreground">
            @{post.handle} · {post.date}
          </span>
        </div>
      </header>
      <p className="text-pretty">{post.text}</p>
      <footer className="flex items-center gap-5 text-ui-sm text-muted-foreground [&_svg]:size-3.5">
        <span className="flex items-center gap-1.5">
          <ChatIcon aria-hidden />
          {post.replies}
          <span className="sr-only">replies</span>
        </span>
        <span className="flex items-center gap-1.5">
          <RefreshIcon aria-hidden />
          {post.reposts}
          <span className="sr-only">reposts</span>
        </span>
        <span className="flex items-center gap-1.5">
          <HeartIcon aria-hidden />
          {post.likes}
          <span className="sr-only">likes</span>
        </span>
      </footer>
    </article>
  )
}

export default function MarqueePosts() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Marquee duration={40} gap="0.75rem">
        {POSTS.slice(0, 3).map((p) => (
          <PostCard key={p.handle} post={p} />
        ))}
      </Marquee>
      <Marquee direction="right" duration={40} gap="0.75rem">
        {POSTS.slice(3).map((p) => (
          <PostCard key={p.handle} post={p} />
        ))}
      </Marquee>
    </div>
  )
}
