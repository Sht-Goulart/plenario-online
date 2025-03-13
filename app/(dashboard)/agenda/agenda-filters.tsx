"use client"

import type { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface AgendaFiltersProps {
  selectedStatus: string[]
  setSelectedStatus: Dispatch<SetStateAction<string[]>>
  selectedTypes: string[]
  setSelectedTypes: Dispatch<SetStateAction<string[]>>
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  setDateRange: Dispatch<
    SetStateAction<{
      from: Date | undefined
      to: Date | undefined
    }>
  >
  clearFilters: () => void
}

export default function AgendaFilters({
  selectedStatus,
  setSelectedStatus,
  selectedTypes,
  setSelectedTypes,
  dateRange,
  setDateRange,
  clearFilters,
}: AgendaFiltersProps) {
  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="space-y-2">
            <div className="font-medium">Status</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pendente"
                  checked={selectedStatus.includes("Pendente")}
                  onCheckedChange={() => toggleStatus("Pendente")}
                />
                <Label htmlFor="pendente" className="cursor-pointer">
                  Pendente
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="em-votacao"
                  checked={selectedStatus.includes("Em votação")}
                  onCheckedChange={() => toggleStatus("Em votação")}
                />
                <Label htmlFor="em-votacao" className="cursor-pointer">
                  Em votação
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="concluido"
                  checked={selectedStatus.includes("Concluído")}
                  onCheckedChange={() => toggleStatus("Concluído")}
                />
                <Label htmlFor="concluido" className="cursor-pointer">
                  Concluído
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Tipo</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ordinaria"
                  checked={selectedTypes.includes("Ordinária")}
                  onCheckedChange={() => toggleType("Ordinária")}
                />
                <Label htmlFor="ordinaria" className="cursor-pointer">
                  Sessão Ordinária
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extraordinaria"
                  checked={selectedTypes.includes("Extraordinária")}
                  onCheckedChange={() => toggleType("Extraordinária")}
                />
                <Label htmlFor="extraordinaria" className="cursor-pointer">
                  Sessão Extraordinária
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="solene"
                  checked={selectedTypes.includes("Solene")}
                  onCheckedChange={() => toggleType("Solene")}
                />
                <Label htmlFor="solene" className="cursor-pointer">
                  Sessão Solene
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Período</div>
            <div className="grid gap-2">
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

