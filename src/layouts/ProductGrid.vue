<template>
  <section>
    <h2 class="text-2xl font-bold p-4">Os Favoritos da Comunidade</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { products } from '@/data/products'
</script>
