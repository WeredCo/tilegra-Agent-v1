import ChatWindow from "@/components/chat-window"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-tilegra-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  )
}
