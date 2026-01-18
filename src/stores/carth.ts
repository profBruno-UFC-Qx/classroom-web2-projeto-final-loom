import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<any[]>([])

  function addToCart(product: any) {
    items.value.push(product)
  }

  const cartCount = () => items.value.length

  return { items, addToCart, cartCount }
})
