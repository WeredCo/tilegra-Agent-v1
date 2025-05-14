"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-zinc-200 hover:bg-zinc-800 hover:text-white"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menú</span>
      </Button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/80 md:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="absolute right-0 top-0 mr-2 mt-2 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-zinc-200">
          <Button variant="ghost" size="icon" className="h-7 w-7 p-0" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
        </div>
        <Sidebar />
      </div>
    </>
  )
}
