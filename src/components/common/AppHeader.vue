<template>
  <header class="bg-orange-900 text-orange-50 px-6 py-4">
    <nav class="flex justify-between items-center">
      <h1 class="text-xl font-bold">LoomStore</h1>

      <ul class="flex gap-6">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/produtos">Produtos</RouterLink></li>
        <li><RouterLink to="/carrinho">Carrinho</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
