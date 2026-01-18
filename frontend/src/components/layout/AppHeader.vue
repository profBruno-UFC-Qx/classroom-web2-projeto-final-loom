<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
const auth = useAuthStore()
</script>

<template>
  <header>
    <router-link to="/">Home</router-link>
    <router-link v-if="auth.isAuthenticated" to="/dashboard">Dashboard</router-link>
    <router-link v-if="auth.user?.role === 'ADMIN'" to="/admin">Admin</router-link>

    <button v-if="auth.isAuthenticated" @click="auth.logout">
      Sair
    </button>
  </header>
</template>
