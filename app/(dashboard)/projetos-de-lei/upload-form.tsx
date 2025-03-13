"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { FileText, Upload, AlertCircle } from "lucide-react"

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileError(null)

    if (!file) {
      setFileName(null)
      return
    }

    // Check file type
    const fileType = file.name.split(".").pop()?.toLowerCase()
    if (fileType !== "pdf" && fileType !== "docx") {
      setFileError("Apenas arquivos PDF ou DOCX são permitidos.")
      setFileName(null)
      e.target.value = ""
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFileError("O arquivo não pode exceder 10MB.")
      setFileName(null)
      e.target.value = ""
      return
    }

    setFileName(file.name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fileName) {
      setFileError("Por favor, selecione um arquivo para enviar.")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setFileName(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      toast({
        title: "Projeto enviado com sucesso",
        description: "Seu projeto de lei foi enviado e está em análise.",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enviar Novo Projeto de Lei</CardTitle>
        <CardDescription>Preencha as informações e anexe o documento do projeto de lei.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Projeto</Label>
            <Input id="title" placeholder="Ex: Projeto de Lei nº 123/2023" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrativa">Administrativa</SelectItem>
                  <SelectItem value="orcamentaria">Orçamentária</SelectItem>
                  <SelectItem value="tributaria">Tributária</SelectItem>
                  <SelectItem value="urbanistica">Urbanística</SelectItem>
                  <SelectItem value="ambiental">Ambiental</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="outra">Outra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Nível de Urgência</Label>
              <Select required>
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="Selecione o nível de urgência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva brevemente o objetivo do projeto de lei..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Documento (PDF ou DOCX)</Label>
            <div className="mt-1 flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0"
              >
                <Upload className="mr-2 h-4 w-4" />
                Selecionar Arquivo
              </Button>
              {fileName ? (
                <div className="flex items-center text-sm">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="truncate max-w-[250px]">{fileName}</span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Nenhum arquivo selecionado</span>
              )}
            </div>
            <Input
              id="file"
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              required
            />
            {fileError && (
              <div className="flex items-center mt-2 text-sm text-red-500">
                <AlertCircle className="mr-1 h-4 w-4" />
                {fileError}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">Formatos aceitos: PDF, DOCX. Tamanho máximo: 10MB.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Projeto"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

