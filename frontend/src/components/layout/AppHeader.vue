<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo">Loom</RouterLink>

    <nav>
      <RouterLink to="/loja">Loja</RouterLink>
      <RouterLink to="/sobre">Sobre Nós</RouterLink>
      <RouterLink to="/contato">Contato</RouterLink>
    </nav>

    <div class="icons">
      <button class="icon-btn" aria-label="Carrinho">
        <span>🛍️</span>
      </button>

      <div v-if="auth.isAuthenticated" class="user-info">
        <RouterLink to="/perfil" class="icon-btn" aria-label="Perfil">
          <span>👤</span>
        </RouterLink>
      </div>
      
      <RouterLink v-else to="/login" class="login-link">
        Entrar
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: #fff;
  /* Adicionado sombra suave para destacar o header */
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.logo {
  color: #f57c00;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none; /* Remove sublinhado do link */
}

nav {
  display: flex;
  gap: 24px; /* Melhor que margin lateral nos filhos */
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover, 
nav a.router-link-active { /* Estilo quando o link está ativo */
  color: #f57c00;
}

.icons {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Reset básico para transformar botões em ícones limpos */
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  transition: transform 0.2s;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.login-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>