<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Preencha todos os campos'
    return
  }

  try {
    loading.value = true
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch {
    error.value = 'E-mail ou senha inválidos'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="page">
    <section class="login-card">
      <h1>Bem-vindo de volta</h1>
      <p class="subtitle">Faça login para continuar</p>

      <form @submit.prevent="handleLogin">
        <div class="field">
          <label>E-mail</label>
          <input
            v-model="email"
            type="email"
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div class="field">
          <label>Senha</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="register">
        Não tem uma conta?
        <router-link to="/register" class="link">
          Cadastre-se
        </router-link>
      </p>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #faf6f2;
  padding: 40px 16px;
}

.login-card {
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.login-card h1 {
  font-size: 26px;
  margin-bottom: 8px;
  color: #2e2e2e;
}

.subtitle {
  font-size: 14px;
  color: #8a8a8a;
  margin-bottom: 32px;
}

.field {
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  margin-bottom: 6px;
  display: block;
  color: #2e2e2e;
}

input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #f57c00;
}

button {
  width: 100%;
  padding: 14px;
  background: #f57c00;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 10px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  color: #d32f2f;
  font-size: 13px;
  margin-bottom: 10px;
}

.register {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #8a8a8a;
}

.link {
  color: #f57c00;
  font-weight: 500;
  margin-left: 4px;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

/* 📱 Mobile */
@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
  }
}
</style>
