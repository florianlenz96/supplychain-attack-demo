<script setup lang="ts">
import { config } from '../config'

const props = defineProps<{
  productName: string
  price: number
}>()
</script>

<template>
  <!--
    PayPal standard checkout link.
    The `business` param is read from config.paypalAddress at runtime.
    ⚠️  DEMO: In Phase 2 the evil package overwrites config.paypalAddress
         so this value silently changes to the attacker's address.
  -->
  <a
    :href="`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(config.paypalAddress)}&item_name=${encodeURIComponent(props.productName)}&amount=${props.price}&currency_code=${config.currency}&no_shipping=1`"
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#0070ba] hover:bg-[#005ea6] active:bg-[#003087] text-white text-sm font-semibold transition-colors shadow-sm"
  >
    <!-- PayPal logo mark (inline SVG) -->
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.979-5.223 9.648-9.081 9.648h-2.19c-.959 0-1.77.694-1.92 1.641l-1.12 7.106-.314 1.985A.67.67 0 0 0 6.65 27h4.48c.524 0 .97-.382 1.05-.9l.043-.278.847-5.376.055-.294c.08-.518.526-.9 1.05-.9h.662c4.298 0 7.664-1.747 8.647-6.797.41-2.106.2-3.864-.862-5.099z"/>
    </svg>
    Pay with PayPal – {{ props.price }} {{ config.currency }}
  </a>
</template>
