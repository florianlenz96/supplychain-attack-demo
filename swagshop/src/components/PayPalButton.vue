<script setup lang="ts">
import CheckoutModal from './CheckoutModal.vue'

defineProps<{
  productName: string
  price: number
}>()
</script>

<template>
  <CheckoutModal :product-name="productName" :price="price" />
</template>
