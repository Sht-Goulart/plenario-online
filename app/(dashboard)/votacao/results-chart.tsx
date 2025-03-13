"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartProps {
  data: {
    yes: number
    no: number
    abstain: number
  }
  totalVotes: number
}

export default function ResultsChart({ data, totalVotes }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Calculate angles
    const total = data.yes + data.no + data.abstain
    if (total === 0) return

    const yesAngle = (data.yes / total) * 2 * Math.PI
    const noAngle = (data.no / total) * 2 * Math.PI
    const abstainAngle = (data.abstain / total) * 2 * Math.PI

    // Draw pie chart
    let startAngle = 0

    // Yes slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + yesAngle)
    ctx.closePath()
    ctx.fillStyle = "#22c55e" // green-500
    ctx.fill()

    startAngle += yesAngle

    // No slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + noAngle)
    ctx.closePath()
    ctx.fillStyle = "#ef4444" // red-500
    ctx.fill()

    startAngle += noAngle

    // Abstain slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + abstainAngle)
    ctx.closePath()
    ctx.fillStyle = "#f59e0b" // amber-500
    ctx.fill()

    // Draw center circle (donut chart)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()

    // Draw text in center
    ctx.fillStyle = "#000"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(total.toString(), centerX, centerY - 15)

    ctx.font = "14px Arial"
    ctx.fillText("votos", centerX, centerY + 15)
  }, [data, totalVotes])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Resultado da Votação</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <canvas ref={canvasRef} width={200} height={200} className="max-w-full" />
      </CardContent>
    </Card>
  )
}

