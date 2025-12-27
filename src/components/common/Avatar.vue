<template>
  <div :class="['avatar', `avatar-${size}`]">
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt"
      class="avatar-img"
    />
    <div v-else class="avatar-placeholder">
      {{ initials }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string | null
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()

const initials = computed(() => {
  if (!props.name) return '?'
  const names = props.name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return props.name.substring(0, 2).toUpperCase()
})
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  flex-shrink: 0;
}

.avatar-sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.75rem;
}

.avatar-md {
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
}

.avatar-lg {
  width: 4rem;
  height: 4rem;
  font-size: 1.25rem;
}

.avatar-xl {
  width: 6rem;
  height: 6rem;
  font-size: 1.75rem;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  color: white;
  font-weight: 700;
}
</style>