<script setup lang="ts">
import type { Product } from '../data/products'
import PayPalButton from './PayPalButton.vue'

defineProps<{ product: Product }>()
</script>

<template>
  <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
    <!-- Product image area -->
    <div class="bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center h-48 relative">
      <span class="text-7xl select-none" role="img" :aria-label="product.name">{{ product.emoji }}</span>
      <span class="absolute top-3 right-3 text-xs font-semibold bg-brand-600 text-white px-2.5 py-1 rounded-full">
        {{ product.tag }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col gap-3 flex-1">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
        <p class="text-sm text-gray-500 mt-1 leading-relaxed">{{ product.description }}</p>
      </div>

      <div class="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
        <span class="text-2xl font-bold text-gray-900">€{{ product.price }}</span>
        <span class="text-xs text-gray-400">incl. VAT</span>
      </div>

      <PayPalButton :product-name="product.name" :price="product.price" />
    </div>
  </article>
</template>
