<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>
