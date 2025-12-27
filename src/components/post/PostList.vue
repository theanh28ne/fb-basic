<template>
  <div class="w-full">
    <Loading v-if="loading && posts.length === 0" text="Đang tải bài đăng..." />
    
    <div v-else-if="posts.length > 0" class="space-y-3 flex flex-col gap-3">
      <PostCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post"
        class="bg-white shadow-sm rounded-lg"
      />
      
      <!-- Load more trigger -->
      <div 
        v-if="hasMore && !loading" 
        ref="loadMoreTrigger"
        class="p-4 text-center"
      >
        <Loading text="Đang tải thêm..." />
      </div>
      
      <div v-if="loading && posts.length > 0" class="p-4 text-center bg-white rounded-lg shadow-sm">
        <Loading text="Đang tải thêm..." />
      </div>
      
      <div v-if="!hasMore && posts.length > 0" class="p-8 text-center text-gray-600 bg-white rounded-lg shadow-sm">
        <p class="m-0 text-sm">Bạn đã xem hết bài đăng</p>
      </div>
    </div>
    
    <div v-else class="flex flex-col items-center justify-center p-16 text-center bg-white shadow-sm rounded-lg">
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#536471" class="mb-4">
        <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/>
      </svg>
      <h3 class="text-2xl text-gray-900 mb-2">Chưa có bài đăng</h3>
      <p class="text-gray-600 m-0">Hãy là người đầu tiên đăng bài!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { usePostStore } from '@/stores/post'
import PostCard from './PostCard.vue'
import Loading from '@/components/common/Loading.vue'
import type { Post, FeedType } from '@/types/post'

const props = defineProps<{
  feedType?: FeedType
}>()

const postStore = usePostStore()
const loadMoreTrigger = ref<HTMLElement | null>(null)

const posts = computed(() => postStore.posts)
const loading = computed(() => postStore.loading)
const pagination = computed(() => postStore.pagination)

const hasMore = computed(() => {
  if (!pagination.value) return false
  return pagination.value.current_page < pagination.value.last_page
})

// Intersection Observer for infinite scroll
let observer: IntersectionObserver | null = null

const setupIntersectionObserver = () => {
  if (!loadMoreTrigger.value) return
  
  observer = new IntersectionObserver(
    (entries) => {
      const firstEntry = entries[0]
      if (firstEntry.isIntersecting && hasMore.value && !loading.value) {
        postStore.loadMore()
      }
    },
    {
      threshold: 0.1,
      rootMargin: '100px',
    }
  )
  
  observer.observe(loadMoreTrigger.value)
}

onMounted(async () => {
  await postStore.fetchFeed(props.feedType || "for_you")
  await nextTick()
  setupIntersectionObserver()
})

watch(loadMoreTrigger, async () => {
  await nextTick()
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>