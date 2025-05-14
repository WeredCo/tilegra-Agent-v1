import ChatWindow from "@/components/chat-window"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-zinc-950">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  )
}
