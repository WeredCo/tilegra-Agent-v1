import type React from "react"
import { Bot, BarChart, Lightbulb, Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div
      className={cn("flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950 text-white", className)}
      {...props}
    >
      <div className="flex h-16 items-center border-b border-zinc-800 px-4">
        <div className="relative h-12 w-full">
          <Image src="/images/tilegra-logo.png" alt="Tilegra Logo" fill className="object-contain" priority />
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="px-4 mb-4">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Solutions</h2>
        </div>
        <nav className="grid items-start px-2 text-sm font-medium gap-1">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Lightbulb className="h-4 w-4" />
            Business Improvement
          </Button>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Info className="h-4 w-4" />
            How It Works
          </Button>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Bot className="h-4 w-4" />
            Pre-built Demos
          </Button>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            Custom Solutions
          </Button>
        </nav>
        <div className="px-4 mt-8 mb-4">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Analytics</h2>
        </div>
        <nav className="grid items-start px-2 text-sm font-medium">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <BarChart className="h-4 w-4" />
            Performance Metrics
          </Button>
        </nav>
      </div>
      <div className="border-t border-zinc-800 p-4">
        <div className="rounded-lg bg-zinc-900 p-3">
          <h3 className="font-medium text-sm text-zinc-200">Tilegra Demo</h3>
          <p className="text-xs text-zinc-400 mt-1">Explore how AI can transform your business operations</p>
        </div>
      </div>
    </div>
  )
}
