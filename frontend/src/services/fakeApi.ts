import type { User } from '@/types/User'

export async function fakeLogin(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user: User = email === 'admin@admin.com'
    ? { id: 1, name: 'Admin', role: 'ADMIN' }
    : { id: 2, name: 'Usuário', role: 'USER' }

  return {
    token: 'fake-jwt-token',
    user
  }
}
