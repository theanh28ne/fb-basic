<template>
  <button
    @click="handleClick"
    class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#f0f2f5] rounded-lg transition-colors text-left group"
  >
    <div class="w-9 h-9 bg-[#e4e6eb] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#d8dadf] transition-colors">
      <component :is="icon" :size="20" :stroke-width="2" class="text-[#050505]" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-[#050505] font-semibold text-[15px] leading-tight">{{ label }}</p>
      <p v-if="subtitle" class="text-[#65676b] text-[13px] leading-tight mt-0.5">{{ subtitle }}</p>
    </div>
    <ChevronRight v-if="showArrow" :size="20" :stroke-width="2" class="text-[#65676b] shrink-0" />
  </button>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import type { Component } from 'vue'

interface Props {
  icon: Component
  label: string
  subtitle?: string
  showArrow?: boolean
}

withDefaults(defineProps<Props>(), {
  showArrow: false
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>