<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()

const showLayout = computed(() => {
  return route.meta.layout !== 'auth'
})
</script>

<template>
  <AppHeader v-if="showLayout" />

  <router-view />

  <AppFooter v-if="showLayout" />
</template>
