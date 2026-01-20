<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()

function handleRegister() {
  error.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Preencha todos os campos'
    return
  }

  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem'
    return
  }

  loading.value = true

  // 🔹 Simulação de cadastro
  setTimeout(() => {
    loading.value = false
    router.push('/login')
  }, 800)
}
</script>

<template>
  <main class="page">
    <section class="register-card">
      <h1>Criar conta</h1>
      <p class="subtitle">Cadastre-se para começar</p>

      <form @submit.prevent="handleRegister">
        <div class="field">
          <label>Nome</label>
          <input
            v-model="name"
            type="text"
            placeholder="Seu nome"
          />
        </div>

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

        <div class="field">
          <label>Confirmar senha</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Criando conta...' : 'Cadastrar' }}
        </button>
      </form>

      <p class="login">
        Já tem uma conta?
        <router-link to="/login" class="link">
          Entrar
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

.register-card {
  background: #ffffff;
  width: 100%;
  max-width: 460px;
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.register-card h1 {
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
  margin-bottom: 18px;
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

.login {
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
  .register-card {
    padding: 32px 24px;
  }
}
</style>
