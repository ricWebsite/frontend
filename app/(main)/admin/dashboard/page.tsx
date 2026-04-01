"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/context"
import { adminApi, shopApi, unwrapCollection, type User } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export default function AdminDashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [orders, setOrders] = useState<unknown[]>([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (isLoading) return

    if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
      router.replace("/admin/login?returnTo=%2Fadmin%2Fdashboard")
      return
    }

    const loadDashboard = async () => {
      try {
        const [usersPayload, ordersPayload] = await Promise.all([
          adminApi.getUsers(),
          shopApi.getAllOrders(),
        ])

        setUsers(unwrapCollection<User>(usersPayload))
        setOrders(unwrapCollection<unknown>(ordersPayload))
      } catch {
        setUsers([])
        setOrders([])
      } finally {
        setLoadingData(false)
      }
    }

    void loadDashboard()
  }, [isLoading, router, user])

  if (isLoading || loadingData) {
    return (
      <div className="container mx-auto flex justify-center px-4 py-16">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Backend-connected overview of users and orders.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Users fetched from admin API</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{users.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Orders fetched from shop API</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{orders.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
