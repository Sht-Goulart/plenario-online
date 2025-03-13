"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { FileText, MoreVertical, Download, Trash2, RefreshCw, Eye } from "lucide-react"

// Mock data for documents
const initialDocuments = [
  {
    id: "1",
    title: "Projeto de Lei nº 123/2023 - Revitalização de Praças Públicas",
    date: "15/03/2023",
    status: "Em análise",
    category: "Urbanística",
    urgency: "Média",
  },
  {
    id: "2",
    title: "Projeto de Lei nº 124/2023 - Incentivos Fiscais para Pequenas Empresas",
    date: "20/03/2023",
    status: "Aprovado",
    category: "Tributária",
    urgency: "Alta",
  },
  {
    id: "3",
    title: "Projeto de Lei nº 125/2023 - Programa de Coleta Seletiva",
    date: "25/03/2023",
    status: "Rejeitado",
    category: "Ambiental",
    urgency: "Baixa",
  },
  {
    id: "4",
    title: "Projeto de Lei nº 126/2023 - Orçamento Municipal 2024",
    date: "01/04/2023",
    status: "Em análise",
    category: "Orçamentária",
    urgency: "Urgente",
  },
  {
    id: "5",
    title: "Projeto de Lei nº 127/2023 - Reforma Administrativa",
    date: "05/04/2023",
    status: "Em análise",
    category: "Administrativa",
    urgency: "Média",
  },
]

type Document = (typeof initialDocuments)[0]

interface DocumentListProps {
  searchQuery: string
}

export default function DocumentList({ searchQuery }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "card">("table")

  // Filter documents based on search query
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteClick = (document: Document) => {
    setDocumentToDelete(document)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (documentToDelete) {
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete.id))
      toast({
        title: "Projeto excluído",
        description: "O projeto foi excluído com sucesso.",
      })
      setDeleteDialogOpen(false)
      setDocumentToDelete(null)
    }
  }

  const handleReplaceDocument = (id: string) => {
    toast({
      title: "Substituir documento",
      description: "Funcionalidade de substituição iniciada.",
    })
  }

  const handleDownload = (id: string) => {
    toast({
      title: "Download iniciado",
      description: "O download do documento começará em instantes.",
    })
  }

  const handleView = (id: string) => {
    toast({
      title: "Visualizando documento",
      description: "Abrindo visualização do documento.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "Rejeitado":
        return <Badge variant="destructive">{status}</Badge>
      case "Em análise":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "Urgente":
        return <Badge variant="destructive">{urgency}</Badge>
      case "Alta":
        return <Badge className="bg-orange-500 hover:bg-orange-600">{urgency}</Badge>
      case "Média":
        return <Badge className="bg-amber-500 hover:bg-amber-600">{urgency}</Badge>
      case "Baixa":
        return <Badge className="bg-green-500 hover:bg-green-600">{urgency}</Badge>
      default:
        return <Badge variant="secondary">{urgency}</Badge>
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-muted-foreground">
            {filteredDocuments.length} {filteredDocuments.length === 1 ? "projeto encontrado" : "projetos encontrados"}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "table" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="h-8 w-8 p-0"
            title="Visualização em tabela"
          >
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
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="3" x2="21" y1="9" y2="9" />
              <line x1="3" x2="21" y1="15" y2="15" />
              <line x1="9" x2="9" y1="3" y2="21" />
              <line x1="15" x2="15" y1="3" y2="21" />
            </svg>
          </Button>
          <Button
            variant={viewMode === "card" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setViewMode("card")}
            className="h-8 w-8 p-0"
            title="Visualização em cards"
          >
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
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
          </Button>
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <FileText className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum projeto encontrado</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Não encontramos nenhum projeto de lei com os critérios de busca informados.
          </p>
        </div>
      ) : viewMode === "table" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Urgência</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{getUrgencyBadge(doc.urgency)}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(doc.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Visualizar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(doc.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReplaceDocument(doc.id)}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          <span>Substituir</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(doc)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{doc.date}</span>
                    </div>
                    <h3 className="font-medium mb-2 line-clamp-2">{doc.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">{doc.category}</Badge>
                      {getUrgencyBadge(doc.urgency)}
                      {getStatusBadge(doc.status)}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(doc.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload(doc.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleReplaceDocument(doc.id)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        <span>Substituir</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(doc)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o projeto "{documentToDelete?.title}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

