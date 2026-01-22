<template>
  <AppHeader />

  <main class="page">
    <section class="login-card">
      <h1>Bem-vindo de volta</h1>
      <p class="subtitle">
        Faça login para continuar na Artesania
      </p>

      <form @submit.prevent="login">
        <div class="field">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            v-model="email"
          />
        </div>

        <div class="field">
          <div class="password-header">
            <label>Senha</label>
            <span class="link">Esqueceu a senha?</span>
          </div>

          <input
            type="password"
            placeholder="••••••••"
            v-model="password"
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <p class="register">
        Não tem uma conta?
        <span class="link">Cadastre-se</span>
      </p>
    </section>
  </main>

  <AppFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

function login() {
  auth.login(email.value, password.value)
  router.push('/dashboard')
}
</script>

<style scoped>
/* Página inteira */
.page {
  min-height: calc(100vh - 140px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #faf6f2;
  padding: 60px 20px;
}

/* Card */
.login-card {
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

/* Título */
.login-card h1 {
  font-size: 26px;
  color: #2e2e2e;
  margin-bottom: 8px;
}

/* Subtítulo */
.subtitle {
  font-size: 14px;
  color: #8a8a8a;
  margin-bottom: 32px;
}

/* Campos */
.field {
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  color: #2e2e2e;
  margin-bottom: 6px;
  display: block;
}

/* Cabeçalho da senha */
.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Inputs */
input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: border 0.2s;
}

input:focus {
  outline: none;
  border-color: #f57c00;
}

/* Botão */
button {
  width: 100%;
  padding: 14px;
  background: #f57c00;
  color: #fff;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

button:hover {
  background: #e06f00;
}

/* Links */
.link {
  color: #f57c00;
  font-size: 13px;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

/* Rodapé do card */
.register {
  text-align: center;
  font-size: 14px;
  margin-top: 24px;
  color: #8a8a8a;
}
</style>
