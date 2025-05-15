"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Send, Loader2, Bot, User, Lightbulb, Info, Zap, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MobileSidebar } from "@/components/mobile-sidebar"

type Message = {
  role: "user" | "bot"
  content: string
  tool?: string
}

type Tool = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState("")
  const [showTools, setShowTools] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const tools: Tool[] = [
    {
      id: "business-improvement",
      name: "Mejora de Negocios",
      description: "Descubre cómo Tilegra puede mejorar tus operaciones empresariales",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      id: "how-it-works",
      name: "Cómo Funciona",
      description: "Conoce la tecnología de IA de Tilegra y su proceso de implementación",
      icon: <Info className="h-5 w-5" />,
    },
    {
      id: "pre-built-demo",
      name: "Probar Demo Prediseñada",
      description: "Explora nuestras soluciones de IA listas para usar",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      id: "custom-demo",
      name: "Solución Personalizada",
      description: "Obtén una solución de IA personalizada según tus necesidades",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  useEffect(() => {
    const id = crypto.randomUUID()
    setSessionId(id)

    // Add welcome message
    setMessages([
      {
        role: "bot",
        content:
          "¡Bienvenido a Tilegra Soluciones de IA! Soy tu asistente virtual. ¿Cómo puedo ayudarte hoy? Puedes preguntar sobre cómo podemos mejorar tu negocio, cómo funciona nuestra tecnología o probar una de nuestras demos.",
      },
    ])

    // Focus the input field when the component mounts
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const sendMessage = async (content: string, tool?: string) => {
    if (!content.trim()) return

    const userMessage: Message = { role: "user", content, tool }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setShowTools(false)

    try {
      // Use the webhook to get AI response
      const response = await fetch(
        `https://primary-production-b01f.up.railway.app/webhook/receive-msg-tilegra?message=${encodeURIComponent(
          content,
        )}&sessionId=${sessionId}${tool ? `&tool=${encodeURIComponent(tool)}` : ""}`,
      )
      const data = await response.json()

      const botMessage: Message = {
        role: "bot",
        content: data.output || "No hay respuesta de la IA.",
        tool,
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error al contactar a la IA:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Disculpa, estoy teniendo problemas para conectarme a nuestros sistemas. Por favor, intenta nuevamente más tarde o contacta a nuestro equipo de soporte.",
        },
      ])
    } finally {
      setLoading(false)
      // Focus the input field after sending a message
      inputRef.current?.focus()
    }
  }

  const handleToolSelect = (tool: Tool) => {
    sendMessage(`Me gustaría conocer sobre ${tool.name}`, tool.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        sendMessage(input)
      }
    }
  }

  function formatMessage(message: string) {
    if (!message) return ""
    let formatted = message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    formatted = formatted.replace(/\n/g, "<br/>")
    return formatted
  }

  return (
    <div className="flex h-screen flex-col bg-tilegra-background text-tilegra-text">
      <header className="flex h-16 items-center justify-between border-b border-tilegra-border px-4">
        <div className="flex items-center gap-2">
          <MobileSidebar />
          <Bot className="h-5 w-5 text-tilegra-glow" />
          <h1 className="text-lg font-medium">Asistente de IA Tilegra</h1>
        </div>
        <Badge
          variant="outline"
          className="bg-tilegra-accent/20 text-tilegra-text border-tilegra-accent hover:bg-tilegra-accent/30"
        >
          <span className="hidden sm:inline">Demo</span> 
        </Badge>
      </header>

      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="h-full flex items-center justify-center text-center p-4 sm:p-8">
            <div className="max-w-md space-y-2">
              <Bot className="h-12 w-12 mx-auto text-tilegra-glow" />
              <h3 className="text-lg font-medium text-tilegra-text">Bienvenido al Asistente de IA Tilegra</h3>
              <p className="text-sm text-tilegra-muted">
                Haz una pregunta sobre nuestras soluciones de IA y te ayudaré a encontrar la información que necesitas.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn("flex items-start gap-2 group", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            {msg.role === "bot" && (
              <Avatar className="h-8 w-8 border border-tilegra-border bg-tilegra-card flex-shrink-0">
                <AvatarFallback className="bg-tilegra-accent text-tilegra-text">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "rounded-lg px-3 py-2 max-w-[85%] sm:max-w-[75%] break-words",
                msg.role === "user"
                  ? "bg-tilegra-glow text-white rounded-tr-none"
                  : "bg-tilegra-card text-tilegra-text rounded-tl-none border border-tilegra-border",
              )}
            >
              <div
                className="text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
              />
            </div>

            {msg.role === "user" && (
              <Avatar className="h-8 w-8 border border-tilegra-border bg-tilegra-card flex-shrink-0">
                <AvatarFallback className="bg-tilegra-card text-tilegra-text">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-2">
            <Avatar className="h-8 w-8 border border-tilegra-border bg-tilegra-card flex-shrink-0">
              <AvatarFallback className="bg-tilegra-accent text-tilegra-text">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-tilegra-card text-tilegra-text rounded-lg rounded-tl-none border border-tilegra-border px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 bg-tilegra-glow rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-tilegra-glow rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="h-2 w-2 bg-tilegra-glow rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        {showTools && messages.length === 1 && !loading && (
          <div className="grid grid-cols-1 gap-3 mt-4 px-2 sm:px-0">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className="bg-tilegra-card border-tilegra-border hover:border-tilegra-glow cursor-pointer transition-all"
                onClick={() => handleToolSelect(tool)}
              >
                <CardContent className="p-3 sm:p-4 flex items-start gap-3">
                  <div className="mt-1 bg-tilegra-accent/20 p-2 rounded-lg text-tilegra-glow flex-shrink-0">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-tilegra-text">{tool.name}</h3>
                    <p className="text-xs text-tilegra-muted mt-1">{tool.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div ref={bottomRef} className="h-1" />
      </div>

      <footer className="border-t border-tilegra-border bg-tilegra-background p-2 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (input.trim()) {
              sendMessage(input)
            }
          }}
          className="flex w-full items-center gap-2"
        >
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta sobre Tilegra..."
            className="flex-1 bg-tilegra-card border-tilegra-border text-tilegra-text placeholder:text-tilegra-muted focus-visible:ring-tilegra-glow focus-visible:border-tilegra-glow h-10 sm:h-auto"
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            className="h-10 w-10 rounded-full bg-tilegra-glow hover:bg-tilegra-glow/90 text-white flex-shrink-0 shadow-[0_0_15px_rgba(42,92,163,0.5)]"
            aria-label="Enviar mensaje"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </footer>
    </div>
  )
}
