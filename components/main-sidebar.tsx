"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, LayoutDashboard, FileText, Calendar, Vote, BarChart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function MainSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="none" className="border-r">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-3">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">PLENÁRIO ON-LINE</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/projetos-de-lei"}>
              <Link href="/projetos-de-lei">
                <FileText className="mr-2 h-4 w-4" />
                <span>Projetos de Lei</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/agenda"}>
              <Link href="/agenda">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Agenda</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/votacao"}>
              <Link href="/votacao">
                <Vote className="mr-2 h-4 w-4" />
                <span>Votação</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/relatorios"}>
              <Link href="/relatorios">
                <BarChart className="mr-2 h-4 w-4" />
                <span>Relatórios</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            asChild
          >
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </Link>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

