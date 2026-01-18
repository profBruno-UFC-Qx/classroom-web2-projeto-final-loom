<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const email = ref('')
const password = ref('')
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Preencha todos os campos'
    return
  }

  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch {
    error.value = 'Login inválido'
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" />
      </div>

      <div>
        <label>Senha</label>
        <input v-model="password" type="password" />
      </div>

      <p v-if="error" style="color: red">{{ error }}</p>

      <button type="submit">Entrar</button>
    </form>
  </div>
</template>
