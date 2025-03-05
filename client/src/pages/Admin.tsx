"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Users,
  Calendar,
  UserPlus,
  Filter,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Skeleton } from "@/Components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar"

import { useUserStore } from "../store/useUserStore"
import toast from "react-hot-toast"

const Admin = () => {
  const { users, isUsersLoading, getAllUsers } = useUserStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [activeTab, setActiveTab] = useState("users")
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  const handleFeature = () => {
    toast("This feature is not available yet");
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault()
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const getUsers = async () => {
    const response = await getAllUsers()
    if (!response) {
      navigate("/admin-login")
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    getUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const isNameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const userDate = new Date(user.createdAt)
    const isDateInRange = (!startDate || userDate >= new Date(startDate)) && (!endDate || userDate <= new Date(endDate))
    return isNameMatch && isDateInRange
  })

  // Calculate statistics
  const totalUsers = users.length
  const newUsersThisMonth = users.filter((user) => {
    const userDate = new Date(user.createdAt)
    const today = new Date()
    return userDate.getMonth() === today.getMonth() && userDate.getFullYear() === today.getFullYear()
  }).length
  const activeUsers = Math.floor(totalUsers * 0.75) // Placeholder calculation

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full mt-16">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 overflow-auto">
          <main className="p-6">
            {activeTab === "users" && (
              <>
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                  <StatCard
                    title="Total Users"
                    value={totalUsers.toString()}
                    icon={<Users className="h-5 w-5 text-blue-500" />}
                    description="All registered users"
                  />
                  <StatCard
                    title="New Users"
                    value={newUsersThisMonth.toString()}
                    icon={<UserPlus className="h-5 w-5 text-green-500" />}
                    description="Joined this month"
                  />
                  <StatCard
                    title="Active Users"
                    value={activeUsers.toString()}
                    icon={<BarChart3 className="h-5 w-5 text-purple-500" />}
                    description="Currently active"
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div className="relative w-full md:w-1/3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Search users by name..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-9 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
                      <kbd className="px-1.5 py-0.5 bg-muted border rounded text-[10px]">Ctrl</kbd>
                      <span>+</span>
                      <kbd className="px-1.5 py-0.5 bg-muted border rounded text-[10px]">K</kbd>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Date Range
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[340px]">
                        <DropdownMenuLabel>Filter by date</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="p-2 flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs mb-1.5">Start date</p>
                              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div>
                              <p className="text-xs mb-1.5">End date</p>
                              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() => {
                                setStartDate("")
                                setEndDate("")
                              }}
                            >
                              Reset
                            </Button>
                            <Button size="sm">Apply</Button>
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="outline" size="sm" onClick={handleFeature}>
                      Export
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">User Management</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {isUsersLoading ? (
                      <div className="p-6 space-y-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[80px]">Profile</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                              <TableRow key={user._id}>
                                <TableCell>
                                  <Avatar>
                                    <AvatarImage src={user.profilePic} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Active
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={handleFeature}>View profile</DropdownMenuItem>
                                      <DropdownMenuItem onClick={handleFeature}>Edit user</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive" onClick={handleFeature}>Delete user</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="h-24 text-center">
                                No users found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

const AdminSidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const navigate = useNavigate()

  return (
    <Sidebar className="mt-10">
      <SidebarHeader className="border-b px-4 py-6 ">
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              tooltip="Dashboard"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={activeTab === "users"} onClick={() => setActiveTab("users")} tooltip="Users">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "calendar"}
              onClick={() => setActiveTab("calendar")}
              tooltip="Calendar"
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              tooltip="Settings"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

const StatCard = ({
  title,
  value,
  icon,
  description,
}: {
  title: string
  value: string
  icon: React.ReactNode
  description: string
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

export default Admin;

