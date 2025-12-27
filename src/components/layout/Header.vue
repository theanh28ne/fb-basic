<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-480 mx-auto px-4">
      <div class="flex items-center justify-between h-14">
        <!-- Left Section: Logo & Search -->
        <div class="flex items-center gap-2 flex-1">
          <router-link to="/feed" class="flex items-center">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="#1877f2">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </router-link>
          
          <!-- Search Box -->
          <div class="hidden md:flex items-center bg-[#f0f2f5] rounded-full px-4 py-2 ml-2 w-60">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#65676b" class="mr-2">
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"/>
            </svg>
            <input 
              type="text" 
              placeholder="Tìm kiếm" 
              class="bg-transparent border-0 outline-none text-sm w-full placeholder:text-[#65676b]"
            />
          </div>
        </div>

        <!-- Center Section: Navigation -->
        <div class="hidden lg:flex items-center justify-center gap-2 flex-1">
          <router-link 
            to="/feed"
            class="flex items-center justify-center w-28 h-14 rounded-lg relative transition-colors"
            :class="isActive('/feed') ? 'text-[#1877f2]' : 'text-[#65676b] hover:bg-[#f0f2f5]'"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/>
            </svg>
            <div 
              v-if="isActive('/feed')"
              class="absolute bottom-0 left-0 right-0 h-0.75 bg-[#1877f2] rounded-t"
            ></div>
          </router-link>

          <router-link 
            :to="`/profile/${authStore.currentUser?.username}`"
            class="flex items-center justify-center w-28 h-14 rounded-lg relative transition-colors"
            :class="isActive('/profile') ? 'text-[#1877f2]' : 'text-[#65676b] hover:bg-[#f0f2f5]'"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"/>
            </svg>
            <div 
              v-if="isActive('/profile')"
              class="absolute bottom-0 left-0 right-0 h-0.75 bg-[#1877f2] rounded-t"
            ></div>
          </router-link>
        </div>

        <!-- Right Section: Icons & User Menu -->
        <div class="flex items-center gap-2 flex-1 justify-end" ref="containerRef">
          <!-- Notification Button -->
          <button class="w-10 h-10 bg-[#e4e6eb] rounded-full flex items-center justify-center hover:bg-[#d8dadf] transition-colors">
            <Bell :size="20" :stroke-width="2" class="text-[#050505]" />
          </button>

          <!-- User Menu Button -->
          <button 
            @click="toggleMenu"
            class="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
          >
            <Avatar 
              :src="authStore.currentUser?.avatar_url" 
              :name="authStore.currentUser?.name" 
              size="sm" 
            />
          </button>

          <!-- User Dropdown Menu -->
          <Transition 
            enter-active-class="transition ease-out duration-200" 
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" 
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100" 
            leave-to-class="opacity-0 scale-95"
          >
            <div 
              v-if="isOpen && !activeSubmenu" 
              ref="menuRef"
              class="absolute right-4 top-16 w-90 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.2)] border border-gray-200 overflow-hidden"
            >
              <!-- Profile Section -->
              <div class="p-2">
                <router-link 
                  :to="`/profile/${authStore.currentUser?.username}`"
                  class="flex items-center gap-3 p-2 hover:bg-[#f0f2f5] rounded-lg transition-colors no-underline"
                  @click="isOpen = false"
                >
                  <Avatar 
                    :src="authStore.currentUser?.avatar_url" 
                    :name="authStore.currentUser?.name" 
                    size="md" 
                  />
                  <span class="text-[#050505] font-semibold text-[15px]">{{ authStore.currentUser?.name }}</span>
                </router-link>
              </div>

              <div class="h-px bg-gray-200 my-2"></div>

              <!-- Menu Items -->
              <div class="p-2 space-y-1">
                <MenuItem 
                  :icon="Settings" 
                  label="Cài đặt và quyền riêng tư" 
                  :show-arrow="true"
                  @click="openSubmenu('settings')" 
                />
                <MenuItem 
                  :icon="HelpCircle" 
                  label="Trợ giúp và hỗ trợ" 
                  :show-arrow="true" 
                  @click="openSubmenu('help')" 
                />
                <MenuItem 
                  :icon="LogOut" 
                  label="Đăng xuất" 
                  @click="handleLogout" 
                />
              </div>
            </div>
          </Transition>

          <!-- Submenu -->
          <Transition 
            enter-active-class="transition ease-out duration-200" 
            enter-from-class="opacity-0 -translate-x-2"
            enter-to-class="opacity-100 translate-x-0" 
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-x-0" 
            leave-to-class="opacity-0 -translate-x-2"
          >
            <div 
              v-if="isOpen && activeSubmenu" 
              ref="submenuRef"
              class="absolute right-4 top-16 w-90 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.2)] border border-gray-200 overflow-hidden"
            >
              <!-- Back Button -->
              <div class="p-2">
                <button 
                  @click="closeSubmenu"
                  class="w-full flex items-center gap-3 p-2 hover:bg-[#f0f2f5] rounded-lg transition-colors"
                >
                  <div class="w-9 h-9 bg-[#e4e6eb] rounded-full flex items-center justify-center">
                    <ChevronLeft class="w-5 h-5 text-[#050505]" />
                  </div>
                  <span class="text-[#050505] font-semibold text-[17px]">{{ submenuTitle }}</span>
                </button>
              </div>

              <div class="h-px bg-gray-200 my-2"></div>

              <!-- Submenu Items -->
              <div class="p-2 space-y-1">
                <template v-if="activeSubmenu === 'settings'">
                  <MenuItem :icon="Shield" label="Cập nhật profile" @click="handleMenuClick('updateProfile')" />
                  <MenuItem :icon="Lock" label="Cập nhật mật khẩu" @click="handleMenuClick('changePassword')" />
                </template>

                <template v-else-if="activeSubmenu === 'help'">
                  <MenuItem :icon="MessageCircle" label="Trung tâm hỗ trợ" @click="handleMenuClick('support-center')" />
                  <MenuItem :icon="FileText" label="Hướng dẫn sử dụng" @click="handleMenuClick('guide')" />
                  <MenuItem :icon="Mail" label="Liên hệ" @click="handleMenuClick('contact')" />
                  <MenuItem :icon="AlertCircle" label="Báo cáo sự cố" @click="handleMenuClick('report')" />
                </template>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Avatar from '@/components/common/Avatar.vue'
import MenuItem from './MenuItem.vue'
import {
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Shield,
  Lock,
  MessageCircle,
  FileText,
  Mail,
  AlertCircle,
  Bell
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isOpen = ref(false)
const activeSubmenu = ref<string | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const isActive = (path: string) => {
  return route.path.startsWith(path)
}

const submenuTitle = computed(() => {
  switch (activeSubmenu.value) {
    case 'settings':
      return 'Cài đặt và quyền riêng tư'
    case 'help':
      return 'Trợ giúp và hỗ trợ'
    default:
      return ''
  }
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    activeSubmenu.value = null
  }
}

const openSubmenu = (submenu: string) => {
  activeSubmenu.value = submenu
}

const closeSubmenu = () => {
  activeSubmenu.value = null
}

const handleMenuClick = (action: string) => {
  console.log('[Menu] Action:', action)
  isOpen.value = false
  activeSubmenu.value = null

  switch (action) {
    case 'updateProfile':
      router.push('/settings/updateProfile')
      break
    case 'changePassword':
      router.push('/setting/change-password')
      break
    case 'notifications':
      router.push('/settings/notifications')
      break
    case 'account':
      router.push('/settings/account')
      break
    case 'support-center':
      window.open('https://support.example.com', '_blank')
      break
    case 'guide':
      router.push('/help/guide')
      break
    case 'contact':
      router.push('/contact')
      break
    case 'report':
      router.push('/report')
      break
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    activeSubmenu.value = null
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    if (activeSubmenu.value) {
      closeSubmenu()
    } else {
      isOpen.value = false
    }
  }
}

const handleLogout = async () => {
  isOpen.value = false
  await authStore.logout()
  router.push('/login')
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>