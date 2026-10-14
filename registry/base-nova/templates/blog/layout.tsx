import { ToastProvider } from "@/registry/base-nova/ui/toast"

/** The subscribe form confirms with a toast, so the blog routes need a toast provider. Move it to your root layout if you already have one. */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
