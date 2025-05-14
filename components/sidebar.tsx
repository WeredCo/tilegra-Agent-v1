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
        <div className="relative h-16 w-full">
          <Image src="/images/tilegra-logo.png" alt="Logo de Tilegra" fill className="object-contain" priority />
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="px-4 mb-4">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Soluciones</h2>
        </div>
        <nav className="grid items-start px-2 text-sm font-medium gap-1">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Lightbulb className="h-4 w-4" />
            Mejora de Negocios
          </Button>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Info className="h-4 w-4" />
            Cómo Funciona
          </Button>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Bot className="h-4 w-4" />
            Demos Prediseñadas
          </Button>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            Soluciones Personalizadas
          </Button>
        </nav>
      
        
      </div>
      <div className="border-t border-zinc-800 p-4">
        <div className="rounded-lg bg-zinc-900 p-3">
          <h3 className="font-medium text-sm text-zinc-200">Demo de Tilegra</h3>
          <p className="text-xs text-zinc-400 mt-1">Descubre cómo la IA puede transformar tus operaciones de negocio</p>
        </div>
      </div>
    </div>
  )
}
