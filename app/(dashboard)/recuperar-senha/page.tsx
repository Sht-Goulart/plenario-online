"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function RecuperarSenha() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 flex items-center space-x-2">
        <Building2 className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">PLENÁRIO ON-LINE</h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recuperação de Senha</CardTitle>
          <CardDescription>
            {!isSubmitted
              ? "Informe seu e-mail para receber instruções de recuperação de senha."
              : "Verifique seu e-mail para redefinir sua senha."}
          </CardDescription>
        </CardHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Instruções"}
              </Button>
              <Link href="/" className="flex items-center text-sm text-primary hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Voltar para o login
              </Link>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium">E-mail Enviado</h3>
              <p className="text-center text-muted-foreground">Enviamos instruções de recuperação de senha para:</p>
              <p className="font-medium">{email}</p>
            </div>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/">Voltar para o login</Link>
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Não recebeu o e-mail?{" "}
                <Button variant="link" className="h-auto p-0 text-sm" onClick={() => setIsSubmitted(false)}>
                  Tentar novamente
                </Button>
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

