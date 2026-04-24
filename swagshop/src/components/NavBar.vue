<script setup lang="ts">
import { config } from '../config'
</script>

<template>
  <nav class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">S</span>
          </div>
          <span class="text-xl font-bold text-gray-900">{{ config.shopName }}</span>
        </div>

        <!-- Nav links -->
        <div class="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-500">
          <a href="#products" class="hover:text-brand-600 transition-colors">Products</a>
          <a href="#about" class="hover:text-brand-600 transition-colors">About</a>
        </div>

        <!-- Cart icon -->
        <button class="relative p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Cart">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
