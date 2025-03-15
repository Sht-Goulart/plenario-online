"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function AccountInfo() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock account data
  const accountData = {
    created: "15/03/2020",
    lastLogin: "12/03/2023",
    status: "Ativo",
    accessLevel: "Membro",
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
          <CardDescription>Detalhes sobre sua conta no sistema.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Criação</p>
              <p>{accountData.created}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Último Acesso</p>
              <p>{accountData.lastLogin}</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <div className="mt-1 flex items-center">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <p>{accountData.status}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nível de Acesso</p>
              <p>{accountData.accessLevel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>Altere sua senha para manter sua conta segura.</CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordChange}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirmar Nova Senha</Label>
              <Input id="confirm-new-password" type="password" required />
            </div>
            <div className="flex items-start space-x-2 rounded-md bg-amber-50 p-3 text-amber-800">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <div className="text-sm">
                <p>Sua senha deve ter pelo menos:</p>
                <ul className="ml-4 list-disc">
                  <li>8 caracteres</li>
                  <li>Uma letra maiúscula</li>
                  <li>Um número</li>
                  <li>Um caractere especial</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Atualizando..." : "Atualizar Senha"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

