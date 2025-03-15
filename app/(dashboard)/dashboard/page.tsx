"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Building2, User, Settings, LogOut, Menu, X } from "lucide-react"
import ProfileForm from "./profile-form"
import AccountInfo from "./account-info"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"profile" | "account">("profile")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // Simulate logout
    router.push("/")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b bg-white p-4 md:hidden">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">PLENÁRIO ON-LINE</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } w-full border-r bg-white p-4 md:block md:w-64 md:min-h-screen`}
      >
        <div className="hidden items-center space-x-2 md:mb-8 md:flex">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">PLENÁRIO ON-LINE</h1>
        </div>

        <div className="space-y-1">
          <Button
            variant={activeTab === "profile" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("profile")
              setIsMobileMenuOpen(false)
            }}
          >
            <User className="mr-2 h-4 w-4" />
            Perfil
          </Button>
          <Button
            variant={activeTab === "account" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("account")
              setIsMobileMenuOpen(false)
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            Informações da Conta
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold">
            {activeTab === "profile" ? "Editar Perfil" : "Informações da Conta"}
          </h2>

          {activeTab === "profile" ? <ProfileForm /> : <AccountInfo />}
        </div>
      </div>
    </div>
  )
}

