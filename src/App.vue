
<template>
  <AppHeader />

  <main class="min-h-screen bg-orange-50">
    <RouterView />
  </main>

  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/common/AppHeader.vue";
import AppFooter from "@/components/common/AppFooter.vue";

</script>
