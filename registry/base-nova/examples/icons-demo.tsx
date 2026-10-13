import { BellIcon, BotIcon, HeartIcon, SearchIcon, SendIcon, SparklesIcon } from "@/components/icons"

export default function IconsDemo() {
  return (
    <div className="flex items-center gap-5 text-foreground">
      <HeartIcon />
      <SearchIcon />
      <SparklesIcon />
      <BotIcon size={24} />
      <BellIcon className="text-primary" />
      <SendIcon className="text-success" />
    </div>
  )
}
