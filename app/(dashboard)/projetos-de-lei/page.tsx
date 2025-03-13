"use client"

import { useState } from "react"
import { FilePlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadForm from "./upload-form"
import DocumentList from "./document-list"

export default function ProjetosLei() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Projetos de Lei</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar projetos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => document.getElementById("upload-tab")?.click()}>
            <FilePlus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista de Projetos</TabsTrigger>
          <TabsTrigger value="upload" id="upload-tab">
            Enviar Novo Projeto
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lista">
          <DocumentList searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="upload">
          <UploadForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

