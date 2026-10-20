import { DirectionProvider } from "@base-ui/react/direction-provider"
import { Button } from "@paneui/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@paneui/ui/components/dialog"

export default function DialogRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Dialog>
          <DialogTrigger render={<Button variant="secondary" />}>إيقاف المهام التلقائية</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إيقاف كل المهام التلقائية؟</DialogTitle>
              <DialogDescription>تنتهي المهام الجارية، ولا تبدأ مهام جديدة حتى تستأنفها.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>إلغاء</DialogClose>
              <DialogClose render={<Button />}>إيقاف</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DirectionProvider>
  )
}
