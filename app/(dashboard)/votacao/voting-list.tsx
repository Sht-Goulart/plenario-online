"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { AlertCircle, Clock, Users, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import { format, parseISO, differenceInSeconds } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Vote } from "lucide-react"

// Mock data for voting items
const initialVotingItems = [
  {
    id: "1",
    title: "Projeto de Lei nº 125/2023 - Programa de Coleta Seletiva",
    description: "Votação para implementação do programa de coleta seletiva no município.",
    startTime: "2023-06-22T15:30:00",
    endTime: "2023-06-22T16:30:00",
    participants: 25,
    totalVoted: 18,
    votes: {
      yes: 12,
      no: 4,
      abstain: 2,
    },
    userVote: null,
  },
  {
    id: "2",
    title: "Projeto de Lei nº 126/2023 - Reforma Administrativa",
    description: "Votação para aprovação da reforma administrativa municipal.",
    startTime: "2023-06-22T14:00:00",
    endTime: "2023-06-22T17:00:00",
    participants: 25,
    totalVoted: 15,
    votes: {
      yes: 8,
      no: 5,
      abstain: 2,
    },
    userVote: null,
  },
  {
    id: "3",
    title: "Projeto de Lei nº 127/2023 - Orçamento Municipal 2024",
    description: "Votação para aprovação do orçamento municipal para o ano de 2024.",
    startTime: "2023-06-22T10:00:00",
    endTime: "2023-06-22T18:00:00",
    participants: 25,
    totalVoted: 10,
    votes: {
      yes: 6,
      no: 2,
      abstain: 2,
    },
    userVote: null,
  },
]

type VotingItem = (typeof initialVotingItems)[0]
type VoteOption = "yes" | "no" | "abstain" | null

interface VotingListProps {
  searchQuery: string
}

export default function VotingList({ searchQuery }: VotingListProps) {
  const [votingItems, setVotingItems] = useState<VotingItem[]>(initialVotingItems)
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({})

  // Filter voting items based on search query
  const filteredItems = votingItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Update time left for each voting item
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: Record<string, string> = {}

      votingItems.forEach((item) => {
        const now = new Date()
        const end = parseISO(item.endTime)

        if (now > end) {
          newTimeLeft[item.id] = "Encerrado"
          return
        }

        const diffInSeconds = differenceInSeconds(end, now)
        const hours = Math.floor(diffInSeconds / 3600)
        const minutes = Math.floor((diffInSeconds % 3600) / 60)
        const seconds = diffInSeconds % 60

        if (hours > 0) {
          newTimeLeft[item.id] = `${hours}h ${minutes}m ${seconds}s`
        } else if (minutes > 0) {
          newTimeLeft[item.id] = `${minutes}m ${seconds}s`
        } else {
          newTimeLeft[item.id] = `${seconds}s`
        }
      })

      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [votingItems])

  const handleVote = (itemId: string, vote: VoteOption) => {
    setVotingItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          // If user already voted, remove previous vote
          if (item.userVote) {
            item.votes[item.userVote]--
            item.totalVoted--
          }

          // Add new vote
          if (vote) {
            item.votes[vote]++
            item.totalVoted++
          }

          return {
            ...item,
            userVote: vote,
          }
        }
        return item
      }),
    )

    // Show toast notification
    if (vote) {
      const voteText = vote === "yes" ? "a favor" : vote === "no" ? "contra" : "abstenção"
      toast({
        title: "Voto registrado",
        description: `Seu voto de ${voteText} foi registrado com sucesso.`,
      })
    }
  }

  const getVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0
    return Math.round((votes / total) * 100)
  }

  return (
    <div className="space-y-6">
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Vote className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhuma votação encontrada</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Não encontramos nenhuma votação aberta com os critérios de busca informados.
          </p>
        </div>
      ) : (
        filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-muted p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{timeLeft[item.id] || "Calculando..."}</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <span>
                      {item.totalVoted} de {item.participants} votaram
                    </span>
                  </div>
                  <div>Início: {format(parseISO(item.startTime), "HH:mm", { locale: ptBR })}</div>
                  <div>Término: {format(parseISO(item.endTime), "HH:mm", { locale: ptBR })}</div>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-6 grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-medium">Resultados Parciais</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
                            <span>A favor</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              {item.votes.yes}/{item.totalVoted}
                            </Badge>
                            <span className="w-12 text-right font-medium">
                              {getVotePercentage(item.votes.yes, item.totalVoted)}%
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={getVotePercentage(item.votes.yes, item.totalVoted)}
                          className="h-2 bg-muted"
                          indicatorClassName="bg-green-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
                            <span>Contra</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              {item.votes.no}/{item.totalVoted}
                            </Badge>
                            <span className="w-12 text-right font-medium">
                              {getVotePercentage(item.votes.no, item.totalVoted)}%
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={getVotePercentage(item.votes.no, item.totalVoted)}
                          className="h-2 bg-muted"
                          indicatorClassName="bg-red-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Minus className="mr-2 h-4 w-4 text-amber-500" />
                            <span>Abstenção</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              {item.votes.abstain}/{item.totalVoted}
                            </Badge>
                            <span className="w-12 text-right font-medium">
                              {getVotePercentage(item.votes.abstain, item.totalVoted)}%
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={getVotePercentage(item.votes.abstain, item.totalVoted)}
                          className="h-2 bg-muted"
                          indicatorClassName="bg-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h4 className="mb-4 font-medium">Seu Voto</h4>

                    {item.userVote ? (
                      <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed p-6">
                        <div className="mb-2 rounded-full bg-primary/10 p-2">
                          {item.userVote === "yes" && <ThumbsUp className="h-6 w-6 text-green-500" />}
                          {item.userVote === "no" && <ThumbsDown className="h-6 w-6 text-red-500" />}
                          {item.userVote === "abstain" && <Minus className="h-6 w-6 text-amber-500" />}
                        </div>
                        <p className="text-center font-medium">
                          {item.userVote === "yes" && "Você votou a favor"}
                          {item.userVote === "no" && "Você votou contra"}
                          {item.userVote === "abstain" && "Você se absteve"}
                        </p>
                        <p className="mt-1 text-center text-sm text-muted-foreground">
                          Você pode alterar seu voto até o término da votação
                        </p>
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => handleVote(item.id, null)}>
                          Remover Voto
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-1 flex-col space-y-2">
                        <div className="rounded-md bg-amber-50 p-3 text-amber-800">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                            <div className="text-sm">
                              <p>
                                Você ainda não votou nesta pauta. Selecione uma das opções abaixo para registrar seu
                                voto.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid flex-1 grid-cols-3 gap-2">
                          <Button
                            className="flex flex-col items-center justify-center gap-2 bg-green-500 py-6 hover:bg-green-600"
                            onClick={() => handleVote(item.id, "yes")}
                          >
                            <ThumbsUp className="h-6 w-6" />
                            <span>A favor</span>
                          </Button>
                          <Button
                            className="flex flex-col items-center justify-center gap-2 bg-red-500 py-6 hover:bg-red-600"
                            onClick={() => handleVote(item.id, "no")}
                          >
                            <ThumbsDown className="h-6 w-6" />
                            <span>Contra</span>
                          </Button>
                          <Button
                            className="flex flex-col items-center justify-center gap-2 bg-amber-500 py-6 hover:bg-amber-600"
                            onClick={() => handleVote(item.id, "abstain")}
                          >
                            <Minus className="h-6 w-6" />
                            <span>Abstenção</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">ID da Votação: {item.id}</div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

