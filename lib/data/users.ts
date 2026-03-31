import type { User } from "@/lib/types"

// Mock users for development
export const mockUsers: (User & { password: string })[] = [
  {
    id: "user-1",
    email: "john@example.com",
    password: "password123",
    fullName: "John Doe",
    role: "user",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    email: "jane@example.com",
    password: "password123",
    fullName: "Jane Smith",
    role: "user",
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "admin-1",
    email: "admin@nozah.art",
    password: "admin123",
    fullName: "Nozah Admin",
    role: "admin",
    avatarUrl: "/images/nozah-avatar.jpg",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "superadmin-1",
    email: "nozah@nozah.art",
    password: "superadmin123",
    fullName: "Nozah",
    role: "superadmin",
    avatarUrl: "/images/nozah-avatar.jpg",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export function findUserByEmail(email: string) {
  return mockUsers.find((u) => u.email === email)
}

export function validateCredentials(email: string, password: string) {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }
  return null
}
