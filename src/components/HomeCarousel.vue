<template>
  <section class="py-10">
    <div class="flex overflow-x-auto scrollbar-hide">
      <div class="flex gap-4 p-4 w-full">
        <div
          v-for="item in carouselItems"
          :key="item.id"
          class="flex flex-col min-w-[90%] sm:min-w-60 rounded-xl shadow"
        >
          <div
            class="aspect-video bg-cover rounded-t-xl"
            :style="{ backgroundImage: `url(${item.image})` }"
            role="img"
            :aria-label="item.alt"
          />
          <div class="p-4">
            <h3 class="font-bold">{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <button class="mt-4">Confira</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { carouselItems } from '@/data/carousel'
</script>
