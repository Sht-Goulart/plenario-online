"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VotingList from "./voting-list"
import VotingHistory from "./voting-history"

export default function Votacao() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Sistema de Votação</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar pautas..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="abertas" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="abertas" className="relative">
            Votações Abertas
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </TabsTrigger>
          <TabsTrigger value="historico">Histórico de Votações</TabsTrigger>
        </TabsList>
        <TabsContent value="abertas">
          <VotingList searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="historico">
          <VotingHistory searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

