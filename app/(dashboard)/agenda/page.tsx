"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AgendaList from "./agenda-list"
import AgendaCalendar from "./agenda-calendar"
import AgendaFilters from "./agenda-filters"

export default function Agenda() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const clearFilters = () => {
    setSelectedStatus([])
    setSelectedTypes([])
    setDateRange({ from: undefined, to: undefined })
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Agenda de Votações</h2>
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
          <Button variant="outline" onClick={toggleFilters} className={showFilters ? "bg-muted" : ""}>
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            {(selectedStatus.length > 0 || selectedTypes.length > 0 || dateRange.from) && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {selectedStatus.length + selectedTypes.length + (dateRange.from ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>
      </div>

      {showFilters && (
        <AgendaFilters
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          dateRange={dateRange}
          setDateRange={setDateRange}
          clearFilters={clearFilters}
        />
      )}

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
        </TabsList>
        <TabsContent value="lista">
          <AgendaList
            searchQuery={searchQuery}
            selectedStatus={selectedStatus}
            selectedTypes={selectedTypes}
            dateRange={dateRange}
          />
        </TabsContent>
        <TabsContent value="calendario">
          <AgendaCalendar
            searchQuery={searchQuery}
            selectedStatus={selectedStatus}
            selectedTypes={selectedTypes}
            dateRange={dateRange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

