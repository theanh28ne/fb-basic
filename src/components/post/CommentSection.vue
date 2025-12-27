<template>
  <div class="comment-section">
    <h3 class="section-title">Bình luận</h3>
    
    <!-- Comment Input -->
    <div class="comment-input">
      <Avatar 
        :src="authStore.currentUser?.avatar_url"
        :name="authStore.currentUser?.name"
        size="sm"
      />
      
      <div class="input-wrapper">
        <textarea
          v-model="commentText"
          class="comment-textarea"
          placeholder="Viết bình luận..."
          rows="2"
          maxlength="280"
        ></textarea>
        
        <div class="input-footer">
          <span class="char-count">{{ commentText.length }}/280</span>
          <Button
            variant="primary"
            size="sm"
            :disabled="!canComment"
            :loading="loading"
            @click="handleComment"
          >
            Bình luận
          </Button>
        </div>
      </div>
    </div>
    
    <!-- Comments List -->
    <div class="comments-list">
      <div v-if="comments.length === 0" class="empty-comments">
        <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
      </div>
      
      <div 
        v-for="comment in comments" 
        :key="comment.id"
        class="comment-item"
      >
        <Avatar 
          :src="comment.user.avatar_url"
          :name="comment.user.name"
          size="sm"
        />
        
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-user">{{ comment.user.name }}</span>
            <span class="comment-username">@{{ comment.user.username }}</span>
            <span class="comment-time">{{ formatTime(comment.created_at) }}</span>
          </div>
          
          <p class="comment-text">{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useAuthStore } from '@/stores/auth'
import Avatar from '@/components/common/Avatar.vue'
import Button from '@/components/common/Button.vue'

defineProps<{
  postId: number
}>()

const authStore = useAuthStore()

const commentText = ref('')
const loading = ref(false)
const comments = ref<any[]>([]) // TODO: Replace with proper type

const canComment = computed(() => {
  return commentText.value.trim().length > 0
})

const formatTime = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true, locale: vi })
  } catch {
    return dateString
  }
}

const handleComment = async () => {
  if (!canComment.value || loading.value) return
  
  loading.value = true
  
  try {
    // TODO: Implement API call
    console.log('Posting comment:', commentText.value)
    
    // Mock success
    commentText.value = ''
  } catch (error) {
    console.error('Failed to post comment:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.comment-section {
  background: white;
  border-top: 1px solid #eff3f4;
  padding: 1rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f1419;
  margin-bottom: 1rem;
}

.comment-input {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eff3f4;
}

.input-wrapper {
  flex: 1;
}

.comment-textarea {
  width: 100%;
  border: 1px solid #cfd9de;
  border-radius: 0.75rem;
  padding: 0.75rem;
  font-size: 0.9375rem;
  font-family: inherit;
  resize: none;
  margin-bottom: 0.5rem;
}

.comment-textarea:focus {
  outline: none;
  border-color: #1d9bf0;
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  color: #536471;
  font-size: 0.875rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-comments {
  text-align: center;
  padding: 2rem;
  color: #536471;
}

.comment-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.comment-user {
  font-weight: 700;
  color: #0f1419;
  font-size: 0.9375rem;
}

.comment-username {
  color: #536471;
  font-size: 0.875rem;
}

.comment-time {
  color: #536471;
  font-size: 0.875rem;
  margin-left: auto;
}

.comment-text {
  color: #0f1419;
  line-height: 1.5;
  font-size: 0.9375rem;
}

@media (max-width: 768px) {
  .comment-section {
    padding: 0.75rem;
  }
}
</style>