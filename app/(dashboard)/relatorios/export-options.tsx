"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { Download, FileText, FileSpreadsheet } from "lucide-react"

export default function ExportOptions() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = (format: "pdf" | "csv") => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)

      toast({
        title: "Relatório exportado",
        description: `O relatório foi exportado com sucesso no formato ${format.toUpperCase()}.`,
      })
    }, 1500)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Exportando..." : "Exportar"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Exportar como PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Exportar como CSV</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

