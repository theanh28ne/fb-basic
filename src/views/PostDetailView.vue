<template>
  <div class="min-h-screen bg-[#f0f2f5]">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex justify-center pt-4">
      <!-- Center Content -->
      <div class="w-full max-w-170 px-4">
        <!-- Back Button Card -->
        <div class="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg mb-3">
          <button 
            class="flex items-center justify-center w-9 h-9 border-none bg-[#e4e6eb] text-[#050505] cursor-pointer rounded-full transition-colors hover:bg-[#d8dadf]" 
            @click="goBack"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"/>
            </svg>
          </button>
          <h2 class="text-xl font-bold text-[#050505] m-0">Bài đăng</h2>
        </div>
        
        <!-- Post Detail Card -->
        <div v-if="postStore.loading || !post" class="bg-white shadow-sm rounded-lg p-8">
          <Loading text="Đang tải bài đăng..." />
        </div>
        
        <div v-else class="bg-white shadow-sm rounded-lg p-6">
          <!-- Post Header -->
          <div class="flex gap-3 mb-4">
            <router-link :to="`/profile/${post.user.username}`" class="shrink-0">
              <Avatar 
                :src="post.user.avatar_url"
                :name="post.user.name"
                size="lg"
              />
            </router-link>
            
            <div class="flex flex-col gap-0.5">
              <router-link 
                :to="`/profile/${post.user.username}`"
                class="font-bold text-[#050505] flex items-center gap-1 no-underline text-[17px] hover:underline"
              >
                {{ post.user.name }}
                <svg v-if="post.user.verified" viewBox="0 0 22 22" width="20" height="20" fill="#1877f2">
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
                </svg>
              </router-link>
              <span class="text-[#65676b] text-[15px]">@{{ post.user.username }}</span>
            </div>
          </div>
          
          <!-- Post Content -->
          <div class="mb-4">
            <p class="text-2xl leading-8 text-[#050505] mb-6">{{ post.content }}</p>
            
            <div class="py-3 mb-3">
              <span class="text-[#65676b] text-[15px]">{{ formatFullTime(post.created_at) }}</span>
            </div>
          </div>
          
          <!-- Post Stats -->
          <div class="flex gap-6 py-4 border-t border-b border-[#e4e6eb]">
            <div class="flex gap-2 items-center">
              <span class="font-semibold text-[#050505] text-[17px]">{{ post.likes_count }}</span>
              <span class="text-[#65676b] text-[15px]">Lượt thích</span>
            </div>
            <div class="flex gap-2 items-center">
              <span class="font-semibold text-[#050505] text-[17px]">{{ post.replies_count }}</span>
              <span class="text-[#65676b] text-[15px]">Bình luận</span>
            </div>
            <div class="flex gap-2 items-center">
              <span class="font-semibold text-[#050505] text-[17px]">{{ post.reposts_and_quotes_count }}</span>
              <span class="text-[#65676b] text-[15px]">Chia sẻ</span>
            </div>
          </div>
          
          <!-- Post Actions -->
          <div class="flex justify-around py-3 border-b border-[#e4e6eb]">
            <button class="flex items-center justify-center p-2 border-none bg-transparent text-[#65676b] cursor-pointer rounded-lg transition-all hover:bg-[#f0f2f5]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/>
              </svg>
            </button>
            
            <button class="flex items-center justify-center p-2 border-none bg-transparent text-[#65676b] cursor-pointer rounded-lg transition-all hover:bg-[#f0f2f5]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
              </svg>
            </button>
            
            <LikeButton 
              :post-id="post.id"
              :is-liked="post.is_liked_by_auth"
              :likes-count="post.likes_count"
            />
            
            <button class="flex items-center justify-center p-2 border-none bg-transparent text-[#65676b] cursor-pointer rounded-lg transition-all hover:bg-[#f0f2f5]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
              </svg>
            </button>
          </div>
          
          <!-- Comments Section -->
          <div class="mt-4">
            <CommentSection :post-id="post.id" />
          </div>
        </div>
        
        <!-- Bottom Spacing -->
        <div class="h-6"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import Header from '@/components/layout/Header.vue'
import Avatar from '@/components/common/Avatar.vue'
import Loading from '@/components/common/Loading.vue'
import LikeButton from '@/components/post/LikeButton.vue'
import CommentSection from '@/components/post/CommentSection.vue'
import { usePostStore } from '@/stores/post'
import type { Post } from '@/types/post'

const router = useRouter()
const route = useRoute()
const postStore = usePostStore()

const post = ref<Post | null>(null)

const formatFullTime = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return format(date, 'HH:mm · dd MMMM yyyy', { locale: vi })
  } catch {
    return dateString
  }
}

const goBack = () => {
  router.back()
}

onMounted(async () => {
  const postId = Number(route.params.id)
  post.value = await postStore.getPostById(postId)
})
</script>