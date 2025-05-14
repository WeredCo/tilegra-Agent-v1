import ChatWindow from "@/components/chat-window"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  )
}
