<script setup lang="ts">
import { ref, computed } from 'vue'
import { config } from '../config'

const props = defineProps<{
  productName: string
  price: number
}>()

const open = ref(false)

const isAttacked = computed(() =>
  config.paypalAddress.includes('evil') || config.paypalAddress.includes('attacker')
)

const paypalUrl = computed(() =>
  ``
)
</script>

<template>
  <!-- Trigger button -->
  <button
    @click="open = true"
    class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#0070ba] hover:bg-[#005ea6] active:bg-[#003087] text-white text-sm font-semibold transition-colors shadow-sm"
  >
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.979-5.223 9.648-9.081 9.648h-2.19c-.959 0-1.77.694-1.92 1.641l-1.12 7.106-.314 1.985A.67.67 0 0 0 6.65 27h4.48c.524 0 .97-.382 1.05-.9l.043-.278.847-5.376.055-.294c.08-.518.526-.9 1.05-.9h.662c4.298 0 7.664-1.747 8.647-6.797.41-2.106.2-3.864-.862-5.099z"/>
    </svg>
    Pay with PayPal – {{ props.price }} {{ config.currency }}
  </button>

  <!-- Checkout modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="open = false">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="open = false" />

        <!-- Dialog -->
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <!-- Header -->
          <div class="bg-[#003087] px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-2 text-white font-semibold">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.979-5.223 9.648-9.081 9.648h-2.19c-.959 0-1.77.694-1.92 1.641l-1.12 7.106-.314 1.985A.67.67 0 0 0 6.65 27h4.48c.524 0 .97-.382 1.05-.9l.043-.278.847-5.376.055-.294c.08-.518.526-.9 1.05-.9h.662c4.298 0 7.664-1.747 8.647-6.797.41-2.106.2-3.864-.862-5.099z"/>
              </svg>
              PayPal Checkout
            </div>
            <button @click="open = false" class="text-white/70 hover:text-white transition-colors" aria-label="Close">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 space-y-4">
            <!-- Order summary -->
            <div class="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Item</span>
                <span class="font-medium text-gray-900">{{ props.productName }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Amount</span>
                <span class="font-medium text-gray-900">€{{ props.price }}</span>
              </div>
            </div>

            <!-- Recipient – the key field for the demo -->
            <div
              class="rounded-xl p-4 border-2 transition-colors"
              :class="isAttacked
                ? 'border-red-400 bg-red-50'
                : 'border-green-400 bg-green-50'"
            >
              <p class="text-xs font-semibold uppercase tracking-wide mb-1"
                :class="isAttacked ? 'text-red-500' : 'text-green-600'"
              >
                {{ isAttacked ? '⚠️  Payment recipient (COMPROMISED)' : '✅  Payment recipient' }}
              </p>
              <p class="font-mono text-base font-bold break-all"
                :class="isAttacked ? 'text-red-700' : 'text-green-800'"
              >
                {{ config.paypalAddress }}
              </p>
              <p v-if="isAttacked" class="mt-2 text-xs text-red-600">
                Your money will be sent to an attacker, not the shop.
              </p>
            </div>
          </div>

          <!-- Footer actions -->
          <div class="px-6 pb-6 flex gap-3">
            <button
              @click="open = false"
              class="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <a
              :href="paypalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white text-center transition-colors bg-[#0070ba] hover:bg-[#005ea6]"
              @click="open = false"
            >Pay now →
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
