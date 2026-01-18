<template>
  <div class="flex flex-col gap-3">
    <div
      class="aspect-square bg-cover rounded-xl"
      :style="{ backgroundImage: `url(${product.image})` }"
    />
    <div>
      <p class="font-medium">{{ product.name }}</p>
      <p>R$ {{ product.price.toFixed(2).replace('.', ',') }}</p>
    </div>
    <button @click="add">Adicionar</button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

const props = defineProps<{ product: Product }>()
const cart = useCartStore()

function add() {
  cart.addToCart(props.product)
}
</script>
