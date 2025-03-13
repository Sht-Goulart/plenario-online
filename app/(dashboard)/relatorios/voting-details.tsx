"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ThumbsUp, ThumbsDown, Minus, Search } from "lucide-react"

// Mock data for voting details
const votingDetails = [
  {
    id: "1",
    name: "João Silva",
    party: "Partido A",
    position: "Vereador",
    vote: "yes",
    timestamp: "2023-06-22T15:35:22",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    party: "Partido B",
    position: "Vereadora",
    vote: "no",
    timestamp: "2023-06-22T15:36:45",
  },
  {
    id: "3",
    name: "Pedro Santos",
    party: "Partido A",
    position: "Vereador",
    vote: "yes",
    timestamp: "2023-06-22T15:37:12",
  },
  {
    id: "4",
    name: "Ana Costa",
    party: "Partido C",
    position: "Vereadora",
    vote: "abstain",
    timestamp: "2023-06-22T15:38:30",
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    party: "Partido B",
    position: "Vereador",
    vote: "no",
    timestamp: "2023-06-22T15:39:15",
  },
  {
    id: "6",
    name: "Lúcia Mendes",
    party: "Partido D",
    position: "Vereadora",
    vote: "no",
    timestamp: "2023-06-22T15:40:22",
  },
  {
    id: "7",
    name: "Roberto Alves",
    party: "Partido A",
    position: "Vereador",
    vote: "yes",
    timestamp: "2023-06-22T15:41:05",
  },
  {
    id: "8",
    name: "Fernanda Lima",
    party: "Partido C",
    position: "Vereadora",
    vote: "yes",
    timestamp: "2023-06-22T15:42:18",
  },
  {
    id: "9",
    name: "Marcelo Gomes",
    party: "Partido E",
    position: "Vereador",
    vote: "yes",
    timestamp: "2023-06-22T15:43:30",
  },
  {
    id: "10",
    name: "Juliana Pereira",
    party: "Partido D",
    position: "Vereadora",
    vote: "no",
    timestamp: "2023-06-22T15:44:45",
  },
]

interface VotingDetailsProps {
  searchQuery: string
  selectedVoting: string | null
}

export default function VotingDetails({ searchQuery, selectedVoting }: VotingDetailsProps) {
  const [detailsSearchQuery, setDetailsSearchQuery] = useState("")

  // Filter results based on search queries
  const filteredDetails = votingDetails.filter(
    (detail) =>
      (detail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        detail.party.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (detail.name.toLowerCase().includes(detailsSearchQuery.toLowerCase()) ||
        detail.party.toLowerCase().includes(detailsSearchQuery.toLowerCase())),
  )

  const getVoteIcon = (vote: string) => {
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

  const getVoteText = (vote: string) => {
    switch (vote) {
      case "yes":
        return <Badge className="bg-green-500">A favor</Badge>
      case "no":
        return <Badge className="bg-red-500">Contra</Badge>
      case "abstain":
        return <Badge className="bg-amber-500">Abstenção</Badge>
      default:
        return null
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle>Detalhes da Votação</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar parlamentar..."
              className="pl-8"
              value={detailsSearchQuery}
              onChange={(e) => setDetailsSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parlamentar</TableHead>
                <TableHead>Partido</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Voto</TableHead>
                <TableHead>Horário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDetails.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDetails.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell className="font-medium">{detail.name}</TableCell>
                    <TableCell>{detail.party}</TableCell>
                    <TableCell>{detail.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getVoteIcon(detail.vote)}
                        <span>{getVoteText(detail.vote)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatTimestamp(detail.timestamp)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

