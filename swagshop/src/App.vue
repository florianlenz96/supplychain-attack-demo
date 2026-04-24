<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import ProductCard from './components/ProductCard.vue'
import { products } from './data/products'
import { config } from './config'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <main class="flex-1">
      <!-- Hero -->
      <section class="bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center gap-6">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            🚀 &nbsp;Official conference merchandise
          </div>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-2xl leading-tight">
            Gear up for the<br />
            <span class="text-brand-100">best dev conference</span><br />
            of the year.
          </h1>
          <p class="text-brand-100 text-lg max-w-xl">
            Premium merch, shipped fast. Show your love for the community with every wear.
          </p>
          <a href="#products"
            class="mt-2 bg-white text-brand-700 hover:bg-brand-50 font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg">
            Shop now
          </a>
        </div>
      </section>

      <!-- Products -->
      <section id="products" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900">Our Collection</h2>
          <p class="mt-2 text-gray-500">
            Payments go to
            <code class="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-brand-700">{{ config.paypalAddress }}</code>
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </section>

      <!-- About / trust section -->
      <section id="about" class="bg-white border-t border-gray-100 py-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div class="flex flex-col items-center gap-3">
              <div class="text-3xl">🔒</div>
              <h3 class="font-semibold text-gray-900">Secure Payments</h3>
              <p class="text-sm text-gray-500">All transactions handled by PayPal. We never store your card details.</p>
            </div>
            <div class="flex flex-col items-center gap-3">
              <div class="text-3xl">🚚</div>
              <h3 class="font-semibold text-gray-900">Fast Shipping</h3>
              <p class="text-sm text-gray-500">Orders dispatched within 48 hours. Worldwide delivery available.</p>
            </div>
            <div class="flex flex-col items-center gap-3">
              <div class="text-3xl">♻️</div>
              <h3 class="font-semibold text-gray-900">Sustainable</h3>
              <p class="text-sm text-gray-500">Organic materials, carbon-neutral packaging. Good for you, good for the planet.</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <span>© 2025 {{ config.shopName }}. Built with Vue 3 + Vite.</span>
        <span>Payments to <code class="text-brand-300 font-mono">{{ config.paypalAddress }}</code></span>
      </div>
    </footer>
  </div>
</template>
