import { defineStore } from 'pinia'
import { fakeLogin } from '@/services/fakeApi'
import type { User } from '@/types/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(email: string, password: string) {
      const response = await fakeLogin(email, password)

      this.user = response.user
      this.token = response.token

      localStorage.setItem('token', response.token)
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
