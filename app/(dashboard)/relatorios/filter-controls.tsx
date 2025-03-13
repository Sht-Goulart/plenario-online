"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

// Mock data for voting sessions
const votingSessions = [
  {
    id: "1",
    title: "Projeto de Lei nº 125/2023 - Programa de Coleta Seletiva",
    date: "2023-06-22",
  },
  {
    id: "2",
    title: "Projeto de Lei nº 126/2023 - Reforma Administrativa",
    date: "2023-06-15",
  },
  {
    id: "3",
    title: "Projeto de Lei nº 127/2023 - Orçamento Municipal 2024",
    date: "2023-06-10",
  },
  {
    id: "4",
    title: "Projeto de Lei nº 128/2023 - Plano Diretor",
    date: "2023-06-05",
  },
]

interface FilterControlsProps {
  onVotingSelect: (votingId: string) => void
}

export default function FilterControls({ onVotingSelect }: FilterControlsProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const [selectedVoting, setSelectedVoting] = useState<string>("")
  const [selectedParty, setSelectedParty] = useState<string>("")

  const handleVotingChange = (value: string) => {
    setSelectedVoting(value)
    onVotingSelect(value)
  }

  const clearFilters = () => {
    setDateRange({ from: undefined, to: undefined })
    setSelectedVoting("")
    setSelectedParty("")
    onVotingSelect("")
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="space-y-2 md:w-1/3">
            <Label htmlFor="voting-session">Sessão de Votação</Label>
            <Select value={selectedVoting} onValueChange={handleVotingChange}>
              <SelectTrigger id="voting-session">
                <SelectValue placeholder="Selecione uma votação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default-voting">Todas as votações</SelectItem>
                {votingSessions.map((session) => (
                  <SelectItem key={session.id} value={session.id}>
                    {session.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:w-1/3">
            <Label htmlFor="party">Partido</Label>
            <Select value={selectedParty} onValueChange={setSelectedParty}>
              <SelectTrigger id="party">
                <SelectValue placeholder="Selecione um partido" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default-party">Todos os partidos</SelectItem>
                <SelectItem value="partido-a">Partido A</SelectItem>
                <SelectItem value="partido-b">Partido B</SelectItem>
                <SelectItem value="partido-c">Partido C</SelectItem>
                <SelectItem value="partido-d">Partido D</SelectItem>
                <SelectItem value="partido-e">Partido E</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:w-1/3">
            <Label>Período</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                        {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                      </>
                    ) : (
                      format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                    )
                  ) : (
                    <span>Selecione um período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            {dateRange.from && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 h-auto p-0 text-xs text-muted-foreground"
                onClick={() => setDateRange({ from: undefined, to: undefined })}
              >
                <X className="mr-1 h-3 w-3" />
                Limpar período
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar todos os filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

