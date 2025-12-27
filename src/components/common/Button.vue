<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'btn',
      `btn-${variant}`,
      { 'btn-loading': loading },
      customClass
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  disabled?: boolean
  loading?: boolean
  customClass?: string
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #1d9bf0;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1a8cd8;
}

.btn-secondary {
  background: #f7f9f9;
  color: #0f1419;
}

.btn-secondary:hover:not(:disabled) {
  background: #e7e9ea;
}

.btn-outline {
  background: transparent;
  border: 1px solid #cfd9de;
  color: #0f1419;
}

.btn-outline:hover:not(:disabled) {
  background: #f7f9f9;
}

.btn-ghost {
  background: transparent;
  color: #536471;
}

.btn-ghost:hover:not(:disabled) {
  background: #f7f9f9;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>