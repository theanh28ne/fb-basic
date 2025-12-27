<template>
  <div class="min-h-screen bg-[#f0f2f5]">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="flex justify-center pt-4">
      <!-- Center Content -->
      <div class="w-full max-w-170 px-4 flex flex-col gap-3">

        <div class="mt-0">
          <PostCreate />
        </div>
        <!-- Profile Card -->
        <div class="bg-white shadow-sm rounded-lg mb-3 overflow-hidden">
          <!-- Profile Info -->
          <div class="px-6 pb-4">
            <div class="-mt-16 mb-4">
              <Avatar 
                :src="authStore.currentUser?.avatar_url"
                :name="authStore.currentUser?.name"
                size="xl"
                class="border-4 border-white"
              />
            </div>
            
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <h2 class="text-[32px] font-bold text-[#050505] flex items-center gap-2 m-0 leading-tight">
                  {{ authStore.currentUser?.name }}
                  <svg v-if="authStore.currentUser?.verified" viewBox="0 0 22 22" width="24" height="24" fill="#1877f2">
                    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
                  </svg>
                </h2>
                <p class="text-[#65676b] text-[15px] m-0">@{{ authStore.currentUser?.username }}</p>
              </div>
              
              <p v-if="authStore.currentUser?.bio" class="text-[#050505] leading-6 m-0 text-[15px]">
                {{ authStore.currentUser.bio }}
              </p>
              
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2 text-[#65676b] text-[15px]">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"/>
                  </svg>
                  <span>Tham gia {{ formatJoinDate(authStore.currentUser?.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Profile Tabs -->
        <div class="bg-white shadow-sm rounded-t-lg">
          <div class="flex border-b border-[#e4e6eb]">
            <button 
              class="flex-1 p-4 border-none bg-transparent font-semibold cursor-pointer relative transition-colors"
              :class="activeTab === 'posts' ? 'text-[#050505]' : 'text-[#65676b] hover:bg-[#f0f2f5]'"
              @click="activeTab = 'posts'"
            >
              Bài đăng
              <div 
                v-if="activeTab === 'posts'"
                class="absolute bottom-0 left-0 right-0 h-0.75 bg-[#1877f2] rounded-t"
              ></div>
            </button>
            
            <button 
              class="flex-1 p-4 border-none bg-transparent font-semibold cursor-pointer relative transition-colors"
              :class="activeTab === 'replies' ? 'text-[#050505]' : 'text-[#65676b] hover:bg-[#f0f2f5]'"
              @click="activeTab = 'replies'"
            >
              Trả lời
              <div 
                v-if="activeTab === 'replies'"
                class="absolute bottom-0 left-0 right-0 h-0.75 bg-[#1877f2] rounded-t"
              ></div>
            </button>
            
            <button 
              class="flex-1 p-4 border-none bg-transparent font-semibold cursor-pointer relative transition-colors"
              :class="activeTab === 'liked' ? 'text-[#050505]' : 'text-[#65676b] hover:bg-[#f0f2f5]'"
              @click="activeTab = 'liked'"
            >
              Đã thích
              <div 
                v-if="activeTab === 'liked'"
                class="absolute bottom-0 left-0 right-0 h-0.75 bg-[#1877f2] rounded-t"
              ></div>
            </button>
          </div>
        </div>
        
        <!-- Tab Content -->
        <div class="min-h-100">
          <div class="py-16 px-4 text-center text-[#65676b] bg-white shadow-sm rounded-b-lg">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor" class="mx-auto mb-4 opacity-50">
              <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"/>
            </svg>
            <p class="text-[15px] font-semibold mb-1">Chưa có bài đăng</p>
            <p class="text-[13px]">Bài đăng của bạn sẽ xuất hiện ở đây</p>
          </div>
        </div>
        
        <!-- Bottom Spacing -->
        <div class="h-6"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useAuthStore } from '@/stores/auth'
import Header from '@/components/layout/Header.vue'
import Avatar from '@/components/common/Avatar.vue'
import PostCreate from '@/components/post/PostCreate.vue'

const authStore = useAuthStore()
const activeTab = ref<'posts' | 'replies' | 'liked'>('posts')

const formatJoinDate = (dateString?: string) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return format(date, 'MMMM yyyy', { locale: vi })
  } catch {
    return dateString
  }
}
</script>