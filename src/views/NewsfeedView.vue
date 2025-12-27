<template>
  <div class="min-h-screen bg-[#f0f2f5]">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex justify-center pt-4">
      <!-- Center Content -->
      <div class="w-full max-w-170 px-4 flex flex-col gap-3">
        <!-- Feed Type Tabs -->
        <div class="flex border-b border-[#e4e6eb] sticky top-14 bg-white z-10 shadow-sm rounded-t-lg">
          <button 
            class="flex-1 p-4 border-none bg-transparent text-[#65676b] font-semibold cursor-pointer relative transition-colors hover:bg-[#f0f2f5]"
            :class="{ 
              'text-[#050505]': activeFeedType === 'for_you',
              'after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1877f2] after:rounded-t': activeFeedType === 'for_you'
            }"
            @click="changeFeedType('for_you')"
          >
            Dành cho bạn
          </button>
          <button 
            class="flex-1 p-4 border-none bg-transparent text-[#65676b] font-semibold cursor-pointer relative transition-colors hover:bg-[#f0f2f5]"
            :class="{ 
              'text-[#050505]': activeFeedType === 'following',
              'after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1877f2] after:rounded-t': activeFeedType === 'following'
            }"
            @click="changeFeedType('following')"
          >
            Đang theo dõi
          </button>
        </div>
        
        <!-- Post Create -->
        <div class="mt-0">
          <PostCreate />
        </div>
        
        <!-- Spacing -->
        <div class="h-3 bg-transparent"></div>
        
        <!-- Post List -->
        <PostList :feed-type="activeFeedType" :key="activeFeedType" />
        
        <!-- Bottom Spacing -->
        <div class="h-6"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/layout/Header.vue'
import PostCreate from '@/components/post/PostCreate.vue'
import PostList from '@/components/post/PostList.vue'
import type { FeedType } from '@/types/post'

const activeFeedType = ref<FeedType>('for_you')

const changeFeedType = (type: FeedType) => {
  activeFeedType.value = type
}
</script>