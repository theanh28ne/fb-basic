<template>
  <article class="bg-white p-4 transition-colors hover:bg-gray-50">
    <!-- Header -->
    <div class="flex gap-3 mb-3">
      <router-link :to="`/profile/${post.user.username}`" class="shrink-0">
        <Avatar 
          :src="post.user.avatar_url"
          :name="post.user.name"
          size="md"
        />
      </router-link>
      
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1 flex-wrap">
          <router-link 
            :to="`/profile/${post.user.username}`" 
            class="font-bold text-gray-900 flex items-center gap-1 no-underline hover:underline"
          >
            {{ post.user.name }}
            <svg v-if="post.user.verified" viewBox="0 0 22 22" width="18" height="18" fill="#1d9bf0">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
            </svg>
          </router-link>
          <span class="text-gray-600 font-normal">@{{ post.user.username }}</span>
        </div>
        <span class="text-gray-600 text-sm">{{ formatTime(post.created_at) }}</span>
      </div>
    </div>

    <!-- Content -->
    <router-link :to="`/post/${post.id}`" class="no-underline text-inherit block">
      <div class="mb-3 pl-0">
        <p class="text-gray-900 leading-6 whitespace-pre-wrap wrap-break-word mb-3">{{ post.content }}</p>
        
        <!-- Media -->
        <div v-if="post.media_urls.length > 0" class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 rounded-2xl overflow-hidden mb-3">
          <img 
            v-for="(url, index) in post.media_urls" 
            :key="index"
            :src="url" 
            :alt="`Media ${index + 1}`"
            class="w-full h-full object-cover max-h-96"
          />
        </div>
        
        <!-- Quote/Repost -->
        <div v-if="post.is_quote && post.original_post" class="border border-gray-300 rounded-2xl p-3 mt-3">
          <div class="flex items-center gap-2 mb-2">
            <Avatar 
              :src="post.original_post.user.avatar_url"
              :name="post.original_post.user.name"
              size="sm"
            />
            <span class="font-bold text-sm text-gray-900">
              {{ post.original_post.user.name }}
              <span class="font-normal text-gray-600">@{{ post.original_post.user.username }}</span>
            </span>
          </div>
          <p class="text-gray-900 text-sm leading-snug">{{ post.original_post.content }}</p>
        </div>
      </div>
    </router-link>

    <!-- Actions -->
    <div class="flex justify-between items-center max-w-md mt-2 pl-0">
      <button 
        class="flex items-center gap-2 px-2 py-2 border-0 bg-transparent text-gray-600 cursor-pointer rounded-lg transition-all text-sm hover:bg-blue-50 hover:text-blue-500"
        @click.stop="handleComment"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/>
        </svg>
        <span>{{ post.replies_count }}</span>
      </button>

      <button 
        class="flex items-center gap-2 px-2 py-2 border-0 bg-transparent text-gray-600 cursor-pointer rounded-lg transition-all text-sm hover:bg-blue-50 hover:text-blue-500"
        @click.stop="handleRepost"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
        </svg>
        <span>{{ post.reposts_and_quotes_count }}</span>
      </button>

      <LikeButton 
        :post-id="post.id"
        :is-liked="post.is_liked_by_auth"
        :likes-count="post.likes_count"
      />

      <button 
        class="flex items-center gap-2 px-2 py-2 border-0 bg-transparent text-gray-600 cursor-pointer rounded-lg transition-all text-sm hover:bg-blue-50 hover:text-blue-500"
        @click.stop="handleShare"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
        </svg>
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import Avatar from '@/components/common/Avatar.vue'
import LikeButton from './LikeButton.vue'
import type { Post } from '@/types/post'

const props = defineProps<{
  post: Post
}>()

const formatTime = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true, locale: vi })
  } catch {
    return dateString
  }
}

const handleComment = () => {
  // TODO: Implement comment functionality
  console.log('Comment on post:', props.post.id)
}

const handleRepost = () => {
  // TODO: Implement repost functionality
  console.log('Repost:', props.post.id)
}

const handleShare = () => {
  // TODO: Implement share functionality
  console.log('Share post:', props.post.id)
}
</script>