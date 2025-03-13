"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for party voting results
const partyResults = [
  {
    id: "partido-a",
    name: "Partido A",
    color: "#4f46e5", // indigo-600
    members: 12,
    votes: {
      yes: 10,
      no: 1,
      abstain: 1,
    },
  },
  {
    id: "partido-b",
    name: "Partido B",
    color: "#0891b2", // cyan-600
    members: 8,
    votes: {
      yes: 2,
      no: 6,
      abstain: 0,
    },
  },
  {
    id: "partido-c",
    name: "Partido C",
    color: "#16a34a", // green-600
    members: 6,
    votes: {
      yes: 4,
      no: 1,
      abstain: 1,
    },
  },
  {
    id: "partido-d",
    name: "Partido D",
    color: "#ca8a04", // yellow-600
    members: 5,
    votes: {
      yes: 0,
      no: 5,
      abstain: 0,
    },
  },
  {
    id: "partido-e",
    name: "Partido E",
    color: "#dc2626", // red-600
    members: 4,
    votes: {
      yes: 3,
      no: 0,
      abstain: 1,
    },
  },
]

interface PartyResultsProps {
  searchQuery: string
  selectedVoting: string | null
}

export default function PartyResults({ searchQuery, selectedVoting }: PartyResultsProps) {
  const [chartType, setChartType] = useState<"bar" | "pie">("bar")
  const barChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)

  // Filter results based on search query
  const filteredResults = partyResults.filter((party) => party.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Calculate totals
  const totalMembers = filteredResults.reduce((sum, party) => sum + party.members, 0)
  const totalYesVotes = filteredResults.reduce((sum, party) => sum + party.votes.yes, 0)
  const totalNoVotes = filteredResults.reduce((sum, party) => sum + party.votes.no, 0)
  const totalAbstainVotes = filteredResults.reduce((sum, party) => sum + party.votes.abstain, 0)

  // Sort parties by number of members (descending)
  const sortedResults = [...filteredResults].sort((a, b) => b.members - a.members)

  // Draw bar chart
  useEffect(() => {
    if (!barChartRef.current) return

    const canvas = barChartRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const chartWidth = canvas.width - 60 // Leave space for labels
    const chartHeight = canvas.height - 60 // Leave space for labels
    const barWidth = chartWidth / (sortedResults.length * 3) // 3 bars per party with spacing
    const spacing = barWidth / 2
    const startX = 50
    const startY = canvas.height - 40

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(startX, 20)
    ctx.lineTo(startX, startY)
    ctx.lineTo(canvas.width - 10, startY)
    ctx.strokeStyle = "#9ca3af" // gray-400
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw y-axis labels
    ctx.fillStyle = "#6b7280" // gray-500
    ctx.font = "10px Arial"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"

    const maxMembers = Math.max(...sortedResults.map((party) => party.members))
    const yScale = chartHeight / maxMembers

    for (let i = 0; i <= maxMembers; i += Math.ceil(maxMembers / 5)) {
      const y = startY - i * yScale
      ctx.fillText(i.toString(), startX - 5, y)

      // Draw horizontal grid line
      ctx.beginPath()
      ctx.moveTo(startX, y)
      ctx.lineTo(canvas.width - 10, y)
      ctx.strokeStyle = "#e5e7eb" // gray-200
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // Draw bars and x-axis labels
    sortedResults.forEach((party, index) => {
      const x = startX + index * (barWidth * 3 + spacing)

      // Yes votes
      ctx.fillStyle = "#22c55e" // green-500
      const yesHeight = party.votes.yes * yScale
      ctx.fillRect(x, startY - yesHeight, barWidth, yesHeight)

      // No votes
      ctx.fillStyle = "#ef4444" // red-500
      const noHeight = party.votes.no * yScale
      ctx.fillRect(x + barWidth, startY - noHeight, barWidth, noHeight)

      // Abstain votes
      ctx.fillStyle = "#f59e0b" // amber-500
      const abstainHeight = party.votes.abstain * yScale
      ctx.fillRect(x + barWidth * 2, startY - abstainHeight, barWidth, abstainHeight)

      // Party label
      ctx.fillStyle = "#6b7280" // gray-500
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(party.name, x + barWidth * 1.5, startY + 5)

      // Color indicator
      ctx.fillStyle = party.color
      ctx.fillRect(x + barWidth * 1.5 - 10, startY + 20, 20, 5)
    })

    // Draw legend
    const legendX = canvas.width - 100
    const legendY = 30

    // Yes votes
    ctx.fillStyle = "#22c55e" // green-500
    ctx.fillRect(legendX, legendY, 15, 15)
    ctx.fillStyle = "#000"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("A favor", legendX + 20, legendY + 7.5)

    // No votes
    ctx.fillStyle = "#ef4444" // red-500
    ctx.fillRect(legendX, legendY + 20, 15, 15)
    ctx.fillStyle = "#000"
    ctx.fillText("Contra", legendX + 20, legendY + 27.5)

    // Abstain votes
    ctx.fillStyle = "#f59e0b" // amber-500
    ctx.fillRect(legendX, legendY + 40, 15, 15)
    ctx.fillStyle = "#000"
    ctx.fillText("Abstenção", legendX + 20, legendY + 47.5)
  }, [sortedResults, chartType])

  // Draw pie chart
  useEffect(() => {
    if (!pieChartRef.current) return

    const canvas = pieChartRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 60

    // Draw pie slices for each party
    let startAngle = 0

    sortedResults.forEach((party) => {
      const totalPartyVotes = party.votes.yes + party.votes.no + party.votes.abstain
      const partyAngle = (totalPartyVotes / totalMembers) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + partyAngle)
      ctx.closePath()
      ctx.fillStyle = party.color
      ctx.fill()

      // Draw party label if slice is large enough
      if (partyAngle > 0.2) {
        const labelAngle = startAngle + partyAngle / 2
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)

        ctx.fillStyle = "#fff"
        ctx.font = "bold 12px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(party.name, labelX, labelY)
      }

      startAngle += partyAngle
    })

    // Draw center circle (donut chart)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()

    // Draw total in center
    ctx.fillStyle = "#000"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`Total: ${totalMembers}`, centerX, centerY - 10)
    ctx.font = "12px Arial"
    ctx.fillText("parlamentares", centerX, centerY + 10)

    // Draw legend
    const legendX = 20
    const legendY = canvas.height - 100

    sortedResults.forEach((party, index) => {
      const y = legendY + index * 20

      ctx.fillStyle = party.color
      ctx.fillRect(legendX, y, 15, 15)

      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(`${party.name} (${party.members})`, legendX + 20, y + 7.5)
    })
  }, [sortedResults, totalMembers, chartType])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Distribuição de Votos por Partido</CardTitle>
            <Tabs
              defaultValue="bar"
              className="mt-2 sm:mt-0"
              onValueChange={(value) => setChartType(value as "bar" | "pie")}
            >
              <TabsList className="h-8">
                <TabsTrigger value="bar" className="text-xs">
                  Gráfico de Barras
                </TabsTrigger>
                <TabsTrigger value="pie" className="text-xs">
                  Gráfico de Pizza
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative h-[400px] w-full">
            <canvas
              ref={barChartRef}
              width={800}
              height={400}
              className={`absolute inset-0 h-full w-full ${chartType === "bar" ? "block" : "hidden"}`}
            />
            <canvas
              ref={pieChartRef}
              width={800}
              height={400}
              className={`absolute inset-0 h-full w-full ${chartType === "pie" ? "block" : "hidden"}`}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Partido</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partido</TableHead>
                <TableHead>Parlamentares</TableHead>
                <TableHead>A favor</TableHead>
                <TableHead>Contra</TableHead>
                <TableHead>Abstenção</TableHead>
                <TableHead>Orientação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedResults.map((party) => (
                <TableRow key={party.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: party.color }} />
                      {party.name}
                    </div>
                  </TableCell>
                  <TableCell>{party.members}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2 font-medium">{party.votes.yes}</span>
                      <Progress
                        value={(party.votes.yes / party.members) * 100}
                        className="h-2 w-16 bg-muted"
                        indicatorClassName="bg-green-500"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2 font-medium">{party.votes.no}</span>
                      <Progress
                        value={(party.votes.no / party.members) * 100}
                        className="h-2 w-16 bg-muted"
                        indicatorClassName="bg-red-500"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2 font-medium">{party.votes.abstain}</span>
                      <Progress
                        value={(party.votes.abstain / party.members) * 100}
                        className="h-2 w-16 bg-muted"
                        indicatorClassName="bg-amber-500"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {party.votes.yes > party.votes.no ? (
                      <Badge className="bg-green-500">A favor</Badge>
                    ) : party.votes.no > party.votes.yes ? (
                      <Badge className="bg-red-500">Contra</Badge>
                    ) : (
                      <Badge variant="outline">Liberado</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo da Votação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-4">
              <div className="text-sm font-medium text-green-600">A favor</div>
              <div className="mt-1 flex items-baseline">
                <div className="text-3xl font-bold text-green-600">{totalYesVotes}</div>
                <div className="ml-2 text-sm text-green-600">({Math.round((totalYesVotes / totalMembers) * 100)}%)</div>
              </div>
            </div>

            <div className="rounded-lg bg-red-50 p-4">
              <div className="text-sm font-medium text-red-600">Contra</div>
              <div className="mt-1 flex items-baseline">
                <div className="text-3xl font-bold text-red-600">{totalNoVotes}</div>
                <div className="ml-2 text-sm text-red-600">({Math.round((totalNoVotes / totalMembers) * 100)}%)</div>
              </div>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <div className="text-sm font-medium text-amber-600">Abstenção</div>
              <div className="mt-1 flex items-baseline">
                <div className="text-3xl font-bold text-amber-600">{totalAbstainVotes}</div>
                <div className="ml-2 text-sm text-amber-600">
                  ({Math.round((totalAbstainVotes / totalMembers) * 100)}%)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

