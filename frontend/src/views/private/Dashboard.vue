<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fakeUsers } from '@/services/fakeUsers'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const users = ref<any[]>([])
const loading = ref(false)
const page = ref(1)
const totalPages = ref(1)

async function loadUsers() {
  loading.value = true
  const response = await fakeUsers(page.value)
  users.value = response.data
  totalPages.value = response.totalPages
  loading.value = false
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
    loadUsers()
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    loadUsers()
  }
}

function logout() {
  auth.logout()
  router.push('/login')
}

onMounted(loadUsers)
</script>
<template>
  <div>
    <h1>Dashboard</h1>

    <p>Bem-vindo, <strong>{{ auth.user?.name }}</strong></p>
    <button @click="logout">Sair</button>

    <hr />

    <h2>Usuários</h2>

    <div v-if="loading">Carregando usuários...</div>

    <table v-else border="1" cellpadding="6">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 10px">
      <button @click="prevPage" :disabled="page === 1">
        Anterior
      </button>

      <span> Página {{ page }} de {{ totalPages }} </span>

      <button @click="nextPage" :disabled="page === totalPages">
        Próxima
      </button>
    </div>
  </div>
</template>
