"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, ThumbsDown, Minus, ChevronRight } from "lucide-react"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

// Mock data for voting history
const initialHistoryItems = [
  {
    id: "h1",
    title: "Projeto de Lei nº 123/2023 - Revitalização de Praças Públicas",
    description: "Votação para aprovação do projeto de revitalização das praças públicas do município.",
    date: "2023-06-15",
    startTime: "2023-06-15T14:00:00",
    endTime: "2023-06-15T15:00:00",
    participants: 25,
    totalVoted: 23,
    result: "approved",
    votes: {
      yes: 15,
      no: 5,
      abstain: 3,
    },
    userVote: "yes",
  },
  {
    id: "h2",
    title: "Projeto de Lei nº 124/2023 - Incentivos Fiscais para Pequenas Empresas",
    description: "Votação para aprovação de incentivos fiscais para pequenas empresas do município.",
    date: "2023-06-10",
    startTime: "2023-06-10T10:00:00",
    endTime: "2023-06-10T11:30:00",
    participants: 25,
    totalVoted: 20,
    result: "rejected",
    votes: {
      yes: 8,
      no: 10,
      abstain: 2,
    },
    userVote: "no",
  },
  {
    id: "h3",
    title: "Projeto de Lei nº 122/2023 - Programa de Arborização Urbana",
    description: "Votação para implementação do programa de arborização urbana no município.",
    date: "2023-06-05",
    startTime: "2023-06-05T14:00:00",
    endTime: "2023-06-05T15:30:00",
    participants: 25,
    totalVoted: 22,
    result: "approved",
    votes: {
      yes: 18,
      no: 2,
      abstain: 2,
    },
    userVote: "yes",
  },
  {
    id: "h4",
    title: "Projeto de Lei nº 121/2023 - Regulamentação de Feiras Livres",
    description: "Votação para aprovação da regulamentação de feiras livres no município.",
    date: "2023-06-01",
    startTime: "2023-06-01T09:00:00",
    endTime: "2023-06-01T10:30:00",
    participants: 25,
    totalVoted: 21,
    result: "approved",
    votes: {
      yes: 16,
      no: 3,
      abstain: 2,
    },
    userVote: "abstain",
  },
]

type HistoryItem = (typeof initialHistoryItems)[0]

interface VotingHistoryProps {
  searchQuery: string
}

export default function VotingHistory({ searchQuery }: VotingHistoryProps) {
  const [historyItems] = useState<HistoryItem[]>(initialHistoryItems)

  // Filter history items based on search query
  const filteredItems = historyItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group history items by date
  const groupedItems: Record<string, HistoryItem[]> = {}

  filteredItems.forEach((item) => {
    if (!groupedItems[item.date]) {
      groupedItems[item.date] = []
    }
    groupedItems[item.date].push(item)
  })

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedItems).sort((a, b) => {
    const dateA = a.split("/").reverse().join("-")
    const dateB = b.split("/").reverse().join("-")
    return dateB.localeCompare(dateA)
  })

  const getVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0
    return Math.round((votes / total) * 100)
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Aprovado</Badge>
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejeitado</Badge>
      default:
        return <Badge variant="secondary">{result}</Badge>
    }
  }

  const getUserVoteIcon = (vote: string) => {
    switch (vote) {
      case "yes":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "no":
        return <ThumbsDown className="h-4 w-4 text-red-500" />
      case "abstain":
        return <Minus className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {sortedDates.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-muted-foreground"
          />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma votação encontrada</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Não encontramos nenhum histórico de votação com os critérios de busca informados.
          </p>
        </div>
      ) : (
        sortedDates.map((date) => (
          <div key={date}>
            <div className="mb-4 flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="ml-2 text-lg font-semibold">
                {format(parseISO(date), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </h3>
            </div>

            <div className="space-y-3">
              {groupedItems[date].map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            {getResultBadge(item.result)}
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <span>Seu voto:</span>
                              {getUserVoteIcon(item.userVote)}
                            </div>
                          </div>
                          <h3 className="mt-1 font-medium">{item.title}</h3>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(parseISO(item.startTime), "HH:mm", { locale: ptBR })} -{" "}
                          {format(parseISO(item.endTime), "HH:mm", { locale: ptBR })}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{item.description}</p>

                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="rounded-md bg-green-100 p-2 text-green-800">
                          <div className="font-medium">A favor</div>
                          <div className="mt-1 text-lg font-bold">{item.votes.yes}</div>
                          <div className="text-xs">{getVotePercentage(item.votes.yes, item.totalVoted)}%</div>
                        </div>
                        <div className="rounded-md bg-red-100 p-2 text-red-800">
                          <div className="font-medium">Contra</div>
                          <div className="mt-1 text-lg font-bold">{item.votes.no}</div>
                          <div className="text-xs">{getVotePercentage(item.votes.no, item.totalVoted)}%</div>
                        </div>
                        <div className="rounded-md bg-gray-100 p-2 text-gray-800">
                          <div className="font-medium">Abstenções</div>
                          <div className="mt-1 text-lg font-bold">{item.votes.abstain}</div>
                          <div className="text-xs">{getVotePercentage(item.votes.abstain, item.totalVoted)}%</div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {item.totalVoted} de {item.participants} participantes votaram
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Detalhes
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

