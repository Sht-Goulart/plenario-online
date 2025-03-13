"use client"

import { useState } from "react"
import { Search, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FilterControls from "./filter-controls"
import PartyResults from "./party-results"
import ExportOptions from "./export-options"
import VotingDetails from "./voting-details"

export default function Relatorios() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedVoting, setSelectedVoting] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("partidos")

  const handleVotingSelect = (votingId: string) => {
    setSelectedVoting(votingId)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Relatórios</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar relatórios..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant={showFilters ? "secondary" : "outline"} onClick={() => setShowFilters(!showFilters)}>
            <FileText className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <ExportOptions />
        </div>
      </div>

      {showFilters && <FilterControls onVotingSelect={handleVotingSelect} />}

      <Tabs defaultValue="partidos" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-4">
          <TabsTrigger value="partidos">Resultados por Partido</TabsTrigger>
          <TabsTrigger value="detalhes">Detalhes da Votação</TabsTrigger>
        </TabsList>
        <TabsContent value="partidos">
          <PartyResults searchQuery={searchQuery} selectedVoting={selectedVoting} />
        </TabsContent>
        <TabsContent value="detalhes">
          <VotingDetails searchQuery={searchQuery} selectedVoting={selectedVoting} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

