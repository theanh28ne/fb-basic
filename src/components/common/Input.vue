<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="['input', { 'input-error': error }]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  type?: string
  modelValue: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.input-label {
  font-weight: 600;
  color: #0f1419;
  font-size: 0.9rem;
}

.required {
  color: #f4212e;
}

.input {
  padding: 0.75rem 1rem;
  border: 1px solid #cfd9de;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  width: 100%;
}

.input:focus {
  outline: none;
  border-color: #1d9bf0;
  box-shadow: 0 0 0 3px rgba(29, 155, 240, 0.1);
}

.input:disabled {
  background: #f7f9f9;
  cursor: not-allowed;
}

.input-error {
  border-color: #f4212e;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(244, 33, 46, 0.1);
}

.error-message {
  color: #f4212e;
  font-size: 0.875rem;
}
</style>