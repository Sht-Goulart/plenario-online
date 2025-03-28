"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Clock, Users, FileText, ChevronRight, AlertCircle } from "lucide-react"
import { format, isSameDay, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

// Mock data for agenda items (same as in agenda-list.tsx)
const initialAgendaItems = [
  {
    id: "1",
    title: "Votação do Projeto de Lei nº 123/2023 - Revitalização de Praças Públicas",
    date: "2023-06-15T14:00:00",
    status: "Concluído",
    type: "Ordinária",
    location: "Plenário Principal",
    description: "Votação para aprovação do projeto de revitalização das praças públicas do município.",
    participants: 23,
    documents: [
      { id: "doc1", name: "Projeto de Lei nº 123/2023", type: "pdf" },
      { id: "doc2", name: "Parecer da Comissão de Urbanismo", type: "docx" },
    ],
    result: {
      approved: true,
      votes: { favor: 15, against: 5, abstention: 3 },
    },
  },
  {
    id: "2",
    title: "Discussão sobre o Orçamento Municipal 2024",
    date: "2023-06-20T10:00:00",
    status: "Pendente",
    type: "Extraordinária",
    location: "Plenário Principal",
    description: "Primeira discussão sobre o orçamento municipal para o ano de 2024.",
    participants: 25,
    documents: [
      { id: "doc3", name: "Proposta de Orçamento 2024", type: "pdf" },
      { id: "doc4", name: "Relatório Financeiro 2023", type: "xlsx" },
    ],
  },
  {
    id: "3",
    title: "Votação do Projeto de Lei nº 125/2023 - Programa de Coleta Seletiva",
    date: "2023-06-22T15:30:00",
    status: "Em votação",
    type: "Ordinária",
    location: "Plenário Principal",
    description: "Votação para implementação do programa de coleta seletiva no município.",
    participants: 22,
    documents: [
      { id: "doc5", name: "Projeto de Lei nº 125/2023", type: "pdf" },
      { id: "doc6", name: "Estudo de Impacto Ambiental", type: "pdf" },
    ],
  },
  {
    id: "4",
    title: "Homenagem aos Servidores Públicos",
    date: "2023-06-28T18:00:00",
    status: "Pendente",
    type: "Solene",
    location: "Auditório Municipal",
    description: "Sessão solene em homenagem aos servidores públicos municipais com mais de 30 anos de serviço.",
    participants: 50,
    documents: [
      { id: "doc7", name: "Lista de Homenageados", type: "pdf" },
      { id: "doc8", name: "Programação da Cerimônia", type: "docx" },
    ],
  },
  {
    id: "5",
    title: "Votação do Projeto de Lei nº 126/2023 - Reforma Administrativa",
    date: "2023-07-05T14:00:00",
    status: "Pendente",
    type: "Ordinária",
    location: "Plenário Principal",
    description: "Votação para aprovação da reforma administrativa municipal.",
    participants: 25,
    documents: [
      { id: "doc9", name: "Projeto de Lei nº 126/2023", type: "pdf" },
      { id: "doc10", name: "Parecer Jurídico", type: "pdf" },
    ],
  },
  {
    id: "6",
    title: "Audiência Pública - Plano Diretor",
    date: "2023-07-10T09:00:00",
    status: "Pendente",
    type: "Extraordinária",
    location: "Auditório Municipal",
    description: "Audiência pública para discussão das alterações no Plano Diretor do município.",
    participants: 100,
    documents: [
      { id: "doc11", name: "Proposta de Alteração do Plano Diretor", type: "pdf" },
      { id: "doc12", name: "Estudos Técnicos", type: "pdf" },
    ],
  },
]

type AgendaItem = (typeof initialAgendaItems)[0]

interface AgendaCalendarProps {
  searchQuery: string
  selectedStatus: string[]
  selectedTypes: string[]
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
}

export default function AgendaCalendar({ searchQuery, selectedStatus, selectedTypes, dateRange }: AgendaCalendarProps) {
  const [agendaItems] = useState<AgendaItem[]>(initialAgendaItems)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedItem, setSelectedItem] = useState<AgendaItem | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Filter agenda items based on search query and filters
  const filteredItems = agendaItems.filter((item) => {
    // Search filter
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(item.status)

    // Type filter
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type)

    return matchesSearch && matchesStatus && matchesType
  })

  // Get items for the selected date
  const itemsForSelectedDate = selectedDate
    ? filteredItems.filter((item) => isSameDay(parseISO(item.date), selectedDate))
    : []

  // Function to check if a date has agenda items
  const hasAgendaItems = (date: Date) => {
    return filteredItems.some((item) => isSameDay(parseISO(item.date), date))
  }

  const handleViewDetails = (item: AgendaItem) => {
    setSelectedItem(item)
    setDetailsOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Concluído":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "Em votação":
        return <Badge className="bg-amber-500 hover:bg-amber-600">{status}</Badge>
      case "Pendente":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Ordinária":
        return <Badge variant="outline">{type}</Badge>
      case "Extraordinária":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            {type}
          </Badge>
        )
      case "Solene":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            {type}
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <Card>
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            className="mx-auto"
            modifiers={{
              hasAgenda: (date) => hasAgendaItems(date),
            }}
            modifiersClassNames={{
              hasAgenda: "bg-primary/10 font-bold text-primary",
            }}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-medium">
          {selectedDate ? (
            <>
              Pautas para {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              {itemsForSelectedDate.length > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({itemsForSelectedDate.length} {itemsForSelectedDate.length === 1 ? "pauta" : "pautas"})
                </span>
              )}
            </>
          ) : (
            "Selecione uma data"
          )}
        </h3>

        {itemsForSelectedDate.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">Não há pautas agendadas para esta data.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {itemsForSelectedDate.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{format(parseISO(item.date), "HH:mm")}</span>
                    </div>
                    <div className="flex gap-1">{getStatusBadge(item.status)}</div>
                  </div>

                  <h4 className="font-medium line-clamp-2 mb-2">{item.title}</h4>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-muted-foreground">{item.location}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs"
                      onClick={() => handleViewDetails(item)}
                    >
                      Detalhes
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Details Dialog (same as in agenda-list.tsx) */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedItem.status)}
                  {getTypeBadge(selectedItem.type)}
                </div>
                <DialogTitle className="mt-2 text-xl">{selectedItem.title}</DialogTitle>
                <DialogDescription>{selectedItem.description}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Data e Hora</p>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p>
                        {format(parseISO(selectedItem.date), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às{" "}
                        {format(parseISO(selectedItem.date), "HH:mm")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Local</p>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-muted-foreground"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p>{selectedItem.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Participantes</p>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p>{selectedItem.participants} participantes confirmados</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="font-medium">Documentos</p>
                  <div className="space-y-2">
                    {selectedItem.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between rounded-md border p-2">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{doc.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {doc.type.toUpperCase()}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                          <span className="ml-1">Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedItem.result && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <p className="font-medium">Resultado da Votação</p>
                      <div className="rounded-md bg-muted p-4">
                        <div className="mb-2 flex items-center">
                          {selectedItem.result.approved ? (
                            <Badge className="bg-green-500">Aprovado</Badge>
                          ) : (
                            <Badge variant="destructive">Rejeitado</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-md bg-green-100 p-2 text-green-800">
                            <p className="text-sm font-medium">A favor</p>
                            <p className="text-xl font-bold">{selectedItem.result.votes.favor}</p>
                          </div>
                          <div className="rounded-md bg-red-100 p-2 text-red-800">
                            <p className="text-sm font-medium">Contra</p>
                            <p className="text-xl font-bold">{selectedItem.result.votes.against}</p>
                          </div>
                          <div className="rounded-md bg-gray-100 p-2 text-gray-800">
                            <p className="text-sm font-medium">Abstenções</p>
                            <p className="text-xl font-bold">{selectedItem.result.votes.abstention}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedItem.status === "Pendente" && (
                  <div className="rounded-md bg-amber-50 p-3 text-amber-800">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div className="text-sm">
                        <p>
                          Esta pauta ainda não foi votada. A sessão está agendada para{" "}
                          {format(parseISO(selectedItem.date), "dd/MM/yyyy 'às' HH:mm")}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Fechar
                </Button>
                {selectedItem.status === "Em votação" && <Button>Acompanhar Votação</Button>}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

