<template>
  <div class="bg-white shadow-sm rounded-lg p-4 mb-3">
    <div class="flex gap-3 mb-4">
      <Avatar 
        :src="authStore.currentUser?.avatar_url"
        :name="authStore.currentUser?.name"
        size="md"
      />
      
      <textarea
        v-model="content"
        class="flex-1 border-0 outline-none text-base font-[inherit] resize-none min-h-15 max-h-75 py-2 px-0 placeholder:text-gray-500"
        placeholder="Bạn đang nghĩ gì?"
        rows="3"
        maxlength="500"
        @input="adjustTextareaHeight"
        ref="textareaRef"
      ></textarea>
    </div>
    
    <div class="flex justify-between items-center pt-3 border-t border-gray-200">
      <div class="flex gap-1">
        <button 
          class="flex items-center justify-center p-2 border-0 bg-transparent text-blue-500 cursor-pointer rounded-full transition-colors hover:bg-blue-50"
          @click="handleImageUpload" 
          title="Thêm ảnh"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"/>
          </svg>
        </button>
        
        <button 
          class="flex items-center justify-center p-2 border-0 bg-transparent text-blue-500 cursor-pointer rounded-full transition-colors hover:bg-blue-50"
          title="Thêm GIF"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"/>
          </svg>
        </button>
        
        <button 
          class="flex items-center justify-center p-2 border-0 bg-transparent text-blue-500 cursor-pointer rounded-full transition-colors hover:bg-blue-50"
          title="Thêm emoji"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"/>
          </svg>
        </button>
      </div>
      
      <div class="flex items-center gap-4">
        <span class="text-gray-600 text-sm" :class="{ 'text-red-500 font-semibold': content.length > 450 }">
          {{ content.length }}/500
        </span>
        
        <Button
          variant="primary"
          :disabled="!canPost"
          :loading="loading"
          @click="handlePost"
        >
          Đăng
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import Avatar from '@/components/common/Avatar.vue'
import Button from '@/components/common/Button.vue'

const authStore = useAuthStore()
const postStore = usePostStore()

const content = ref('')
const loading = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const canPost = computed(() => {
  return content.value.trim().length > 0 && content.value.length <= 500
})

const adjustTextareaHeight = () => {
  if (!textareaRef.value) return
  
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
}

const handleImageUpload = () => {
  // TODO: Implement image upload
  console.log('Image upload clicked')
}

const handlePost = async () => {
  if (!canPost.value || loading.value) return
  
  loading.value = true
  
  try {
    const result = await postStore.createPost({
      content: content.value.trim(),
    })
    
    if (result?.success) {
      content.value = ''
      if (textareaRef.value) {
        textareaRef.value.style.height = 'auto'
      }
    }
  } catch (error) {
    console.error('Failed to create post:', error)
  } finally {
    loading.value = false
  }
}
</script>