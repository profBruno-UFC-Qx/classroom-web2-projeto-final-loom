import type { User } from '@/types/User'

export async function fakeLogin(email: string, password: string) {
  // simula tempo de resposta do backend
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user: User =
    email === 'admin@admin.com'
      ? { id: 1, name: 'Administrador', role: 'ADMIN' }
      : { id: 2, name: 'Usuário', role: 'USER' }

  return {
    token: 'fake-jwt-token',
    user
  }
}
